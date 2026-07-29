import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import {
  ArrowUpRight,
  BarChart3,
  Code2,
  Palette,
  Search,
  Smartphone,
  TrendingUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ICONS = { Code2, Smartphone, TrendingUp, Search, Palette, BarChart3 };

/* True only where a real cursor exists — the follow card is pointless on touch. */
const useFinePointer = () => {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => setFine(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  return fine;
};

const ServiceRow = ({ service, index, active, dimmed, autoplaying, cycleMs, onEnter, onLeave }) => {
  const reduced = useReducedMotion();
  const Icon = ICONS[service.icon] ?? Code2;
  const accent = `hsl(var(--${service.accent}))`;

  return (
    <motion.li
      className="border-t border-border last:border-b"
      initial={reduced ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <Link
        to={service.slug}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onFocus={onEnter}
        onBlur={onLeave}
        aria-label={`${service.name} — ${service.tagline}`}
        className={cn(
          'group relative block overflow-hidden px-1 transition-opacity duration-500 sm:px-3',
          dimmed ? 'opacity-40' : 'opacity-100',
        )}
      >
        {/* Accent wash that sweeps in from the left */}
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-0 origin-left transition-transform duration-700 ease-swift',
            active ? 'scale-x-100' : 'scale-x-0',
          )}
          style={{ background: `linear-gradient(90deg, hsl(var(--${service.accent}) / 0.12), transparent 70%)` }}
        />

        {/* Timer bar — only while the list is advancing on its own */}
        {active && autoplaying && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left"
            style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: cycleMs / 1000, ease: 'linear' }}
          />
        )}

        <div className="relative flex items-center gap-5 py-7 md:gap-8 md:py-9">
          <span className="font-mono text-[12px] tabular-nums text-muted-foreground md:text-[13px]">
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Icon chip — slides in with the accent wash on desktop */}
          <span
            aria-hidden="true"
            className={cn(
              'hidden h-11 w-11 shrink-0 place-items-center rounded-2xl border border-border transition-all duration-500 ease-swift md:grid',
              active ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0',
            )}
            style={{ background: `hsl(var(--${service.accent}) / 0.13)` }}
          >
            <Icon className="h-[21px] w-[21px]" style={{ color: accent }} strokeWidth={1.7} />
          </span>

          <span className="min-w-0 flex-1">
            <span className="block overflow-hidden">
              <motion.span
                className="block font-display text-[clamp(1.6rem,4.2vw,2.9rem)] font-medium leading-[1.1] tracking-[-0.03em] text-foreground"
                initial={reduced ? false : { y: '110%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true, margin: '-12% 0px' }}
                transition={{ duration: 0.7, delay: 0.08 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                {service.name}
              </motion.span>
            </span>

            {/* Tagline carries the row on touch, where there is no hover state */}
            <span className="mt-1.5 block text-[0.875rem] text-muted-foreground md:hidden">
              {service.tagline}
            </span>
          </span>

          <span
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border transition-all duration-500 ease-swift"
            style={
              active
                ? { borderColor: accent, background: `hsl(var(--${service.accent}) / 0.13)` }
                : undefined
            }
          >
            <ArrowUpRight
              className="h-5 w-5 transition-transform duration-500 ease-swift group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              style={active ? { color: accent } : undefined}
              strokeWidth={1.7}
            />
          </span>
        </div>

        {/* Detail drawer — grid-rows trick keeps it CSS-only and jank-free */}
        <div
          className={cn(
            'relative grid transition-[grid-template-rows,opacity] duration-500 ease-swift',
            active ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
          )}
        >
          <div className="overflow-hidden">
            <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2 pb-8 pl-0 md:pl-[6.5rem]">
              <p className="max-w-xl text-[0.9375rem] leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <span
                className="font-display text-[0.875rem] font-semibold"
                style={{ color: accent }}
              >
                Explore service →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.li>
  );
};

/**
 * ServiceIndex — the service list as an editorial index rather than a card grid.
 * Rows type in on scroll, then cycle open on their own while the list is in
 * view; hovering or focusing a row takes over, and a small preview card follows
 * the cursor with that service's identity.
 */
const ServiceIndex = ({ services, className, cycleMs = 2000 }) => {
  const reduced = useReducedMotion();
  const finePointer = useFinePointer();
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { margin: '-25% 0px' });
  const [hoverIndex, setHoverIndex] = useState(null);
  const [autoIndex, setAutoIndex] = useState(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 340, damping: 34, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 340, damping: 34, mass: 0.6 });

  // Autoplay only runs when nobody is driving and the list is actually on screen.
  const autoplaying = !reduced && inView && hoverIndex === null;

  useEffect(() => {
    if (!autoplaying) return undefined;
    const id = window.setInterval(
      () => setAutoIndex((i) => (i + 1) % services.length),
      cycleMs,
    );
    return () => window.clearInterval(id);
  }, [autoplaying, cycleMs, services.length]);

  // Resume from wherever the visitor left off rather than jumping back.
  const handleLeave = () => {
    setAutoIndex(hoverIndex ?? 0);
    setHoverIndex(null);
  };

  const activeIndex = hoverIndex ?? (autoplaying ? autoIndex : null);
  const showPreview = finePointer && !reduced && hoverIndex !== null;
  const activeService = hoverIndex === null ? null : services[hoverIndex];
  const ActiveIcon = activeService ? ICONS[activeService.icon] ?? Code2 : null;

  const handleMove = (event) => {
    const node = containerRef.current;
    if (!node || !finePointer) return;
    const rect = node.getBoundingClientRect();
    // Keep the card clear of the edges — the section clips its overflow.
    const half = 130;
    x.set(Math.min(Math.max(event.clientX - rect.left, half), rect.width - half));
    y.set(Math.max(event.clientY - rect.top, 150));
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handleMove}
      className={cn('relative', className)}
    >
      <ul>
        {services.map((service, index) => (
          <ServiceRow
            key={service.slug}
            service={service}
            index={index}
            active={activeIndex === index}
            dimmed={activeIndex !== null && activeIndex !== index}
            autoplaying={autoplaying && autoIndex === index}
            cycleMs={cycleMs}
            onEnter={() => setHoverIndex(index)}
            onLeave={handleLeave}
          />
        ))}
      </ul>

      {/* Cursor-follow preview */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-20 hidden md:block"
            style={{ x: springX, y: springY }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="-translate-x-1/2 -translate-y-[130%]">
              <div
                className="w-60 overflow-hidden rounded-2xl border border-border bg-[hsl(var(--surface)/0.92)] p-4 shadow-lifted backdrop-blur-xl"
                style={{ borderColor: `hsl(var(--${activeService.accent}) / 0.45)` }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-9 w-9 place-items-center rounded-xl"
                    style={{ background: `hsl(var(--${activeService.accent}) / 0.16)` }}
                  >
                    <ActiveIcon
                      className="h-[18px] w-[18px]"
                      style={{ color: `hsl(var(--${activeService.accent}))` }}
                      strokeWidth={1.8}
                    />
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {activeService.short}
                  </span>
                </div>
                <p className="mt-3 font-display text-[0.9375rem] font-semibold leading-snug text-foreground">
                  {activeService.tagline}
                </p>
                <span
                  aria-hidden="true"
                  className="mt-3 block h-px w-full"
                  style={{
                    background: `linear-gradient(90deg, hsl(var(--${activeService.accent})), transparent)`,
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceIndex;
