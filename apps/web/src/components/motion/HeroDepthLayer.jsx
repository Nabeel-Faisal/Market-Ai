import React, { Suspense, lazy, useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const HeroDepthScene = lazy(() => import('@/components/motion/HeroDepthScene.jsx'));

/**
 * HeroDepthLayer — gate in front of the WebGL scene. Keeps three.js out of the
 * initial bundle and off small or touch screens, where it buys nothing.
 */
const HeroDepthLayer = ({ className }) => {
  const reduced = useReducedMotion();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)');
    const sync = () => setAllowed(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  if (reduced || !allowed) return null;

  return (
    <Suspense fallback={null}>
      <HeroDepthScene className={className} />
    </Suspense>
  );
};

export default HeroDepthLayer;
