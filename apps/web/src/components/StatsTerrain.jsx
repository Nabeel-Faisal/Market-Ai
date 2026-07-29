import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { cn } from '@/lib/utils';
import { Counter } from '@/components/motion/Primitives.jsx';
import { useIsMobile } from '@/hooks/use-mobile.jsx';
import StatsConsole from '@/components/StatsConsole.jsx';

/* Terrain geometry, in floor-local pixels.
 * ROW_GAP has to stay well clear of MAX_H or neighbouring ridges intersect and
 * the whole field reads as noise. */
const BARS = 8;
const BAR_W = 22;
const BAR_GAP = 12;
const BAR_D = 18;
const BASE_H = 10;
const MAX_H = 74;
const ROW_GAP = 116;

const FLOOR_W = BARS * (BAR_W + BAR_GAP) - BAR_GAP;

const sample = (series) => {
  const step = (series.length - 1) / (BARS - 1);
  return Array.from({ length: BARS }, (_, i) => series[Math.round(i * step)]);
};

/**
 * Bar — three faces (front, side, cap) so it stays solid at any orbit angle.
 * Heights animate once through CSS transitions; scrolling only ever moves the
 * single group transform above it.
 */
const Bar = ({ value, index, active, grown }) => {
  const height = grown ? BASE_H + value * MAX_H : 0;
  const delay = `${index * 50}ms`;
  const tone = active ? 'var(--brand-cyan)' : 'var(--brand)';

  return (
    <div
      aria-hidden="true"
      className="absolute bottom-0"
      style={{
        left: index * (BAR_W + BAR_GAP),
        width: BAR_W,
        height: 0,
        transformStyle: 'preserve-3d',
      }}
    >
      <span
        className="absolute bottom-0 left-0 block transition-[height,background] duration-700 ease-swift"
        style={{
          width: BAR_W,
          height,
          transitionDelay: delay,
          transform: 'rotateX(-90deg)',
          transformOrigin: 'bottom center',
          background: `linear-gradient(to top, hsl(${tone} / 0.25), hsl(${tone} / 0.8))`,
        }}
      />
      <span
        className="absolute bottom-0 left-0 block transition-[height,background] duration-700 ease-swift"
        style={{
          width: BAR_D,
          height,
          transitionDelay: delay,
          transform: `translateX(${BAR_W}px) rotateX(-90deg) rotateY(90deg)`,
          transformOrigin: 'bottom left',
          background: `linear-gradient(to top, hsl(${tone} / 0.14), hsl(${tone} / 0.45))`,
        }}
      />
      <span
        className="absolute bottom-0 left-0 block transition-[transform,background,box-shadow] duration-700 ease-swift"
        style={{
          width: BAR_W,
          height: BAR_D,
          transitionDelay: delay,
          transform: `translateZ(${height}px)`,
          background: `hsl(${tone} / ${active ? 0.95 : 0.62})`,
          boxShadow: active ? `0 0 16px hsl(${tone} / 0.5)` : 'none',
        }}
      />
    </div>
  );
};

/* One stat's ridge, plus its marker painted flat on the floor. */
const Ridge = ({ stat, index, active, grown, onEnter, onLeave }) => (
  <div
    className="absolute left-0"
    style={{ top: index * ROW_GAP, width: FLOOR_W, height: 0, transformStyle: 'preserve-3d' }}
    onPointerEnter={onEnter}
    onPointerLeave={onLeave}
  >
    <span
      aria-hidden="true"
      className="absolute bottom-0 left-0 block h-px transition-colors duration-500"
      style={{
        width: FLOOR_W,
        background: active
          ? 'linear-gradient(90deg, transparent, hsl(var(--brand-cyan) / 0.75), transparent)'
          : 'linear-gradient(90deg, transparent, hsl(var(--border)), transparent)',
      }}
    />

    {/* Floor marker — lies in the plane, like paint on the ground */}
    <span
      aria-hidden="true"
      className={cn(
        'absolute bottom-0 block text-right font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-500',
        active ? 'text-brand-cyan' : 'text-muted-foreground/60',
      )}
      style={{ left: -58, width: 46, transform: 'translateY(-6px)' }}
    >
      {String(index + 1).padStart(2, '0')}
    </span>

    {sample(stat.series).map((value, barIndex) => (
      <Bar key={barIndex} value={value} index={barIndex} active={active} grown={grown} />
    ))}
  </div>
);

/**
 * StatsTerrain — the proof numbers as a 3D data landscape: each stat is a ridge
 * of extruded bars on a grid floor. Scroll lifts the camera from a top-down
 * read to an angled one and the pointer turntables the field.
 *
 * The labels deliberately stay flat, beside the terrain rather than on it —
 * billboarded type inside the rotating group collided with itself.
 */
const StatsTerrain = ({ stats, className }) => {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-12% 0px' });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const grown = inView || reduced;

  useEffect(() => {
    if (!inView || reduced || paused) return undefined;
    const id = window.setInterval(() => setActive((i) => (i + 1) % stats.length), 3200);
    return () => window.clearInterval(id);
  }, [inView, paused, reduced, stats.length]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const tiltRaw = useTransform(scrollYProgress, [0.1, 0.85], [58, 30]);
  const tilt = useSpring(tiltRaw, { stiffness: 55, damping: 24, mass: 0.85 });
  const orbit = useSpring(useMotionValue(0), { stiffness: 110, damping: 22 });
  const groupTransform = useMotionTemplate`rotateX(${tilt}deg) rotateZ(${orbit}deg)`;

  const handleMove = (event) => {
    if (reduced) return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    orbit.set(((event.clientX - rect.left) / rect.width - 0.5) * 22);
  };

  const activeStat = stats[active] ?? stats[0];

  /* Touch and reduced-motion keep the flat console — a tilted terrain needs a
     pointer to orbit and does not fit a phone's width. */
  if (reduced || isMobile) return <StatsConsole stats={stats} className={className} />;

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={() => orbit.set(0)}
      className={cn(
        'relative overflow-hidden rounded-[1.75rem] border border-border bg-[hsl(var(--surface))]',
        className,
      )}
      aria-label="Key performance metrics"
    >
      {/* Header */}
      <div className="relative z-20 flex items-center justify-between gap-4 border-b border-border px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground md:px-7">
        <span className="flex items-center gap-2.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-cyan opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-cyan" />
          </span>
          Live
          <span className="text-border">/</span>
          <span className="hidden sm:inline">marketai.ch · performance.terrain</span>
        </span>
        <span className="hidden lg:inline">pointer orbits · scroll tilts</span>
      </div>

      <div className="grid items-center gap-6 px-5 py-6 md:px-7 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        {/* ---- Flat readout ---- */}
        <ul>
          {stats.map((stat, i) => {
            const isActive = i === active;

            return (
              <li key={stat.label} className="border-b border-border/70 last:border-b-0">
                <button
                  type="button"
                  aria-pressed={isActive}
                  aria-label={`${stat.value}${stat.suffix} ${stat.label} — ${stat.detail}`}
                  onPointerEnter={() => {
                    setActive(i);
                    setPaused(true);
                  }}
                  onPointerLeave={() => setPaused(false)}
                  onFocus={() => setActive(i)}
                  className="flex w-full items-baseline gap-4 py-3 text-left"
                >
                  <span
                    className={cn(
                      'font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-500',
                      isActive ? 'text-brand-cyan' : 'text-muted-foreground',
                    )}
                  >
                    {String(i + 1).padStart(2, '0')} {stat.code}
                  </span>
                  <span
                    className={cn(
                      'ml-auto font-display text-[1.75rem] font-medium leading-none tracking-[-0.03em] transition-opacity duration-500 md:text-[2.15rem]',
                      isActive
                        ? 'text-gradient-blue-cyan opacity-100'
                        : 'text-foreground opacity-60',
                    )}
                  >
                    <Counter
                      value={stat.value}
                      decimals={stat.decimals ?? 0}
                      suffix={stat.suffix}
                    />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* ---- Terrain stage ---- */}
        <div
          className="relative flex h-[19rem] items-center justify-center"
          style={{ perspective: 1300 }}
        >
          <motion.div
            className="relative"
            style={{
              width: FLOOR_W,
              height: (stats.length - 1) * ROW_GAP,
              transform: groupTransform,
              transformStyle: 'preserve-3d',
            }}
          >
            <span
              aria-hidden="true"
              className="bg-grid-sm absolute opacity-60"
              style={{
                left: -120,
                right: -120,
                top: -110,
                bottom: -120,
                maskImage: 'radial-gradient(ellipse 60% 66% at 50% 50%, #000 26%, transparent 76%)',
                WebkitMaskImage:
                  'radial-gradient(ellipse 60% 66% at 50% 50%, #000 26%, transparent 76%)',
              }}
            />

            {stats.map((stat, i) => (
              <Ridge
                key={stat.label}
                stat={stat}
                index={i}
                active={i === active}
                grown={grown}
                onEnter={() => {
                  setActive(i);
                  setPaused(true);
                }}
                onLeave={() => setPaused(false)}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Footer readout */}
      <div className="relative z-20 flex items-center gap-3 border-t border-border px-5 py-4 font-mono text-[12px] text-muted-foreground md:px-7">
        <span className="text-brand-cyan">{'>'}</span>
        <motion.span
          key={activeStat.label}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="truncate"
        >
          <span className="text-foreground">{activeStat.label}</span>
          <span className="text-border"> — </span>
          {activeStat.detail}
        </motion.span>
        <span aria-hidden="true" className="h-3.5 w-[7px] animate-pulse bg-brand-cyan" />
      </div>
    </div>
  );
};

export default StatsTerrain;
