import React, { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const CHART_W = 280;
const CHART_H = 88;
/* Fixed domain — the curve must not rescale itself on every new point. */
const CHART_MAX = 110;
const TICK_MS = 2200;
const ASSEMBLY_MS = 1600;

const SEED = [12, 18, 15, 24, 30, 27, 38, 44, 41, 56, 62, 74];

const linePath = (points) => {
  const step = CHART_W / (points.length - 1);
  return points
    .map((point, i) => {
      const x = i * step;
      const y = CHART_H - (point / CHART_MAX) * CHART_H;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
};

const areaPath = (points) => `${linePath(points)} L${CHART_W},${CHART_H} L0,${CHART_H} Z`;
const headY = (points) => CHART_H - (points[points.length - 1] / CHART_MAX) * CHART_H;

/* Where each piece flies in from — and flies back out to on scroll. */
const ANCHORS = {
  shell: { x: 0, y: 70, z: -260, rx: 18, ry: 0, delay: 0.35 },
  header: { x: -260, y: -70, z: 140, rx: 0, ry: 42, delay: 0.62 },
  metric: { x: 40, y: -190, z: 200, rx: -34, ry: 0, delay: 0.72 },
  chart: { x: -200, y: 170, z: 120, rx: 26, ry: -28, delay: 0.84 },
  rows: { x: 290, y: 90, z: 160, rx: 0, ry: -44, delay: 0.96 },
  footnote: { x: -140, y: 120, z: 80, rx: 0, ry: 20, delay: 1.08 },
  chipA: { x: 220, y: -220, z: 260, rx: 0, ry: -30, delay: 1.15 },
  chipB: { x: -240, y: 230, z: 260, rx: 0, ry: 30, delay: 1.25 },
};

const CHANNELS = [
  {
    label: 'Google Ads',
    accent: 'brand',
    notes: ['bids optimising', 'budget → Meta', 'new audience live'],
  },
  {
    label: 'Organic search',
    accent: 'brand-cyan',
    notes: ['+12 positions', 'crawl clean', '4 pages indexed'],
  },
  {
    label: 'Email flows',
    accent: 'brand-violet',
    notes: ['3 sends live', 'winback → 22% OR', 'segment rebuilt'],
  },
];

/**
 * AssemblyPart — one piece of the panel. A single `t` (0 = seated, 1 = away)
 * drives both directions: the mount spring pulls it in, scroll pushes it back
 * out, so the two never fight over the same transform.
 */
const AssemblyPart = ({ anchor, scatter, lift = 0, className, style, children }) => {
  const reduced = useReducedMotion();
  const build = useMotionValue(reduced ? 1 : 0);

  useEffect(() => {
    if (reduced) return undefined;
    const controls = animate(build, 1, {
      type: 'spring',
      stiffness: 130,
      damping: 15,
      mass: 0.9,
      delay: anchor.delay,
    });
    return () => controls.stop();
  }, [anchor.delay, build, reduced]);

  const t = useTransform([build, scatter], ([b, s]) => Math.max(1 - b, s));
  const x = useTransform(t, (v) => v * anchor.x);
  const y = useTransform(t, (v) => v * anchor.y);
  const z = useTransform(t, (v) => lift + v * anchor.z);
  const rotateX = useTransform(t, (v) => v * anchor.rx);
  const rotateY = useTransform(t, (v) => v * anchor.ry);
  const opacity = useTransform(t, (v) => Math.max(0, 1 - v * 1.25));
  // 'none' below the threshold so seated pieces don't keep a filter layer alive
  const filter = useTransform(t, (v) => (v < 0.01 ? 'none' : `blur(${(v * 8).toFixed(2)}px)`));

  return (
    <motion.div
      className={className}
      style={{ x, y, z, rotateX, rotateY, opacity, filter, transformStyle: 'preserve-3d', ...style }}
    >
      {children}
    </motion.div>
  );
};

/* Odometer-style number — digits roll instead of snapping. */
const RollingNumber = ({ value, className }) => {
  const reduced = useReducedMotion();
  const chars = value.toLocaleString('en-US').split('');

  if (reduced) return <span className={className}>{value.toLocaleString('en-US')}</span>;

  return (
    <span className={cn('inline-flex tabular-nums', className)} aria-label={String(value)}>
      {chars.map((char, i) => (
        <span
          key={`${i}-${chars.length}`}
          aria-hidden="true"
          className="relative inline-block overflow-hidden"
          style={{ width: char === ',' ? '0.32em' : '0.62em', height: '1em' }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={char}
              className="absolute inset-0 flex items-center justify-center"
              initial={{ y: '-105%' }}
              animate={{ y: '0%' }}
              exit={{ y: '105%' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {char}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </span>
  );
};

/**
 * HeroPanel — the sample client dashboard beside the hero copy.
 *
 * On load its parts fly in from eight directions and snap onto a blueprint
 * that draws itself first. Once seated it behaves like a live analytics view,
 * tilts in 3D with the pointer, and comes apart again as the hero scrolls away.
 */
const HeroPanel = ({ className }) => {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-10% 0px' });

  const [points, setPoints] = useState(SEED);
  const [sessions, setSessions] = useState(12480);
  const [noteStep, setNoteStep] = useState(0);
  const [pulseRow, setPulseRow] = useState(-1);
  const [assembled, setAssembled] = useState(reduced);
  const live = assembled && inView && !reduced;

  useEffect(() => {
    if (reduced) return undefined;
    const id = window.setTimeout(() => setAssembled(true), ASSEMBLY_MS);
    return () => window.clearTimeout(id);
  }, [reduced]);

  // --- Scroll disassembly ---------------------------------------------------
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 20%', 'end start'],
  });
  const scatterRaw = useTransform(scrollYProgress, [0.35, 0.95], [0, 1]);
  const scatter = useSpring(scatterRaw, { stiffness: 160, damping: 30, mass: 0.6 });

  // --- Pointer tilt (drives depth parallax via each part's Z) ---------------
  const tiltX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const tiltY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });

  const handleMove = (event) => {
    if (reduced) return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    tiltY.set(px * 16);
    tiltX.set(-py * 12);
  };

  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  // --- Live behaviour (starts only once the panel is built) ----------------
  useEffect(() => {
    if (!live) return undefined;
    const id = window.setInterval(() => {
      setPoints((prev) => {
        const last = prev[prev.length - 1];
        const next = Math.min(104, Math.max(14, last + (Math.random() - 0.34) * 13));
        return [...prev.slice(1), next];
      });
      setSessions((value) => value + Math.floor(Math.random() * 9) + 2);
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [live]);

  useEffect(() => {
    if (!live) return undefined;
    const id = window.setInterval(() => {
      setNoteStep((step) => {
        setPulseRow(step % CHANNELS.length);
        return step + 1;
      });
    }, 3200);
    return () => window.clearInterval(id);
  }, [live]);

  const line = linePath(points);
  const area = areaPath(points);

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={resetTilt}
      className={cn('relative', className)}
      style={{ perspective: 1500 }}
    >
      <motion.div
        className="relative"
        style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: 'preserve-3d' }}
      >
        {/* ---- Shell ---- */}
        <AssemblyPart
          anchor={ANCHORS.shell}
          scatter={scatter}
          className="absolute inset-0"
          style={{ zIndex: 0 }}
        >
          <div className="h-full w-full rounded-[1.75rem] border border-border bg-[hsl(var(--surface)/0.86)] shadow-lifted backdrop-blur-xl" />
        </AssemblyPart>

        {/* ---- Blueprint that the pieces snap onto ---- */}
        {!reduced && (
          <motion.svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 1.15 }}
          >
            <motion.rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              rx="28"
              fill="none"
              stroke="hsl(var(--brand-cyan))"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0.9 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Snap guides that flash as the pieces land */}
            <motion.line
              x1="0"
              y1="38%"
              x2="100%"
              y2="38%"
              stroke="hsl(var(--brand-cyan))"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 1], opacity: [0, 0.55, 0] }}
              transition={{ duration: 0.9, delay: 0.7, times: [0, 0.5, 1] }}
            />
            <motion.line
              x1="8%"
              y1="0"
              x2="8%"
              y2="100%"
              stroke="hsl(var(--brand-cyan))"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 1], opacity: [0, 0.45, 0] }}
              transition={{ duration: 0.9, delay: 0.85, times: [0, 0.5, 1] }}
            />
          </motion.svg>
        )}

        {/* ---- Content, lifted above the shell plane ---- */}
        <div className="relative p-5 md:p-6" style={{ transformStyle: 'preserve-3d' }}>
          {/* Glass sheen sweep */}
          {!reduced && (
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 overflow-hidden rounded-[1.75rem]"
              style={{
                background:
                  'linear-gradient(90deg, transparent, hsl(var(--brand-cyan) / 0.12), transparent)',
              }}
              initial={{ left: '-40%' }}
              animate={{ left: ['-40%', '130%'] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                repeatDelay: 5.5,
                ease: 'easeInOut',
                delay: ASSEMBLY_MS / 1000,
              }}
            />
          )}

          <AssemblyPart anchor={ANCHORS.header} scatter={scatter} lift={18}>
            <div className="flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  {!reduced && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-cyan opacity-75" />
                  )}
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-cyan" />
                </span>
                growth.live
              </span>
              <span>last 30 days</span>
            </div>
          </AssemblyPart>

          <AssemblyPart anchor={ANCHORS.metric} scatter={scatter} lift={46} className="mt-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  Sessions
                </p>
                <RollingNumber
                  value={sessions}
                  className="mt-1.5 font-display text-[2.25rem] font-medium leading-none tracking-[-0.03em] text-foreground md:text-[2.6rem]"
                />
              </div>
              <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-[hsl(var(--success)/0.14)] px-2.5 py-1 font-display text-[0.8125rem] font-semibold text-[hsl(var(--success))]">
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.4} />
                34%
              </span>
            </div>
          </AssemblyPart>

          <AssemblyPart anchor={ANCHORS.chart} scatter={scatter} lift={34} className="mt-4">
            <svg
              aria-hidden="true"
              viewBox={`0 0 ${CHART_W} ${CHART_H}`}
              className="h-24 w-full overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="hero-panel-line" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="hsl(var(--brand))" />
                  <stop offset="100%" stopColor="hsl(var(--brand-cyan))" />
                </linearGradient>
                <linearGradient id="hero-panel-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--brand) / 0.28)" />
                  <stop offset="100%" stopColor="hsl(var(--brand) / 0)" />
                </linearGradient>
              </defs>

              <motion.path
                d={area}
                fill="url(#hero-panel-fill)"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1, d: area }}
                transition={{
                  opacity: { duration: 0.7, delay: 1.35 },
                  d: { duration: TICK_MS / 1000, ease: 'linear' },
                }}
              />
              <motion.path
                d={line}
                fill="none"
                stroke="url(#hero-panel-line)"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={reduced ? false : { pathLength: 0 }}
                animate={{ pathLength: 1, d: line }}
                transition={{
                  pathLength: { duration: 1.1, delay: 1, ease: [0.22, 1, 0.36, 1] },
                  d: { duration: TICK_MS / 1000, ease: 'linear' },
                }}
              />
              <motion.circle
                cx={CHART_W}
                r={4}
                fill="hsl(var(--brand-cyan))"
                initial={reduced ? false : { opacity: 0, cy: headY(points) }}
                animate={{ opacity: 1, cy: headY(points) }}
                transition={{
                  opacity: { delay: 1.9, duration: 0.3 },
                  cy: { duration: TICK_MS / 1000, ease: 'linear' },
                }}
              />
            </svg>
          </AssemblyPart>

          <AssemblyPart
            anchor={ANCHORS.rows}
            scatter={scatter}
            lift={26}
            className="mt-4 border-t border-border pt-4"
          >
            <ul>
              {CHANNELS.map((channel, i) => {
                const note = channel.notes[(noteStep + i) % channel.notes.length];

                return (
                  <li key={channel.label} className="flex items-center gap-3 py-2">
                    <motion.span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: `hsl(var(--${channel.accent}))` }}
                      animate={reduced || pulseRow !== i ? { scale: 1 } : { scale: [1, 2.1, 1] }}
                      transition={{ duration: 0.7, ease: 'easeInOut' }}
                    />
                    <span className="font-display text-[0.875rem] font-semibold text-foreground">
                      {channel.label}
                    </span>
                    <span className="ml-auto overflow-hidden text-right">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={note}
                          className="block whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground"
                          initial={reduced ? false : { y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -10, opacity: 0 }}
                          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        >
                          {note}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                  </li>
                );
              })}
            </ul>
          </AssemblyPart>

          <AssemblyPart anchor={ANCHORS.footnote} scatter={scatter} lift={12} className="mt-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
              Illustrative dashboard
            </p>
          </AssemblyPart>
        </div>

        {/* ---- Floating chips, furthest forward in Z ---- */}
        <AssemblyPart
          anchor={ANCHORS.chipA}
          scatter={scatter}
          lift={90}
          className="absolute -top-6 right-8 hidden lg:block"
        >
          <motion.span
            aria-hidden="true"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-[hsl(var(--surface)/0.92)] px-3.5 py-2 font-display text-[0.8125rem] font-semibold text-foreground shadow-soft backdrop-blur-md"
            animate={reduced ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
          >
            <span className="text-brand-cyan">↗</span> +18% CTR
          </motion.span>
        </AssemblyPart>

        <AssemblyPart
          anchor={ANCHORS.chipB}
          scatter={scatter}
          lift={90}
          className="absolute -bottom-6 left-8 hidden lg:block"
        >
          <motion.span
            aria-hidden="true"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-[hsl(var(--surface)/0.92)] px-3.5 py-2 font-display text-[0.8125rem] font-semibold text-foreground shadow-soft backdrop-blur-md"
            animate={reduced ? undefined : { y: [0, 9, 0] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
          >
            <span className="text-brand-violet">↘</span> −27% CPA
          </motion.span>
        </AssemblyPart>
      </motion.div>
    </div>
  );
};

export default HeroPanel;
