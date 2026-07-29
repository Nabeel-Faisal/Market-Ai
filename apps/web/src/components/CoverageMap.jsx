import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile.jsx';

/* Map frame. Width:height follows the real aspect at 47°N — a degree of
 * longitude is about 76 km there against 111 km for latitude — so the country
 * is not stretched. */
const W = 520;
const H = 336;
const LON = [5.9, 10.55];
const LAT = [45.78, 47.85];

const project = ({ lat, lon }) => ({
  x: ((lon - LON[0]) / (LON[1] - LON[0])) * W,
  y: ((LAT[1] - lat) / (LAT[1] - LAT[0])) * H,
});

/* Stylised national outline — a simplified silhouette for the backdrop, not a
 * survey-accurate border. The pins on top of it use real coordinates. */
const BORDER = [
  [6.14, 46.2],
  [5.96, 46.13],
  [6.06, 46.42],
  [6.43, 46.77],
  [6.87, 47.0],
  [7.0, 47.5],
  [7.59, 47.59],
  [8.4, 47.58],
  [8.62, 47.8],
  [9.1, 47.68],
  [9.65, 47.54],
  [9.6, 47.06],
  [10.45, 46.87],
  [10.49, 46.62],
  [10.1, 46.6],
  [9.9, 46.37],
  [9.03, 45.83],
  [8.6, 46.12],
  [8.1, 46.1],
  [7.85, 45.92],
  [7.0, 45.92],
  [6.8, 46.05],
];

const slugOf = (city) => `/web-development-in-${city.toLowerCase().replace(/[. ]+/g, '-')}`;

const PIN_H = 30;
const ACTIVE_PIN_H = 48;
const SWEEP_MS = 1700;

/**
 * Pin — a stem rising off the map with a glowing head. The head is the link, so
 * every city on the map is still a real, crawlable destination.
 */
const Pin = ({ city, point, active, grown, onEnter }) => {
  const height = grown ? (active ? ACTIVE_PIN_H : PIN_H) : 0;

  return (
    <div
      className="absolute"
      style={{ left: point.x, top: point.y, width: 0, height: 0, transformStyle: 'preserve-3d' }}
    >
      {/* Base halo, painted on the map */}
      <span
        aria-hidden="true"
        className="absolute rounded-full transition-all duration-500"
        style={{
          left: -13,
          top: -13,
          width: 26,
          height: 26,
          background: `radial-gradient(circle, hsl(var(--brand-cyan) / ${active ? 0.45 : 0.16}), transparent 70%)`,
        }}
      />

      {/* Stem */}
      <span
        aria-hidden="true"
        className="absolute bottom-0 block transition-[height] duration-700 ease-swift"
        style={{
          left: -1,
          width: 2,
          height,
          transform: 'rotateX(-90deg)',
          transformOrigin: 'bottom center',
          background: `linear-gradient(to top, hsl(var(--brand) / 0.1), hsl(var(--brand-cyan) / 0.9))`,
        }}
      />

      {/* Head — the link */}
      <Link
        to={slugOf(city)}
        aria-label={`Web development in ${city}`}
        onPointerEnter={onEnter}
        className="absolute block rounded-full transition-all duration-500"
        style={{
          left: -5,
          top: -5,
          width: 10,
          height: 10,
          transform: `translateZ(${height}px)`,
          background: active ? 'hsl(var(--brand-cyan))' : 'hsl(var(--brand))',
          boxShadow: active
            ? '0 0 18px hsl(var(--brand-cyan)), 0 0 4px hsl(var(--brand-cyan))'
            : '0 0 8px hsl(var(--brand) / 0.6)',
        }}
      />
    </div>
  );
};

/**
 * CoverageMap — the 15 Swiss cities as pins standing on a tilted 3D map. A
 * sweep walks the network city by city, scroll raises the camera and the
 * pointer turntables the whole plane.
 *
 * Touch and reduced-motion get the plain chip grid.
 */
const CoverageMap = ({ cities, geo, className }) => {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-12% 0px' });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const grown = inView || reduced;

  const points = useMemo(
    () => cities.filter((city) => geo[city]).map((city) => ({ city, ...project(geo[city]) })),
    [cities, geo],
  );

  /* Each city linked to its two nearest neighbours, de-duplicated — enough to
   * read as a network without turning into a hairball. */
  const links = useMemo(() => {
    const seen = new Set();
    const out = [];
    points.forEach((from, i) => {
      const nearest = points
        .map((to, j) => ({ j, d: Math.hypot(to.x - from.x, to.y - from.y) }))
        .filter(({ j }) => j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2);
      nearest.forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (seen.has(key)) return;
        seen.add(key);
        out.push([from, points[j]]);
      });
    });
    return out;
  }, [points]);

  useEffect(() => {
    if (!inView || reduced || paused) return undefined;
    const id = window.setInterval(() => setActive((i) => (i + 1) % points.length), SWEEP_MS);
    return () => window.clearInterval(id);
  }, [inView, paused, points.length, reduced]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const tiltRaw = useTransform(scrollYProgress, [0.1, 0.85], [60, 38]);
  const tilt = useSpring(tiltRaw, { stiffness: 55, damping: 24, mass: 0.85 });
  const orbit = useSpring(useMotionValue(0), { stiffness: 110, damping: 22 });
  const planeTransform = useMotionTemplate`rotateX(${tilt}deg) rotateZ(${orbit}deg)`;

  const handleMove = (event) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    orbit.set(((event.clientX - rect.left) / rect.width - 0.5) * 20);
  };

  if (reduced || isMobile) {
    return (
      <ul className={cn('grid grid-cols-2 gap-2.5 sm:grid-cols-3', className)}>
        {cities.map((city) => (
          <li key={city}>
            <Link
              to={slugOf(city)}
              className="group flex items-center justify-between gap-2 rounded-xl border border-border bg-[hsl(var(--surface))] px-4 py-3 text-[0.875rem]"
            >
              <span className="flex items-center gap-2 text-foreground">
                <MapPin className="h-3.5 w-3.5 text-brand" />
                {city}
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  const activeCity = points[active]?.city;
  const border = BORDER.map(([lon, lat]) => {
    const { x, y } = project({ lat, lon });
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  return (
    <div ref={ref} onPointerMove={handleMove} className={cn('relative', className)}>
      {/* Flat readout — always upright, so the active city is never tilted type */}
      <div className="mb-3 flex items-baseline gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Coverage
        </span>
        <motion.span
          key={activeCity}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="font-display text-[1.05rem] font-semibold text-foreground"
        >
          {activeCity}
        </motion.span>
        <Link
          to={slugOf(activeCity ?? cities[0])}
          className="ml-auto inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.16em] text-brand-cyan"
        >
          Open
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div
        className="relative flex h-[24rem] items-center justify-center"
        style={{ perspective: 1500 }}
        onPointerLeave={() => {
          setPaused(false);
          orbit.set(0);
        }}
      >
        <motion.div
          className="relative"
          style={{ width: W, height: H, transform: planeTransform, transformStyle: 'preserve-3d' }}
        >
          {/* Grid floor */}
          <span
            aria-hidden="true"
            className="bg-grid-sm absolute -inset-24 opacity-50"
            style={{
              maskImage: 'radial-gradient(ellipse 58% 62% at 50% 50%, #000 24%, transparent 76%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 58% 62% at 50% 50%, #000 24%, transparent 76%)',
            }}
          />

          {/* Country + network, lying flat on the plane */}
          <svg
            aria-hidden="true"
            viewBox={`0 0 ${W} ${H}`}
            className="absolute inset-0 h-full w-full overflow-visible"
          >
            <motion.polygon
              points={border}
              fill="hsl(var(--brand) / 0.07)"
              stroke="hsl(var(--brand) / 0.35)"
              strokeWidth="1"
              strokeDasharray="4 5"
              initial={reduced ? false : { opacity: 0 }}
              animate={grown ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.9 }}
            />

            {links.map(([from, to], i) => (
              <line
                key={i}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="hsl(var(--brand-cyan) / 0.28)"
                strokeWidth="0.8"
                strokeDasharray="3 7"
                style={{
                  animation: reduced ? undefined : `map-flow 2.4s linear infinite`,
                  animationDelay: `${(i % 5) * 0.35}s`,
                }}
              />
            ))}
          </svg>

          {points.map((point, i) => (
            <Pin
              key={point.city}
              city={point.city}
              point={point}
              active={i === active}
              grown={grown}
              onEnter={() => {
                setActive(i);
                setPaused(true);
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CoverageMap;
