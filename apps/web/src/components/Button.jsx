import React from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Magnetic } from '@/components/motion/Primitives.jsx';

/**
 * Button — the single call-to-action primitive for the whole site.
 *
 * Renders as <button>, <a> or react-router <Link> depending on props, and
 * optionally leans toward the pointer via the Magnetic wrapper.
 */
const VARIANTS = {
  primary: 'btn-primary',
  secondary: 'btn-ghost',
  ghost: 'btn-ghost',
  purple:
    'btn text-white shadow-[0_10px_30px_-12px_hsl(var(--brand-violet)/0.85)] hover:-translate-y-0.5',
  cyan: 'btn text-white shadow-[0_10px_30px_-12px_hsl(var(--brand-cyan)/0.85)] hover:-translate-y-0.5',
  danger:
    'btn border border-destructive text-destructive hover:bg-destructive hover:text-white hover:-translate-y-0.5',
  link: 'inline-flex items-center gap-2 font-display font-semibold text-brand transition-colors duration-300 hover:text-brand-cyan',
};

const VARIANT_STYLES = {
  purple: {
    background:
      'linear-gradient(120deg, hsl(var(--brand-violet)), hsl(var(--brand-pink)))',
  },
  cyan: {
    background: 'linear-gradient(120deg, hsl(var(--brand-cyan)), hsl(var(--brand)))',
  },
};

const SIZES = {
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
};

const Button = React.forwardRef(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled = false,
      magnetic = true,
      to,
      href,
      className,
      children,
      type = 'button',
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    const classes = cn(
      VARIANTS[variant] ?? VARIANTS.primary,
      variant !== 'link' && SIZES[size],
      isDisabled && 'pointer-events-none opacity-50',
      className
    );

    const style = VARIANT_STYLES[variant];

    const content = (
      <>
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {children}
      </>
    );

    let element;
    if (to) {
      element = (
        <Link ref={ref} to={to} className={classes} style={style} {...rest}>
          {content}
        </Link>
      );
    } else if (href) {
      element = (
        <a ref={ref} href={href} className={classes} style={style} {...rest}>
          {content}
        </a>
      );
    } else {
      element = (
        <button ref={ref} type={type} disabled={isDisabled} className={classes} style={style} {...rest}>
          {content}
        </button>
      );
    }

    if (!magnetic || isDisabled || variant === 'link') return element;

    return (
      <Magnetic className="inline-flex" strength={0.24} radius={90}>
        {element}
      </Magnetic>
    );
  }
);

Button.displayName = 'Button';

export default Button;
