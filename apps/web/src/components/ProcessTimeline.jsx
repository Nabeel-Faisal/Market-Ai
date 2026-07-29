import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { Reveal } from '@/components/motion/Primitives.jsx';

/**
 * ProcessTimeline — vertical steps with a rail that fills as you scroll past
 * it, so progress through the method is legible at a glance.
 */
const ProcessTimeline = ({ steps = [] }) => {
  const containerRef = useRef(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 65%', 'end 55%'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  return (
    <div ref={containerRef} className="relative mx-auto max-w-3xl">
      {/* Rail */}
      <div
        aria-hidden="true"
        className="absolute bottom-6 left-[1.65rem] top-6 hidden w-px bg-border md:block"
      >
        {!reduced && (
          <motion.span
            className="absolute inset-0 block origin-top"
            style={{
              scaleY,
              background: 'linear-gradient(180deg, hsl(var(--brand)), hsl(var(--brand-cyan)), hsl(var(--brand-violet)))',
            }}
          />
        )}
      </div>

      <ol className="space-y-4">
        {steps.map((step, index) => (
          <Reveal
            as="li"
            key={step.title}
            delay={index * 0.06}
            direction="left"
            className="group relative flex flex-col gap-5 rounded-2xl border border-transparent p-4 transition-colors duration-500 hover:border-border hover:bg-[hsl(var(--surface)/0.75)] md:flex-row md:gap-7"
          >
            <span className="relative z-10 grid h-[3.4rem] w-[3.4rem] shrink-0 place-items-center rounded-full border border-border bg-[hsl(var(--background))] transition-all duration-500 ease-swift group-hover:scale-105 group-hover:border-brand">
              {step.icon ? (
                <step.icon className="h-5 w-5 text-brand transition-colors duration-500 group-hover:text-brand-cyan" strokeWidth={1.7} />
              ) : (
                <span className="font-mono text-[0.9375rem] text-brand">
                  {String(index + 1).padStart(2, '0')}
                </span>
              )}
            </span>

            <div className="md:pt-2">
              <div className="mb-2 flex items-center gap-3">
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-muted-foreground">
                  Step {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mb-2.5 text-[1.25rem]">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
};

export default ProcessTimeline;
