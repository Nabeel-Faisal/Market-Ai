import React, { useEffect, useRef, useState } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

const STEP_DEG = 34; // angle between neighbouring cards on the drum
const CYCLE_MS = 4600;

/* Shortest signed distance from the drum position to card i, wrapped. */
const wrapOffset = (index, position, count) => {
  const raw = ((index - position) % count + count) % count;
  return raw > count / 2 ? raw - count : raw;
};

const initials = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

const sectorOf = (role) => role.split(', ')[1] ?? role;

/* One quote, seated on the drum by its distance from the front. */
const DrumCard = ({ item, index, position, count }) => {
  const offset = useTransform(position, (value) => wrapOffset(index, value, count));

  const rotateX = useTransform(offset, (o) => -o * STEP_DEG);
  const y = useTransform(offset, (o) => o * 54);
  const z = useTransform(offset, (o) => -Math.abs(o) * 150);
  const scale = useTransform(offset, (o) => 1 - Math.min(0.24, Math.abs(o) * 0.1));
  const opacity = useTransform(offset, (o) => Math.max(0, 1 - Math.abs(o) * 0.44));
  const zIndex = useTransform(offset, (o) => 100 - Math.round(Math.abs(o) * 10));
  const filter = useTransform(offset, (o) =>
    Math.abs(o) < 0.12 ? 'none' : `blur(${Math.min(5.5, Math.abs(o) * 3.2)}px)`,
  );

  return (
    <motion.figure
      className="absolute inset-x-0 top-1/2 mx-auto w-full max-w-xl -translate-y-1/2"
      style={{ rotateX, y, z, scale, opacity, zIndex, filter, transformStyle: 'preserve-3d' }}
    >
      <div className="rounded-[1.75rem] border border-border bg-[hsl(var(--surface)/0.9)] p-8 shadow-lifted backdrop-blur-xl md:p-9">
        <Quote className="mb-5 h-7 w-7 text-brand opacity-50" aria-hidden="true" />
        <blockquote className="text-[1.0625rem] leading-relaxed text-foreground md:text-[1.15rem]">
          {item.quote}
        </blockquote>
        <figcaption className="mt-7 flex items-center gap-3 border-t border-border pt-5">
          <span
            aria-hidden="true"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full font-display text-[0.8125rem] font-semibold text-white"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--brand)), hsl(var(--brand-violet)))',
            }}
          >
            {initials(item.author)}
          </span>
          <span>
            <span className="block font-display text-[0.9375rem] font-semibold text-foreground">
              {item.author}
            </span>
            <span className="block text-[0.8125rem] text-muted-foreground">
              {item.role} · {item.location}
            </span>
          </span>
        </figcaption>
      </div>
    </motion.figure>
  );
};

/**
 * TestimonialDrum — the client quotes mounted on a 3D drum. Scroll turns it,
 * it keeps turning on its own when left alone, and the author rail on the left
 * both navigates it and shows which quote is up next.
 *
 * Below lg the drum is dropped for a plain stack — same DOM, no 3D.
 */
const TestimonialDrum = ({ items, className }) => {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-15% 0px' });
  const [spatial, setSpatial] = useState(false);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)');
    const sync = () => setSpatial(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  const use3D = spatial && !reduced;

  // Scroll turns the drum through one full revolution as the section passes.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scrollDrive = useTransform(scrollYProgress, [0, 1], [0, items.length]);
  const auto = useMotionValue(0);

  const raw = useTransform([scrollDrive, auto], ([s, a]) => s + a);
  const position = useSpring(raw, { stiffness: 85, damping: 20, mass: 0.7 });

  useMotionValueEvent(position, 'change', (value) => {
    const next = ((Math.round(value) % items.length) + items.length) % items.length;
    setActive((current) => (current === next ? current : next));
  });

  // Idle auto-advance
  useEffect(() => {
    if (!use3D || !inView || paused) return undefined;
    const id = window.setInterval(() => {
      animate(auto, auto.get() + 1, { duration: 1.2, ease: [0.22, 1, 0.36, 1] });
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [auto, inView, paused, use3D]);

  const goTo = (index) => {
    if (!use3D) return;
    animate(auto, auto.get() + wrapOffset(index, position.get(), items.length), {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    });
  };

  // Pointer tilt for the whole assembly
  const tilt = useSpring(useMotionValue(0), { stiffness: 140, damping: 20 });
  const lift = useSpring(useMotionValue(0), { stiffness: 140, damping: 20 });

  const handleMove = (event) => {
    if (!use3D) return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    tilt.set(((event.clientX - rect.left) / rect.width - 0.5) * 14);
    lift.set(((event.clientY - rect.top) / rect.height - 0.5) * -18);
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => {
        setPaused(false);
        tilt.set(0);
        lift.set(0);
      }}
      className={cn('relative grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]', className)}
    >
      {/* ---- Author rail ---- */}
      <div className="relative z-10">
        <ul className="border-t border-border">
          {items.map((item, i) => {
            const isActive = i === active;

            return (
              <li key={item.author} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-pressed={isActive}
                  className={cn(
                    'group relative flex w-full items-center gap-4 py-4 text-left transition-opacity duration-500',
                    isActive ? 'opacity-100' : 'opacity-45 hover:opacity-80',
                  )}
                >
                  {/* Auto-advance timer under the active author */}
                  {isActive && use3D && !paused && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-px origin-left bg-brand-cyan"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: CYCLE_MS / 1000, ease: 'linear' }}
                    />
                  )}

                  <span
                    aria-hidden="true"
                    className={cn(
                      'grid h-9 w-9 shrink-0 place-items-center rounded-full font-display text-[0.75rem] font-semibold transition-all duration-500',
                      isActive ? 'text-white' : 'text-muted-foreground',
                    )}
                    style={
                      isActive
                        ? {
                            background:
                              'linear-gradient(135deg, hsl(var(--brand)), hsl(var(--brand-violet)))',
                          }
                        : { border: '1px solid hsl(var(--border))' }
                    }
                  >
                    {initials(item.author)}
                  </span>

                  <span className="min-w-0">
                    <span className="block font-display text-[0.9375rem] font-semibold text-foreground">
                      {item.author}
                    </span>
                    <span className="block truncate font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
                      {sectorOf(item.role)} · {item.location}
                    </span>
                  </span>

                  <span className="ml-auto font-mono text-[11px] tabular-nums text-muted-foreground">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
          {items.length} clients · {new Set(items.map((item) => item.location)).size} Swiss cities
        </p>
      </div>

      {/* ---- Drum ---- */}
      {use3D ? (
        <div className="relative" style={{ perspective: 1400 }}>
          {/* Ghost glyph behind the drum */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 select-none font-display text-[20rem] font-medium leading-none text-foreground opacity-[0.035]"
          >
            &rdquo;
          </span>

          <motion.div
            className="relative h-[26rem]"
            style={{ rotateY: tilt, rotateX: lift, transformStyle: 'preserve-3d' }}
          >
            {items.map((item, i) => (
              <DrumCard
                key={item.author}
                item={item}
                index={i}
                position={position}
                count={items.length}
              />
            ))}
          </motion.div>

          {/* Ground glow so the drum sits on something */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-12 -bottom-2 h-24 rounded-[50%] blur-2xl"
            style={{
              background:
                'radial-gradient(ellipse at center, hsl(var(--brand) / 0.22), transparent 70%)',
            }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-20 bottom-6 h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent, hsl(var(--border)), transparent)',
            }}
          />
        </div>
      ) : (
        /* Plain stack — touch and reduced-motion */
        <div className="grid gap-4">
          {items.map((item) => (
            <figure
              key={item.author}
              className="rounded-[1.5rem] border border-border bg-[hsl(var(--surface)/0.9)] p-7"
            >
              <Quote className="mb-4 h-6 w-6 text-brand opacity-50" aria-hidden="true" />
              <blockquote className="text-[1rem] leading-relaxed text-foreground">
                {item.quote}
              </blockquote>
              <figcaption className="mt-5 border-t border-border pt-4 text-[0.8125rem] text-muted-foreground">
                <span className="font-display font-semibold text-foreground">{item.author}</span> ·{' '}
                {item.role} · {item.location}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialDrum;
