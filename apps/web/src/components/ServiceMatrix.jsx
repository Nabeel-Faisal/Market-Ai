import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile.jsx';

/**
 * ServiceMatrix — every service × city combination as one 3D grid instead of
 * six accordions. Hovering a cell lights its row and column and lifts the cell
 * toward the viewer; scroll tilts the plane up to face the reader.
 *
 * Beyond the look, this puts all sixty local pages in the DOM as real links
 * rather than hiding them behind a click.
 */
const ServiceMatrix = ({ services, cities, className }) => {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const ref = useRef(null);
  const [hover, setHover] = useState(null); // { row, col }

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 95%', 'end 60%'] });
  const tiltRaw = useTransform(scrollYProgress, [0, 1], [26, 5]);
  const tilt = useSpring(tiltRaw, { stiffness: 55, damping: 24, mass: 0.85 });
  const turn = useSpring(useMotionValue(0), { stiffness: 110, damping: 22 });
  const planeTransform = useMotionTemplate`rotateX(${tilt}deg) rotateY(${turn}deg)`;

  const handleMove = (event) => {
    if (reduced) return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    turn.set(((event.clientX - rect.left) / rect.width - 0.5) * 12);
  };

  const active = hover ? { service: services[hover.row], city: cities[hover.col] } : null;

  /* Small screens: a plain link list, no grid and no 3D. */
  if (isMobile) {
    return (
      <div className={className}>
        {services.map((service) => (
          <div key={service.slug} className="mb-5">
            <p className="mb-2 font-display text-[0.875rem] font-semibold text-foreground">
              {service.name}
            </p>
            <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
              {cities.map((city) => (
                <li key={city.slug}>
                  <Link
                    to={`/${service.slug}-in-${city.slug}`}
                    className="text-[0.8125rem] text-muted-foreground"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={() => {
        setHover(null);
        turn.set(0);
      }}
      className={cn('relative', className)}
      style={{ perspective: 1600 }}
    >
      <motion.div
        style={{
          transform: reduced ? undefined : planeTransform,
          transformStyle: 'preserve-3d',
          transformOrigin: 'center top',
        }}
      >
        <div
          className="grid gap-1"
          style={{ gridTemplateColumns: `minmax(9rem, 1.4fr) repeat(${cities.length}, minmax(0, 1fr))` }}
        >
          {/* Column headings */}
          <span />
          {cities.map((city, col) => (
            <span
              key={city.slug}
              className={cn(
                'truncate pb-1.5 text-center font-mono text-[10px] uppercase tracking-[0.1em] transition-colors duration-300',
                hover?.col === col ? 'text-brand-cyan' : 'text-muted-foreground',
              )}
            >
              {city.name}
            </span>
          ))}

          {services.map((service, row) => (
            <React.Fragment key={service.slug}>
              <span
                className={cn(
                  'flex items-center pr-3 font-display text-[0.8125rem] font-semibold transition-colors duration-300',
                  hover?.row === row ? 'text-foreground' : 'text-muted-foreground',
                )}
              >
                {service.name}
              </span>

              {cities.map((city, col) => {
                const isHovered = hover?.row === row && hover?.col === col;
                const inCross = hover && (hover.row === row || hover.col === col);

                return (
                  <Link
                    key={city.slug}
                    to={`/${service.slug}-in-${city.slug}`}
                    title={`${service.name} in ${city.name}`}
                    aria-label={`${service.name} in ${city.name}`}
                    onPointerEnter={() => setHover({ row, col })}
                    onFocus={() => setHover({ row, col })}
                    className={cn(
                      'group relative grid h-9 place-items-center rounded-md border transition-all duration-300',
                      isHovered
                        ? 'border-brand-cyan bg-[hsl(var(--brand-cyan)/0.16)]'
                        : inCross
                          ? 'border-brand/40 bg-[hsl(var(--brand)/0.07)]'
                          : 'border-border bg-[hsl(var(--surface)/0.6)]',
                    )}
                    style={{
                      transform: isHovered ? 'translateZ(26px)' : 'translateZ(0)',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        'h-1 w-1 rounded-full transition-all duration-300',
                        isHovered
                          ? 'scale-[2.2] bg-brand-cyan'
                          : inCross
                            ? 'bg-brand'
                            : 'bg-muted-foreground/40',
                      )}
                    />
                  </Link>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </motion.div>

      {/* Readout — always upright, never part of the tilted plane */}
      <div className="mt-5 flex h-6 items-center gap-2 font-mono text-[0.75rem] uppercase tracking-[0.14em]">
        {active ? (
          <motion.span
            key={`${active.service.slug}-${active.city.slug}`}
            initial={reduced ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-2"
          >
            <span className="text-foreground">
              {active.service.name} in {active.city.name}
            </span>
            <ArrowUpRight className="h-3.5 w-3.5 text-brand-cyan" />
          </motion.span>
        ) : (
          <span className="text-muted-foreground">
            {services.length * cities.length} local pages · hover a cell
          </span>
        )}
      </div>
    </div>
  );
};

export default ServiceMatrix;
