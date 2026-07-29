import React, { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { cn } from '@/lib/utils';
import { EASE } from '@/lib/motion';
import { useIsMobile } from '@/hooks/use-mobile.jsx';

/**
 * PinnedChapter — a section that sticks to the viewport while its right-hand
 * panel advances through a set of steps, driven by scroll position.
 *
 * The outer element is tall (one viewport per step); the inner element is
 * `position: sticky`, so the browser does the pinning and scroll stays native —
 * no scroll hijacking, no jank.
 *
 * Falls back to a plain stacked list on small screens and whenever the visitor
 * prefers reduced motion, where pinning would trap them mid-section.
 */
const PinnedChapter = ({
  eyebrow,
  title,
  highlight,
  description,
  steps = [],
  tone = 'default',
  footer,
  className,
  id,
}) => {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Smooth the raw progress so the rail glides instead of stepping
  const railScale = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });
  const panelY = useTransform(scrollYProgress, [0, 1], [8, -8]);

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const next = Math.min(steps.length - 1, Math.max(0, Math.floor(value * steps.length)));
    setActive((current) => (current === next ? current : next));
  });

  const isDark = tone === 'dark';
  const staticLayout = reduced || isMobile;

  /* ---------- Header column (shared by both layouts) ---------- */
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
      {description && (
        <p className="text-muted-foreground mt-5 leading-relaxed">{description}</p>
      )}
      {footer && <div className="mt-8">{footer}</div>}
    </div>
  );

  /* ---------- Fallback: plain stacked section ---------- */
  if (staticLayout) {
    return (
      <section
        id={id}
        className={cn(
          'section relative',
          isDark && 'section-dark border-y border-border',
          className
        )}
      >
        <div className="shell">
          {header}
          <ol className="mt-12 space-y-4">
            {steps.map((step, index) => (
              <li
                key={step.id ?? step.title}
                className="rounded-2xl border border-border bg-[hsl(var(--surface)/0.6)] p-6"
              >
                <span className="font-mono text-[0.75rem] tracking-[0.18em] text-brand">
                  {step.id ?? String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mb-2.5 mt-4 text-[1.25rem]">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  /* ---------- Pinned layout ---------- */
  return (
    <section
      id={id}
      ref={ref}
      className={cn('relative', isDark && 'section-dark', className)}
      style={{ height: `${steps.length * 100}vh` }}
      aria-roledescription="Scroll-driven chapter"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Ambient wash so the pinned frame doesn't read as a flat slab */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grid mask-fade-edges opacity-70"
        />

        <div className="shell relative z-10 w-full">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Left: the headline that stays put */}
            <div className="lg:col-span-5">{header}</div>

            {/* Right: the panel that advances */}
            <div className="lg:col-span-7">
              <div className="flex gap-7">
                {/* Progress rail */}
                <div className="relative w-px shrink-0 bg-border" aria-hidden="true">
                  <motion.span
                    className="absolute inset-x-0 top-0 block w-px origin-top"
                    style={{
                      scaleY: railScale,
                      height: '100%',
                      background:
                        'linear-gradient(180deg, hsl(var(--brand)), hsl(var(--brand-cyan)), hsl(var(--brand-violet)))',
                    }}
                  />
                  {steps.map((step, index) => (
                    <span
                      key={step.id ?? step.title}
                      className={cn(
                        'absolute -left-[3px] h-[7px] w-[7px] rounded-full transition-colors duration-500',
                        index <= active ? 'bg-brand-cyan' : 'bg-border'
                      )}
                      style={{ top: `${(index / Math.max(steps.length - 1, 1)) * 100}%` }}
                    />
                  ))}
                </div>

                {/* Panel */}
                <motion.div style={{ y: panelY }} className="min-h-[19rem] flex-1">
                  <p className="text-muted-foreground mb-7 font-mono text-[11px] uppercase tracking-[0.2em]">
                    {String(active + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
                  </p>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, y: 26 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -18 }}
                      transition={{ duration: 0.45, ease: EASE.swift }}
                    >
                      <span
                        className="mb-6 block font-display text-[clamp(3.5rem,9vw,7rem)] font-medium leading-[0.85] tracking-[-0.05em] opacity-[0.14]"
                        aria-hidden="true"
                      >
                        {steps[active].id ?? String(active + 1).padStart(2, '0')}
                      </span>

                      <h3 className="mb-4 text-[clamp(1.5rem,2.6vw,2.15rem)]">
                        {steps[active].title}
                      </h3>

                      <p className="text-muted-foreground max-w-xl text-[1.0625rem] leading-relaxed">
                        {steps[active].description}
                      </p>

                      {steps[active].points && (
                        <ul className="mt-7 space-y-2.5">
                          {steps[active].points.map((point) => (
                            <li
                              key={point}
                              className="text-muted-foreground flex items-start gap-2.5 text-[0.9375rem]"
                            >
                              <span
                                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-cyan"
                                aria-hidden="true"
                              />
                              {point}
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Every step is in the DOM for search engines and assistive tech, even
          though only the active one is painted. */}
      <div className="sr-only">
        {steps.map((step) => (
          <div key={step.id ?? step.title}>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PinnedChapter;
