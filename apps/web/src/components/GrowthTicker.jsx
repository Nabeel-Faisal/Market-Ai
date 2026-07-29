import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Marquee } from '@/components/motion/Primitives.jsx';

/* Blur + colour fade so items dissolve into the page at both ends. */
const EdgeFade = ({ side }) => (
  <span
    aria-hidden="true"
    className={cn(
      'pointer-events-none absolute inset-y-0 z-10 w-16 backdrop-blur-[3px] sm:w-28 md:w-44',
      side === 'left' ? 'left-0' : 'right-0',
    )}
    style={{
      background: `linear-gradient(to ${side === 'left' ? 'right' : 'left'}, hsl(var(--surface)), hsl(var(--surface) / 0.6) 45%, transparent)`,
      maskImage: `linear-gradient(to ${side === 'left' ? 'right' : 'left'}, #000 35%, transparent)`,
      WebkitMaskImage: `linear-gradient(to ${side === 'left' ? 'right' : 'left'}, #000 35%, transparent)`,
    }}
  />
);

const TickerItem = ({ item }) => {
  const accent = `hsl(var(--${item.accent}))`;

  return (
    <span className="group/item flex shrink-0 items-center gap-3 md:gap-4">
      <ArrowUpRight
        className="h-[18px] w-[18px] shrink-0 transition-transform duration-500 ease-swift group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5 md:h-5 md:w-5"
        style={{ color: accent }}
        strokeWidth={2}
      />
      <span className="font-display text-[1.0625rem] font-semibold tracking-[-0.02em] text-foreground md:text-[1.3rem]">
        {item.outcome}
      </span>
      <span
        aria-hidden="true"
        className="h-1 w-1 shrink-0 rounded-full opacity-70"
        style={{ background: accent }}
      />
      <span className="whitespace-nowrap font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground md:text-[11.5px]">
        {item.discipline}
      </span>
    </span>
  );
};

/**
 * GrowthTicker — full-bleed band between the hero and the stats console.
 * Pairs each outcome with the discipline that delivers it, scrolling edge to
 * edge and blurring out on both sides. Pauses on hover.
 */
const GrowthTicker = ({ items, speed = 46, className }) => (
  <section
    aria-label="What we do for clients"
    className={cn(
      'relative overflow-hidden border-y border-border bg-[hsl(var(--surface))] py-6 md:py-7',
      className,
    )}
  >
    <Marquee speed={speed}>
      {items.map((item) => (
        <TickerItem key={item.outcome} item={item} />
      ))}
    </Marquee>

    <EdgeFade side="left" />
    <EdgeFade side="right" />
  </section>
);

export default GrowthTicker;
