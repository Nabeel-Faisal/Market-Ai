import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * ParticleField — canvas constellation that reacts to the pointer.
 *
 * Deliberately cheap: one canvas, DPR-aware, particle count scales with the
 * viewport, the loop pauses when the section scrolls out of view or the tab is
 * hidden, and it renders nothing at all when the visitor prefers reduced
 * motion.
 *
 * It is also held off small and touch screens, matching HeroDepthLayer. The
 * link pass is O(n²) with a separate stroke() per link every frame, which a
 * phone pays for in dropped frames — and the effect is pointer-reactive, so on
 * a touch device it buys nothing to begin with.
 */
const ParticleField = ({
  className,
  density = 0.00009,
  linkDistance = 128,
  interactive = true,
  repelRadius = 180,
  repelStrength = 1.6,
}) => {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);
  const particlesRef = useRef([]);
  const pointerRef = useRef({ x: -9999, y: -9999 });
  const runningRef = useRef(true);
  const reduced = useReducedMotion();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)');
    const sync = () => setAllowed(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  const readAccent = useCallback(() => {
    const styles = getComputedStyle(document.documentElement);
    return {
      dot: `hsl(${styles.getPropertyValue('--brand-cyan').trim()})`,
      link: `hsl(${styles.getPropertyValue('--brand').trim()})`,
      isDark: document.documentElement.classList.contains('dark'),
    };
  }, []);

  useEffect(() => {
    if (reduced || !allowed) return undefined;

    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return undefined;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let accent = readAccent();

    const seed = () => {
      const target = Math.min(140, Math.max(28, Math.round(width * height * density)));
      particlesRef.current = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.24,
        vy: (Math.random() - 0.5) * 0.24,
        r: Math.random() * 1.5 + 0.6,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const particles = particlesRef.current;
      const pointer = pointerRef.current;
      const baseAlpha = accent.isDark ? 0.55 : 0.4;

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Distance to the pointer drives both the push and the highlight
        let pointerFalloff = 0;
        if (interactive) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < repelRadius && dist > 0.5) {
            // Eased repulsion — strongest at the cursor, nothing at the rim
            pointerFalloff = 1 - dist / repelRadius;
            const push = pointerFalloff * pointerFalloff * repelStrength;
            p.x -= (dx / dist) * push;
            p.y -= (dy / dist) * push;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + pointerFalloff * 1.4, 0, Math.PI * 2);
        ctx.fillStyle = accent.dot;
        ctx.globalAlpha = Math.min(1, baseAlpha + pointerFalloff * 0.5);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j += 1) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDistance) {
            // Links inside the cursor's field brighten and thicken
            let glow = 0;
            if (interactive) {
              const midDist = Math.hypot(pointer.x - (p.x + q.x) / 2, pointer.y - (p.y + q.y) / 2);
              if (midDist < repelRadius) glow = 1 - midDist / repelRadius;
            }

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = glow > 0.15 ? accent.dot : accent.link;
            ctx.globalAlpha =
              (1 - dist / linkDistance) * (accent.isDark ? 0.22 : 0.14) * (1 + glow * 2.6);
            ctx.lineWidth = 0.7 + glow * 0.8;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      frameRef.current = window.requestAnimationFrame(draw);
    };

    const start = () => {
      if (runningRef.current) return;
      runningRef.current = true;
      frameRef.current = window.requestAnimationFrame(draw);
    };

    const stop = () => {
      runningRef.current = false;
      window.cancelAnimationFrame(frameRef.current);
    };

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    const onPointerLeave = () => {
      pointerRef.current = { x: -9999, y: -9999 };
    };

    const onVisibility = () => (document.hidden ? stop() : start());

    resize();
    runningRef.current = false;
    start();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // Pause when the canvas leaves the viewport
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    io.observe(canvas);

    // Re-read palette when the theme flips
    const themeObserver = new MutationObserver(() => {
      accent = readAccent();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    if (interactive) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('pointerleave', onPointerLeave);
    }
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      resizeObserver.disconnect();
      io.disconnect();
      themeObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [allowed, density, interactive, linkDistance, readAccent, reduced, repelRadius, repelStrength]);

  if (reduced || !allowed) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
    />
  );
};

export default ParticleField;
