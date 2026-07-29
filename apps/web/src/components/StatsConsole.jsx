import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Counter } from '@/components/motion/Primitives.jsx';

/* Session timer — isolated so its tick never re-renders the rows. */
const ConsoleClock = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <span className="tabular-nums" aria-hidden="true">
      uptime {mm}:{ss}
    </span>
  );
};

/* Tiny bar chart rendered from a 0–1 series. */
const Sparkline = ({ series, active, inView, delay }) => {
  const reduced = useReducedMotion();

  return (
    <span aria-hidden="true" className="flex h-8 items-end gap-[3px] md:h-9">
      {series.map((point, i) => (
        <motion.span
          key={i}
          className={cn(
            'w-[3px] origin-bottom rounded-[1px] transition-colors duration-500 md:w-[5px]',
            active ? 'bg-brand-cyan' : 'bg-brand',
          )}
          style={{
            height: `${Math.max(point * 100, 8)}%`,
            opacity: 0.2 + 0.8 * (i / (series.length - 1)),
          }}
          initial={reduced ? false : { scaleY: 0 }}
          animate={inView || reduced ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.5, delay: delay + i * 0.035, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </span>
  );
};

/**
 * StatsConsole — the proof numbers presented as a live telemetry readout
 * instead of the usual four-up stat grid. Rows boot in one by one, sparklines
 * fill left to right, and hovering (or focusing) a row pipes its detail line
 * into the console footer.
 */
const StatsConsole = ({ stats, className }) => {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const [active, setActive] = useState(0);

  const activeStat = stats[active] ?? stats[0];

  return (
    <div
      ref={ref}
      className={cn(
        'relative overflow-hidden rounded-[1.75rem] border border-border bg-[hsl(var(--surface))]',
        className,
      )}
      aria-label="Key performance metrics"
    >
      {/* Backdrop grid + scanning sweep */}
      <span aria-hidden="true" className="bg-grid-sm pointer-events-none absolute inset-0 opacity-70" />
      {!reduced && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 h-24"
          style={{
            background:
              'linear-gradient(to bottom, transparent, hsl(var(--brand-cyan) / 0.07), transparent)',
          }}
          initial={{ top: '-10%' }}
          animate={inView ? { top: ['-10%', '100%'] } : { top: '-10%' }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
        />
      )}

      {/* Console header */}
      <div className="relative flex items-center justify-between gap-4 border-b border-border px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground md:px-7">
        <span className="flex items-center gap-2.5">
          <span className="relative flex h-1.5 w-1.5">
            {!reduced && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-cyan opacity-75" />
            )}
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-cyan" />
          </span>
          Live
          <span className="text-border">/</span>
          <span className="hidden sm:inline">marketai.ch · performance.log</span>
          <span className="sm:hidden">performance.log</span>
        </span>
        <ConsoleClock />
      </div>

      {/* Rows */}
      <ul className="relative">
        {stats.map((stat, i) => {
          const isActive = i === active;
          const delay = 0.18 + i * 0.14;

          return (
            <motion.li
              key={stat.label}
              className="border-b border-border/70 last:border-b-0"
              initial={reduced ? false : { opacity: 0, x: -12 }}
              animate={inView || reduced ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
              transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                aria-pressed={isActive}
                // The label/detail are hidden by CSS from md up, so spell the row out for AT.
                aria-label={`${stat.value}${stat.suffix} ${stat.label} — ${stat.detail}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={cn(
                  'relative flex w-full flex-col gap-3 px-5 py-5 text-left transition-colors duration-500 md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,9rem)] md:items-center md:gap-8 md:px-7 md:py-6',
                  isActive ? 'bg-[hsl(var(--surface-raised))]' : 'hover:bg-[hsl(var(--surface-raised))]/60',
                )}
              >
                {/* Active edge marker */}
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-y-0 left-0 w-px origin-center bg-brand-cyan transition-transform duration-500 ease-swift',
                    isActive ? 'scale-y-100' : 'scale-y-0',
                  )}
                />

                {/* Key */}
                <span className="flex min-w-0 items-baseline gap-3 font-mono text-[13px]">
                  <span className="text-muted-foreground/60">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={cn(
                      'truncate transition-colors duration-500',
                      isActive ? 'text-foreground' : 'text-muted-foreground',
                    )}
                  >
                    {stat.code}
                  </span>
                </span>

                <Sparkline series={stat.series} active={isActive} inView={inView} delay={delay} />

                {/* Value */}
                <span className="flex items-baseline justify-between gap-4 md:justify-end">
                  <span className="text-gradient-blue-cyan font-display text-[clamp(2rem,5vw,2.75rem)] font-medium leading-none tracking-[-0.03em]">
                    <Counter
                      value={stat.value}
                      decimals={stat.decimals ?? 0}
                      suffix={stat.suffix}
                    />
                  </span>
                  <span className="font-display text-[0.8125rem] font-semibold text-foreground md:hidden">
                    {stat.label}
                  </span>
                </span>

                {/* Mobile detail — the footer readout is desktop-only */}
                <span className="text-muted-foreground font-mono text-[12px] md:hidden">
                  {stat.detail}
                </span>
              </button>
            </motion.li>
          );
        })}
      </ul>

      {/* Console footer readout */}
      <div className="relative hidden items-center gap-3 border-t border-border px-7 py-4 font-mono text-[12.5px] text-muted-foreground md:flex">
        <span className="text-brand-cyan">{'>'}</span>
        <motion.span
          key={activeStat.label}
          initial={reduced ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="truncate"
        >
          <span className="text-foreground">{activeStat.label}</span>
          <span className="text-border"> — </span>
          {activeStat.detail}
        </motion.span>
        <span
          aria-hidden="true"
          className={cn('h-3.5 w-[7px] bg-brand-cyan', !reduced && 'animate-pulse')}
        />
      </div>
    </div>
  );
};

export default StatsConsole;
