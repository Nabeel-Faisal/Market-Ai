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

/* Sample analyzer output — the shape a real run returns. */
const METRICS = [
  { label: 'Search visibility', value: 34, color: 'brand-pink' },
  { label: 'Conversion path', value: 58, color: 'brand-amber' },
  { label: 'Brand clarity', value: 76, color: 'brand-cyan' },
  { label: 'Data maturity', value: 41, color: 'brand-violet' },
];

const SIZE = 280;
const CENTRE = SIZE / 2;
const MAX_R = 112;
const SWEEP_MS = 6000; // one full revolution of the beam

/* Axis i, starting at the top and going clockwise. */
const angleOf = (i, count) => (i / count) * Math.PI * 2 - Math.PI / 2;
const pointOf = (metric, i, count) => {
  const r = (metric.value / 100) * MAX_R;
  const a = angleOf(i, count);
  return { x: CENTRE + Math.cos(a) * r, y: CENTRE + Math.sin(a) * r };
};

/* A spike standing on the disc where the beam found a value. */
const Spike = ({ metric, index, count, active, grown, weakest }) => {
  const { x, y } = pointOf(metric, index, count);
  const height = grown ? 14 + (metric.value / 100) * 68 : 0;
  const tone = weakest ? 'var(--brand-pink)' : `var(--${metric.color})`;

  return (
    <div
      aria-hidden="true"
      className="absolute"
      style={{
        left: x - 5,
        top: y,
        width: 10,
        height: 0,
        transformStyle: 'preserve-3d',
      }}
    >
      <span
        className="absolute bottom-0 left-0 block transition-[height,box-shadow] duration-700 ease-swift"
        style={{
          width: 10,
          height,
          transform: 'rotateX(-90deg)',
          transformOrigin: 'bottom center',
          background: `linear-gradient(to top, hsl(${tone} / 0.2), hsl(${tone} / 0.9))`,
          boxShadow: active ? `0 0 20px hsl(${tone} / 0.75)` : 'none',
        }}
      />
      <span
        className="absolute bottom-0 left-0 block transition-[height] duration-700 ease-swift"
        style={{
          width: 8,
          height,
          transform: 'translateX(10px) rotateX(-90deg) rotateY(90deg)',
          transformOrigin: 'bottom left',
          background: `linear-gradient(to top, hsl(${tone} / 0.12), hsl(${tone} / 0.45))`,
        }}
      />
      <span
        className="absolute bottom-0 left-0 block rounded-full transition-[transform,box-shadow] duration-700 ease-swift"
        style={{
          width: 10,
          height: 8,
          transform: `translateZ(${height}px)`,
          background: `hsl(${tone})`,
          boxShadow: active ? `0 0 16px hsl(${tone})` : 'none',
        }}
      />
    </div>
  );
};

/**
 * AnalyzerRadar — the analyzer's sample output as a tilted 3D radar. A beam
 * sweeps the disc; each axis blips and its spike lights as the beam crosses it,
 * and the lowest score is called out as the biggest gap.
 *
 * Scroll raises the camera, the pointer turntables the disc, and everything
 * falls back to a plain bar readout for reduced motion.
 */
const AnalyzerRadar = ({ className }) => {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-10% 0px' });
  const [beat, setBeat] = useState(-1);
  const grown = inView || reduced;

  const weakestIndex = METRICS.reduce(
    (low, metric, i) => (metric.value < METRICS[low].value ? i : low),
    0,
  );

  // Blips stay locked to the beam: one axis per quarter revolution.
  useEffect(() => {
    if (!inView || reduced) return undefined;
    const id = window.setInterval(
      () => setBeat((b) => (b + 1) % METRICS.length),
      SWEEP_MS / METRICS.length,
    );
    return () => window.clearInterval(id);
  }, [inView, reduced]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const tiltRaw = useTransform(scrollYProgress, [0.1, 0.85], [62, 42]);
  const tilt = useSpring(tiltRaw, { stiffness: 55, damping: 24, mass: 0.85 });
  const orbit = useSpring(useMotionValue(0), { stiffness: 110, damping: 22 });
  const discTransform = useMotionTemplate`rotateX(${tilt}deg) rotateZ(${orbit}deg)`;

  const handleMove = (event) => {
    if (reduced) return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    orbit.set(((event.clientX - rect.left) / rect.width - 0.5) * 24);
  };

  const polygon = METRICS.map((metric, i) => {
    const { x, y } = pointOf(metric, i, METRICS.length);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={() => orbit.set(0)}
      className={cn(
        'rounded-2xl border border-border bg-[hsl(var(--surface)/0.85)] p-6 backdrop-blur-xl',
        className,
      )}
    >
      {/* Window chrome */}
      <div className="mb-2 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-brand-pink" />
        <span className="h-2.5 w-2.5 rounded-full bg-brand-amber" />
        <span className="h-2.5 w-2.5 rounded-full bg-brand-lime" />
        <span className="text-muted-foreground ml-2 font-mono text-[0.6875rem]">
          analysis.result
        </span>
        <span className="ml-auto font-mono text-[0.6875rem] text-brand-cyan">scanning</span>
      </div>

      {/* ---- Radar stage ---- */}
      <div
        className="relative flex h-[15rem] items-center justify-center"
        style={{ perspective: 1200 }}
      >
        <motion.div
          className="relative"
          style={{
            width: SIZE,
            height: SIZE,
            transform: reduced ? undefined : discTransform,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Disc: rings, axes, the score polygon */}
          <svg
            aria-hidden="true"
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="absolute inset-0 h-full w-full"
          >
            {[0.4, 0.7, 1].map((ring) => (
              <circle
                key={ring}
                cx={CENTRE}
                cy={CENTRE}
                r={MAX_R * ring}
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="1"
              />
            ))}
            {METRICS.map((metric, i) => {
              const a = angleOf(i, METRICS.length);
              return (
                <line
                  key={metric.label}
                  x1={CENTRE}
                  y1={CENTRE}
                  x2={CENTRE + Math.cos(a) * MAX_R}
                  y2={CENTRE + Math.sin(a) * MAX_R}
                  stroke="hsl(var(--border))"
                  strokeWidth="1"
                />
              );
            })}

            {/* Score shape — its dents are the gaps */}
            <motion.polygon
              points={polygon}
              fill="hsl(var(--brand) / 0.18)"
              stroke="hsl(var(--brand-cyan))"
              strokeWidth="1.5"
              style={{ transformOrigin: `${CENTRE}px ${CENTRE}px` }}
              initial={reduced ? false : { scale: 0, opacity: 0 }}
              animate={grown ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            />
          </svg>

          {/* Sweep beam, lying in the disc plane */}
          {!reduced && (
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(from 0deg, hsl(var(--brand-cyan) / 0.32), transparent 32%, transparent 100%)`,
                maskImage: 'radial-gradient(circle at center, #000 62%, transparent 72%)',
                WebkitMaskImage: 'radial-gradient(circle at center, #000 62%, transparent 72%)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: SWEEP_MS / 1000, repeat: Infinity, ease: 'linear' }}
            />
          )}

          {/* Hub */}
          <span
            aria-hidden="true"
            className="absolute h-2 w-2 rounded-full bg-brand-cyan"
            style={{ left: CENTRE - 4, top: CENTRE - 4, boxShadow: '0 0 18px hsl(var(--brand-cyan))' }}
          />

          {METRICS.map((metric, i) => (
            <Spike
              key={metric.label}
              metric={metric}
              index={i}
              count={METRICS.length}
              active={beat === i}
              grown={grown}
              weakest={i === weakestIndex}
            />
          ))}
        </motion.div>
      </div>

      {/* ---- Legend ---- */}
      <ul className="mt-2 grid grid-cols-2 gap-x-5 gap-y-2.5">
        {METRICS.map((metric, i) => (
          <li key={metric.label} className="flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full transition-transform duration-500"
              style={{
                background: `hsl(var(--${metric.color}))`,
                transform: beat === i ? 'scale(2)' : 'scale(1)',
              }}
            />
            <span
              className={cn(
                'font-mono text-[0.6875rem] transition-colors duration-500',
                beat === i ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              {metric.label}
            </span>
            <span className="ml-auto font-mono text-[0.6875rem] tabular-nums text-foreground">
              {metric.value}%
            </span>
          </li>
        ))}
      </ul>

      {/* Verdict */}
      <p className="mt-4 flex items-center gap-2 border-t border-border pt-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em]">
        <span className="text-muted-foreground">Biggest gap</span>
        <span className="text-brand-pink">{METRICS[weakestIndex].label}</span>
        <span className="text-muted-foreground/60">· sample output</span>
      </p>
    </div>
  );
};

export default AnalyzerRadar;
