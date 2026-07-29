import * as React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef(({ className, type, error, success, helperText, ...props }, ref) => (
  <div className="relative w-full">
    <div className="relative flex items-center">
      <input
        type={type}
        ref={ref}
        aria-invalid={error ? true : undefined}
        className={cn(
          'form-input-base',
          error && 'form-input-error',
          success && 'border-[hsl(var(--success))]',
          (error || success) && 'pr-11',
          className
        )}
        {...props}
      />
      {success && !error && (
        <CheckCircle2 className="pointer-events-none absolute right-4 h-4 w-4 text-[hsl(var(--success))]" />
      )}
      {error && <AlertCircle className="pointer-events-none absolute right-4 h-4 w-4 text-destructive" />}
    </div>

    {(error || helperText) && (
      <p className={cn('mt-1.5 text-[0.8125rem]', error ? 'text-destructive' : 'text-muted-foreground')}>
        {error || helperText}
      </p>
    )}
  </div>
));

Input.displayName = 'Input';

export { Input };
