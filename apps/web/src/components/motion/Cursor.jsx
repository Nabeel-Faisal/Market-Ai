import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

/**
 * Cursor — a two-part pointer: a crisp dot that tracks exactly, and a soft ring
 * that trails behind on a spring. The ring expands and labels itself over
 * interactive elements.
 *
 * Only mounts on devices with a real hover-capable pointer, so touch and
 * reduced-motion visitors keep the native cursor untouched.
 */
const Cursor = () => {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState('default');
  const [label, setLabel] = useState('');
  const [visible, setVisible] = useState(false);
  const pressedRef = useRef(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 30, mass: 0.55 });
  const ringY = useSpring(y, { stiffness: 320, damping: 30, mass: 0.55 });

  useEffect(() => {
    if (reduced) return undefined;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const apply = () => setEnabled(fine.matches);
    apply();
    fine.addEventListener('change', apply);
    return () => fine.removeEventListener('change', apply);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return undefined;

    document.documentElement.setAttribute('data-cursor', 'on');

    const onMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      if (!visible) setVisible(true);

      const target = event.target instanceof Element ? event.target : null;
      const interactive = target?.closest('a, button, [role="button"], input, textarea, select, [data-cursor]');

      if (!interactive) {
        setVariant('default');
        setLabel('');
        return;
      }

      const custom = interactive.getAttribute('data-cursor');
      if (custom && custom !== 'on') {
        setVariant('label');
        setLabel(custom);
      } else if (interactive.matches('input, textarea, select')) {
        setVariant('text');
        setLabel('');
      } else {
        setVariant('hover');
        setLabel('');
      }
    };

    const onDown = () => {
      pressedRef.current = true;
      setVariant((current) => (current === 'default' ? 'press' : current));
    };
    const onUp = () => {
      pressedRef.current = false;
      setVariant((current) => (current === 'press' ? 'default' : current));
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      document.documentElement.removeAttribute('data-cursor');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [enabled, visible, x, y]);

  if (!enabled) return null;

  const ringSize = variant === 'hover' ? 56 : variant === 'label' ? 74 : variant === 'text' ? 4 : 34;
  const ringOpacity = visible ? (variant === 'text' ? 0.9 : 0.55) : 0;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full mix-blend-difference"
        style={{ x, y, width: 6, height: 6, marginLeft: -3, marginTop: -3, background: '#fff' }}
        animate={{ opacity: visible && variant !== 'text' ? 1 : 0, scale: variant === 'press' ? 0.6 : 1 }}
        transition={{ duration: 0.16 }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9998] flex items-center justify-center rounded-full font-mono text-[10px] uppercase tracking-[0.16em] text-white"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          border: '1px solid hsl(var(--brand-cyan))',
          background: variant === 'label' ? 'hsl(var(--brand) / 0.92)' : 'transparent',
          backdropFilter: variant === 'hover' ? 'blur(2px)' : 'none',
        }}
        animate={{
          width: ringSize,
          height: variant === 'text' ? 26 : ringSize,
          opacity: ringOpacity,
          borderRadius: variant === 'text' ? 2 : 999,
        }}
        transition={{ type: 'spring', stiffness: 340, damping: 26 }}
      >
        {variant === 'label' ? label : null}
      </motion.div>
    </>
  );
};

export default Cursor;
