import React, { useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile.jsx';

const COLUMN_W = 54;
const COLUMN_D = 22;
const MAX_H = 210;
const BREAK_AT = 0.52; // where the column reaches the ceiling

/**
 * CeilingBreak — the closing CTA's visual: a growth column rising until it
 * punches through the ceiling above it. Scroll drives the rise; the impact
 * cracks the plane, throws a shockwave and lets light spill through.
 *
 * Everything is CSS 3D — this sits in the footer, so it renders on every page
 * and has to stay cheap.
 */
const CeilingBreak = ({ className }) => {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const ref = useRef(null);
  const [broken, setBroken] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 90%', 'end 55%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 60, damping: 26, mass: 0.8 });

  useMotionValueEvent(progress, 'change', (value) => {
    const next = value >= BREAK_AT;
    setBroken((current) => (current === next ? current : next));
  });

  const height = useTransform(progress, [0, 1], [0, MAX_H]);
  const glow = useTransform(progress, [BREAK_AT, 1], [0, 1]);
  const crackLength = useTransform(progress, [BREAK_AT, BREAK_AT + 0.22], [0, 1]);

  if (isMobile) return null;

  const staticHeight = reduced ? MAX_H : undefined;

  return (
    <div
      ref={ref}
      className={cn('relative h-[17rem] w-full select-none', className)}
      style={{ perspective: 1100 }}
      aria-hidden="true"
    >
      {/* ---- Light spilling down through the hole ---- */}
      <motion.span
        className="pointer-events-none absolute left-1/2 top-10 h-56 w-64 -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(ellipse at center, hsl(var(--brand-cyan) / 0.45), transparent 70%)',
          opacity: reduced ? 0.8 : glow,
        }}
      />

      {/* ---- The column ---- */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        style={{ width: COLUMN_W, transformStyle: 'preserve-3d', zIndex: 1 }}
      >
        <motion.span
          className="absolute bottom-0 left-0 block rounded-t-[3px]"
          style={{
            width: COLUMN_W,
            height: staticHeight ?? height,
            background:
              'linear-gradient(to top, hsl(var(--brand) / 0.35), hsl(var(--brand)) 60%, hsl(var(--brand-cyan)))',
            boxShadow: '0 0 40px hsl(var(--brand) / 0.45)',
          }}
        />
        {/* side face, for thickness */}
        <motion.span
          className="absolute bottom-0 block origin-bottom-left"
          style={{
            left: COLUMN_W,
            width: COLUMN_D,
            height: staticHeight ?? height,
            transform: 'rotateY(64deg)',
            background:
              'linear-gradient(to top, hsl(var(--brand) / 0.18), hsl(var(--brand) / 0.55))',
          }}
        />
      </div>

      {/* ---- Ceiling: tilted plane with a hole punched in it ---- */}
      <div
        className="absolute inset-x-0 top-12 h-40"
        style={{ transform: 'rotateX(66deg)', transformStyle: 'preserve-3d', zIndex: 2 }}
      >
        <span
          className="bg-grid-sm absolute inset-0 border-y border-border bg-[hsl(var(--surface)/0.75)]"
          style={{
            maskImage:
              'radial-gradient(circle 74px at 50% 52%, transparent 55%, #000 88%), linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)',
            WebkitMaskImage:
              'radial-gradient(circle 74px at 50% 52%, transparent 55%, #000 88%), linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)',
            maskComposite: 'intersect',
            WebkitMaskComposite: 'source-in',
          }}
        />

        {/* Cracks radiating from the hole, drawn on impact */}
        <svg
          viewBox="0 0 400 160"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full overflow-visible"
        >
          {[
            'M200,83 L150,40 L128,52',
            'M200,83 L252,44 L276,58',
            'M200,83 L146,120 L120,116',
            'M200,83 L258,124 L288,120',
          ].map((d) => (
            <motion.path
              key={d}
              d={d}
              fill="none"
              stroke="hsl(var(--brand-cyan) / 0.75)"
              strokeWidth="1.4"
              style={{ pathLength: reduced ? 1 : crackLength }}
            />
          ))}
        </svg>

        {/* Shockwave, once, at the moment of impact */}
        {broken && !reduced && (
          <motion.span
            className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-cyan"
            initial={{ scale: 0.2, opacity: 0.9 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          />
        )}
      </div>

      {/* ---- Broken shards, floating just under the hole ---- */}
      {!reduced &&
        [
          { left: '38%', top: '31%', size: 16, delay: 0 },
          { left: '58%', top: '26%', size: 11, delay: 0.8 },
          { left: '52%', top: '38%', size: 8, delay: 1.6 },
        ].map((shard) => (
          <motion.span
            key={shard.left + shard.top}
            className="absolute rounded-[2px] border border-border bg-[hsl(var(--surface))]"
            style={{
              left: shard.left,
              top: shard.top,
              width: shard.size,
              height: shard.size,
              zIndex: 3,
              opacity: broken ? 1 : 0,
              transition: 'opacity 600ms ease',
            }}
            animate={{ y: [0, -9, 0], rotate: [0, 22, 0] }}
            transition={{
              duration: 7 + shard.size / 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: shard.delay,
            }}
          />
        ))}

      {/* ---- Floor line the column stands on ---- */}
      <span
        className="absolute inset-x-10 bottom-10 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(var(--border)), transparent)',
        }}
      />
      <span
        className="absolute bottom-4 left-1/2 h-12 w-44 -translate-x-1/2 rounded-[50%] blur-2xl"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(var(--brand) / 0.3), transparent 70%)',
        }}
      />
    </div>
  );
};

export default CeilingBreak;
