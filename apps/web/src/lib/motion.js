/**
 * Shared motion vocabulary.
 *
 * Every animation in the site pulls its easing and timing from here so the
 * whole experience feels like one continuous system rather than a pile of
 * unrelated transitions.
 */

export const EASE = {
  swift: [0.22, 1, 0.36, 1],
  spring: [0.34, 1.56, 0.64, 1],
  inOut: [0.65, 0, 0.35, 1],
};

export const DURATION = {
  fast: 0.35,
  base: 0.6,
  slow: 0.9,
  glacial: 1.4,
};

/** Direction → initial offset map used by <Reveal>. */
export const OFFSETS = {
  up: { y: 34, x: 0 },
  down: { y: -34, x: 0 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none: { x: 0, y: 0 },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE.swift },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.base, ease: EASE.swift } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.base, ease: EASE.swift },
  },
};

/** Parent container that staggers its children. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});

/** Word-by-word headline reveal. */
export const wordVariants = {
  hidden: { opacity: 0, y: '0.55em', rotateX: -55 },
  visible: {
    opacity: 1,
    y: '0em',
    rotateX: 0,
    transition: { duration: 0.75, ease: EASE.swift },
  },
};

/** Route-level page transition. */
export const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE.swift },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.28, ease: EASE.inOut },
  },
};

/** Default viewport config — fires once, slightly before the element is centred. */
export const VIEWPORT = { once: true, margin: '-12% 0px -12% 0px' };
