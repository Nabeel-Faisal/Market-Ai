import React from 'react';
import { cn } from '@/lib/utils';
import { Reveal, SplitText } from '@/components/motion/Primitives.jsx';

/**
 * SectionHeading — the recurring eyebrow → headline → lede block.
 * Keeping it in one place is what makes every section on the site feel related.
 */
const SectionHeading = ({
  eyebrow,
  title,
  highlight,
  description,
  align = 'center',
  as = 'h2',
  className,
  children,
}) => {
  const centered = align === 'center';

  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        centered ? 'mx-auto max-w-3xl items-center text-center' : 'items-start text-left',
        className
      )}
    >
      {eyebrow && (
        <Reveal direction="up" duration={0.5}>
          <span className="eyebrow">
            <span className="inline-block h-[5px] w-[5px] rounded-full bg-brand" aria-hidden="true" />
            {eyebrow}
          </span>
        </Reveal>
      )}

      <SplitText as={as} text={title} className="text-balance" />

      {highlight && (
        <Reveal direction="up" delay={0.1}>
          <span className="text-gradient-animated -mt-3 block font-display text-[clamp(2rem,4.2vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.025em]">
            {highlight}
          </span>
        </Reveal>
      )}

      {description && (
        <Reveal direction="up" delay={0.14}>
          <p className={cn('text-muted-foreground text-[1.0625rem] leading-relaxed', centered && 'mx-auto max-w-2xl')}>
            {description}
          </p>
        </Reveal>
      )}

      {children && (
        <Reveal direction="up" delay={0.2}>
          {children}
        </Reveal>
      )}
    </div>
  );
};

export default SectionHeading;
