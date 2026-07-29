import React, { useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile.jsx';

/* Stack geometry. The active slab keeps a fixed height, so the settled stack
 * below it is anchored to a constant — the pile never jumps when the open body
 * changes size. */
const ACTIVE_H = 300; // matches min-h on the open slab
const DROP = ACTIVE_H + 18; // where the first settled slab tucks in
const PEEK = 26; // each further slab shows only its edge

/**
 * Slab — one phase of the method. Above the active index it is still in the
 * air; at and below it, it is part of the built stack.
 */
const Slab = ({ step, index, progress, isActive }) => {
  const offset = useTransform(progress, (value) => index - value);

  /* Every property below is one continuous curve through d = 0. Splitting the
   * incoming and settled states into separate branches made the slab teleport
   * the moment it was placed. */
  const y = useTransform(offset, (d) => {
    if (d >= 0) return -d * 210; // still descending
    const k = -d;
    return DROP * Math.min(k, 1) + PEEK * Math.max(0, k - 1);
  });
  const z = useTransform(offset, (d) => (d >= 0 ? d * 150 : Math.max(-190, d * 62)));
  const rotateX = useTransform(offset, (d) => (d >= 0 ? -d * 16 : Math.min(9, -d * 3.4)));
  const scale = useTransform(offset, (d) =>
    d >= 0 ? 1 + Math.min(0.06, d * 0.05) : 1 - Math.min(0.13, -d * 0.045),
  );
  const opacity = useTransform(offset, (d) =>
    d >= 0 ? Math.max(0, Math.min(1, 1 - d * 0.72)) : Math.max(0.32, 1 + d * 0.2),
  );
  const zIndex = useTransform(offset, (d) => (d >= 0 ? 110 : 100 - Math.round(-d * 10)));
  // Blur is the expensive part — a short focus-in on arrival, a light haze deep
  // in the pile, nothing in between
  const filter = useTransform(offset, (d) => {
    if (d > 0.5) return `blur(${Math.min(2.5, (d - 0.5) * 2).toFixed(2)}px)`;
    if (d < -1.1) return `blur(${Math.min(2, (-d - 1.1) * 1.6).toFixed(2)}px)`;
    return 'none';
  });

  return (
    <motion.li
      className="absolute inset-x-0 top-0 mx-auto w-full max-w-lg"
      style={{
        y,
        z,
        rotateX,
        scale,
        opacity,
        zIndex,
        filter,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      <div
        className={cn(
          /* No backdrop-blur here on purpose: these slabs move every frame and
             backdrop filters would be re-composited each time. The surfaces are
             near-opaque anyway. */
          'rounded-[1.5rem] border p-6 transition-colors duration-500 md:p-7',
          isActive
            ? 'min-h-[300px] border-brand-cyan/45 bg-[hsl(var(--surface))] shadow-lifted'
            : 'border-border bg-[hsl(var(--surface)/0.97)] shadow-soft',
        )}
      >
        <div className="flex items-center gap-3">
          <span
            className={cn(
              'font-mono text-[0.75rem] tracking-[0.18em] transition-colors duration-500',
              isActive ? 'text-brand-cyan' : 'text-muted-foreground',
            )}
          >
            {step.id}
          </span>
          <h3 className="text-[1.25rem] leading-none">{step.title}</h3>
          {!isActive && (
            <span
              aria-hidden="true"
              className="ml-auto grid h-6 w-6 place-items-center rounded-full border border-border text-muted-foreground"
            >
              <Check className="h-3.5 w-3.5" strokeWidth={2.2} />
            </span>
          )}
        </div>

        {/* Body only opens on the slab currently being placed */}
        <div
          className={cn(
            'grid transition-[grid-template-rows,opacity] duration-700 ease-swift',
            isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
          )}
        >
          <div className="overflow-hidden">
            <p className="text-muted-foreground mt-4 leading-relaxed">{step.description}</p>
            <ul className="mt-5 space-y-2.5">
              {step.points?.map((point) => (
                <li key={point} className="flex gap-2.5 text-[0.9375rem] text-foreground">
                  <span
                    aria-hidden="true"
                    className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-brand-cyan"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.li>
  );
};

/**
 * ApproachTower — the four phases as slabs that fly in and stack on top of each
 * other as the section scrolls, so by the last phase the whole structure is
 * standing. Scroll drives the build; the pointer orbits the finished tower.
 *
 * Falls back to a plain list on small screens and for reduced motion.
 */
const ApproachTower = ({ steps, eyebrow, title, highlight, description, footer, id, className }) => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const rawProgress = useTransform(scrollYProgress, [0, 1], [0, steps.length - 1]);
  // Soft and slightly over-damped — the pile should glide, never snap
  const progress = useSpring(rawProgress, {
    stiffness: 55,
    damping: 26,
    mass: 0.9,
    restDelta: 0.0005,
  });

  useMotionValueEvent(progress, 'change', (value) => {
    const next = Math.min(steps.length - 1, Math.max(0, Math.round(value)));
    setActive((current) => (current === next ? current : next));
  });

  // Pointer orbit
  const orbitY = useSpring(useMotionValue(0), { stiffness: 130, damping: 22 });
  const orbitX = useSpring(useMotionValue(0), { stiffness: 130, damping: 22 });

  const handleMove = (event) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    orbitY.set(((event.clientX - rect.left) / rect.width - 0.5) * 20);
    orbitX.set(((event.clientY - rect.top) / rect.height - 0.5) * -10);
  };

  const header = (
    <div className="max-w-md">
      {eyebrow && (
        <span className="eyebrow mb-5">
          <span className="inline-block h-[5px] w-[5px] rounded-full bg-brand" aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <h2 className="text-[clamp(2rem,4vw,3.25rem)]">
        {title}
        {highlight && <span className="text-gradient-blue-cyan"> {highlight}</span>}
      </h2>
      {description && <p className="text-muted-foreground mt-5 leading-relaxed">{description}</p>}

      {/* Phase rail — doubles as a progress readout */}
      <ol className="mt-9 space-y-1">
        {steps.map((step, i) => (
          <li key={step.id} className="flex items-center gap-3">
            <span
              className={cn(
                'h-px transition-all duration-500',
                i === active ? 'w-10 bg-brand-cyan' : 'w-5 bg-border',
              )}
            />
            <span
              className={cn(
                'font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-500',
                i === active ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              {step.id} {step.title}
            </span>
          </li>
        ))}
      </ol>

      {footer && <div className="mt-8">{footer}</div>}
    </div>
  );

  /* ---------- Fallback: plain stacked list ---------- */
  if (reduced || isMobile) {
    return (
      <section id={id} className={cn('section relative', className)}>
        <div className="shell">
          {header}
          <ol className="mt-12 space-y-4">
            {steps.map((step) => (
              <li
                key={step.id}
                className="rounded-2xl border border-border bg-[hsl(var(--surface)/0.6)] p-6"
              >
                <span className="font-mono text-[0.75rem] tracking-[0.18em] text-brand">
                  {step.id}
                </span>
                <h3 className="mb-2.5 mt-4 text-[1.25rem]">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                <ul className="mt-4 space-y-2">
                  {step.points?.map((point) => (
                    <li key={point} className="flex gap-2.5 text-[0.9375rem] text-foreground">
                      <span
                        aria-hidden="true"
                        className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-brand-cyan"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  /* ---------- Pinned build ---------- */
  return (
    <section
      id={id}
      ref={ref}
      className={cn('relative', className)}
      style={{ height: `${steps.length * 100}vh` }}
      aria-roledescription="Scroll-driven chapter"
      onPointerMove={handleMove}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="shell grid w-full items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          {header}

          {/* ---- Tower ---- */}
          <div className="relative" style={{ perspective: 1500 }}>
            {/* Receding floor grid the tower stands on */}
            <span
              aria-hidden="true"
              className="bg-grid-sm pointer-events-none absolute inset-x-0 bottom-0 h-64 opacity-40"
              style={{
                transform: 'rotateX(72deg)',
                transformOrigin: 'bottom center',
                maskImage: 'linear-gradient(to top, #000, transparent)',
                WebkitMaskImage: 'linear-gradient(to top, #000, transparent)',
              }}
            />

            <motion.ol
              className="relative h-[27rem]"
              style={{ rotateY: orbitY, rotateX: orbitX, transformStyle: 'preserve-3d' }}
            >
              {steps.map((step, i) => (
                <Slab
                  key={step.id}
                  step={step}
                  index={i}
                  progress={progress}
                  isActive={i === active}
                />
              ))}
            </motion.ol>

            {/* Ground shadow */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-16 bottom-4 h-20 rounded-[50%] blur-2xl"
              style={{
                background:
                  'radial-gradient(ellipse at center, hsl(var(--brand) / 0.25), transparent 70%)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApproachTower;
