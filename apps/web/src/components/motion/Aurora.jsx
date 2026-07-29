import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Aurora — slow-drifting colour blooms behind a section.
 *
 * Pure CSS (blur + transform), so it stays on the compositor and costs
 * essentially nothing at runtime. Intensity is driven by --aurora-alpha,
 * which drops in light mode so the palette stays clean rather than muddy.
 */
const Aurora = ({ className, variant = 'brand', density = 3 }) => {
  const palettes = {
    brand: ['var(--brand)', 'var(--brand-cyan)', 'var(--brand-violet)'],
    violet: ['var(--brand-violet)', 'var(--brand-pink)', 'var(--brand)'],
    cyan: ['var(--brand-cyan)', 'var(--brand)', 'var(--brand-lime)'],
    warm: ['var(--brand-amber)', 'var(--brand-pink)', 'var(--brand-violet)'],
  };

  const colors = palettes[variant] ?? palettes.brand;

  const blobs = [
    { size: '46rem', top: '-14%', left: '-8%', duration: '22s', delay: '0s' },
    { size: '38rem', top: '18%', left: '58%', duration: '28s', delay: '-6s' },
    { size: '32rem', top: '52%', left: '18%', duration: '25s', delay: '-12s' },
  ].slice(0, density);

  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      {blobs.map((blob, index) => (
        <div
          key={index}
          className="absolute animate-aurora rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            top: blob.top,
            left: blob.left,
            background: `radial-gradient(circle at 50% 50%, hsl(${colors[index % colors.length]} / var(--aurora-alpha)), transparent 68%)`,
            filter: 'blur(64px)',
            animationDuration: blob.duration,
            animationDelay: blob.delay,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
};

export default Aurora;
