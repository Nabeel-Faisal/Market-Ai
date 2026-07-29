import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { cn } from '@/lib/utils';
import { DURATION, EASE, OFFSETS, VIEWPORT, wordVariants } from '@/lib/motion';

/* ------------------------------------------------------------------ *
 * Reveal — scroll-triggered entrance for any block of content.
 * ------------------------------------------------------------------ */
export const Reveal = ({
  children,
  as = 'div',
  direction = 'up',
  delay = 0,
  duration = DURATION.base,
  distance,
  blur = false,
  className,
  once = true,
  ...rest
}) => {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] || motion.div;
  const offset = OFFSETS[direction] ?? OFFSETS.up;

  const from = distance
    ? {
        x: offset.x ? Math.sign(offset.x) * distance : 0,
        y: offset.y ? Math.sign(offset.y) * distance : 0,
      }
    : offset;

  if (reduced) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      // `filter` is only declared when blurring is requested — an always-on
      // filter would create a containing block and force a GPU layer on every
      // revealed element.
      initial={{ opacity: 0, ...from, ...(blur && { filter: 'blur(10px)' }) }}
      whileInView={{ opacity: 1, x: 0, y: 0, ...(blur && { filter: 'blur(0px)' }) }}
      viewport={{ ...VIEWPORT, once }}
      transition={{ duration, delay, ease: EASE.swift }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
};

/* ------------------------------------------------------------------ *
 * Stagger — reveals children one after another.
 * ------------------------------------------------------------------ */
export const Stagger = ({ children, className, gap = 0.09, delay = 0, as = 'div', ...rest }) => {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (reduced) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: gap, delayChildren: delay } } }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
};

export const StaggerItem = ({ children, className, direction = 'up', as = 'div', ...rest }) => {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] || motion.div;
  const offset = OFFSETS[direction] ?? OFFSETS.up;

  if (reduced) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      variants={{
        hidden: { opacity: 0, ...offset },
        visible: { opacity: 1, x: 0, y: 0, transition: { duration: DURATION.base, ease: EASE.swift } },
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
};

/* ------------------------------------------------------------------ *
 * SplitText — headline that reveals word by word with a 3D tilt.
 * ------------------------------------------------------------------ */
export const SplitText = ({
  text,
  as: Tag = 'h2',
  className,
  wordClassName,
  delay = 0,
  gap = 0.055,
  animateOnMount = false,
}) => {
  const reduced = useReducedMotion();
  const words = String(text).split(' ');

  if (reduced) return <Tag className={className}>{text}</Tag>;

  const MotionTag = motion[Tag] || motion.h2;
  const trigger = animateOnMount
    ? { animate: 'visible' }
    : { whileInView: 'visible', viewport: VIEWPORT };

  return (
    <MotionTag
      className={className}
      style={{ perspective: 800 }}
      initial="hidden"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: gap, delayChildren: delay } } }}
      {...trigger}
    >
      {words.map((word, index) => (
        <React.Fragment key={`${word}-${index}`}>
          <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className={cn('inline-block', wordClassName)}
              variants={wordVariants}
              style={{ transformOrigin: 'bottom center' }}
            >
              {word}
            </motion.span>
          </span>
          {/* The gap sits in normal flow instead of inside a clipped,
              transformed box, so words cannot collide mid-animation — and the
              headline can still wrap between words on narrow screens. */}
          {index < words.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </MotionTag>
  );
};

/* ------------------------------------------------------------------ *
 * Magnetic — element leans toward the pointer, then snaps back.
 * ------------------------------------------------------------------ */
export const Magnetic = ({ children, strength = 0.32, radius = 120, className, ...rest }) => {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 22, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 260, damping: 22, mass: 0.5 });

  const handleMove = (event) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    const distance = Math.hypot(relX, relY);
    const falloff = Math.max(0, 1 - distance / (radius + rect.width / 2));
    x.set(relX * strength * falloff);
    y.set(relY * strength * falloff);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  if (reduced) {
    return (
      <div ref={ref} className={className} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

/* ------------------------------------------------------------------ *
 * TiltCard — 3D pointer tilt plus a spotlight that tracks the cursor.
 * ------------------------------------------------------------------ */
export const TiltCard = ({ children, className, intensity = 8, spotlight = true, ...rest }) => {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);

  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const spotlightBg = useMotionTemplate`radial-gradient(340px circle at ${pointerX}% ${pointerY}%, hsl(var(--brand) / 0.16), transparent 70%)`;

  const handleMove = (event) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * intensity * 2);
    rotateX.set((0.5 - py) * intensity * 2);
    pointerX.set(px * 100);
    pointerY.set(py * 100);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  if (reduced) {
    return (
      <div ref={ref} className={className} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={cn('relative', className)}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ rotateX: springX, rotateY: springY, transformStyle: 'preserve-3d', perspective: 1000 }}
      {...rest}
    >
      {spotlight && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: spotlightBg }}
        />
      )}
      {children}
    </motion.div>
  );
};

/* ------------------------------------------------------------------ *
 * Counter — animated number that counts up when scrolled into view.
 * ------------------------------------------------------------------ */
export const Counter = ({
  value,
  duration = 1.8,
  decimals = 0,
  prefix = '',
  suffix = '',
  className,
}) => {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const [display, setDisplay] = useState(reduced ? value : 0);
  const startedAt = useRef(null);

  useAnimationFrame((time) => {
    if (reduced || !inView || display === value) return;
    if (startedAt.current === null) startedAt.current = time;
    const elapsed = (time - startedAt.current) / 1000;
    const progress = Math.min(elapsed / duration, 1);
    // easeOutExpo — fast start, gentle settle
    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    setDisplay(progress === 1 ? value : value * eased);
  });

  const formatted = Number(display).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

/* ------------------------------------------------------------------ *
 * Marquee — seamless infinite ticker.
 * ------------------------------------------------------------------ */
export const Marquee = ({ children, speed = 42, reverse = false, className, pauseOnHover = true }) => {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className={cn('flex gap-10 overflow-x-auto hide-scrollbar', className)}>{children}</div>
    );
  }

  return (
    <div className={cn('group relative flex overflow-hidden', className)}>
      <div
        className={cn(
          'flex min-w-full shrink-0 items-center gap-10',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee',
          pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )}
        style={{ '--marquee-duration': `${speed}s` }}
      >
        {children}
        <span aria-hidden="true" className="flex shrink-0 items-center gap-10">
          {children}
        </span>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ *
 * ScrollProgress — gradient bar pinned under the header.
 * ------------------------------------------------------------------ */
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left"
      style={{
        scaleX,
        background:
          'linear-gradient(90deg, hsl(var(--brand)), hsl(var(--brand-cyan)), hsl(var(--brand-violet)))',
      }}
    />
  );
};

/* ------------------------------------------------------------------ *
 * Parallax — moves a layer at a different rate than the page scroll.
 * ------------------------------------------------------------------ */
export const Parallax = ({ children, offset = 60, className }) => {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const smoothY = useSpring(y, { stiffness: 90, damping: 26 });

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} className={className} style={{ y: smoothY }}>
      {children}
    </motion.div>
  );
};

/* ------------------------------------------------------------------ *
 * useMounted — small helper for client-only effects.
 * ------------------------------------------------------------------ */
export const useMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
};
