import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

/**
 * Logo — wordmark with an animated gradient glyph.
 */
const Logo = ({ className, onClick, compact = false }) => (
  <Link
    to="/"
    onClick={onClick}
    aria-label="Market Ai — home"
    className={cn('group inline-flex items-center gap-2.5', className)}
  >
    <span className="relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-[11px]">
      <span
        aria-hidden="true"
        className="absolute inset-0 animate-gradient-x rounded-[11px] opacity-90 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(115deg, hsl(var(--brand)), hsl(var(--brand-cyan)), hsl(var(--brand-violet)), hsl(var(--brand)))',
          backgroundSize: '300% 100%',
        }}
      />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="relative z-10 h-[19px] w-[19px] text-white transition-transform duration-500 ease-swift group-hover:scale-110"
        aria-hidden="true"
      >
        <path
          d="M4 18V6l4 6.5L12 6v12"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="18.5" cy="8" r="2" fill="currentColor" />
        <path d="M18.5 12.5V18" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
      </svg>
    </span>

    {!compact && (
      <span className="font-display text-[1.0625rem] font-semibold tracking-[-0.02em] text-foreground">
        Market<span className="text-gradient-blue-cyan"> Ai</span>
      </span>
    )}
  </Link>
);

export default Logo;
