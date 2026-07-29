import React from 'react';
import { cn } from '@/lib/utils';
import { Marquee } from '@/components/motion/Primitives.jsx';

/* Blur + colour fade so pills dissolve at both ends instead of being cut off. */
const EdgeFade = ({ side }) => {
  const direction = side === 'left' ? 'right' : 'left';

  return (
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-y-0 z-10 w-12 backdrop-blur-[2px] sm:w-16',
        side === 'left' ? 'left-0' : 'right-0',
      )}
      style={{
        background: `linear-gradient(to ${direction}, hsl(var(--surface) / 0.4), transparent)`,
        maskImage: `linear-gradient(to ${direction}, #000 40%, transparent)`,
        WebkitMaskImage: `linear-gradient(to ${direction}, #000 40%, transparent)`,
      }}
    />
  );
};

/**
 * IndustryTicker — the sectors we work in, as one compact scrolling line
 * instead of a four-row wrap. Pauses on hover.
 */
const IndustryTicker = ({ industries, speed = 38, className }) => (
  <div className={cn('relative overflow-hidden py-1', className)}>
    <Marquee speed={speed}>
      {industries.map((industry) => (
        <span
          key={industry}
          className="shrink-0 whitespace-nowrap rounded-full border border-border px-3.5 py-1.5 text-[0.8125rem] text-muted-foreground"
        >
          {industry}
        </span>
      ))}
    </Marquee>

    <EdgeFade side="left" />
    <EdgeFade side="right" />
  </div>
);

export default IndustryTicker;
