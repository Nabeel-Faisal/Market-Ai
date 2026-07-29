import * as React from 'react';
import { cn } from '@/lib/utils';

const Textarea = React.forwardRef(({ className, error, helperText, ...props }, ref) => (
  <div className="relative w-full">
    <textarea
      ref={ref}
      aria-invalid={error ? true : undefined}
      className={cn('form-input-base min-h-[120px] resize-y', error && 'form-input-error', className)}
      {...props}
    />

    {(error || helperText) && (
      <p className={cn('mt-1.5 text-[0.8125rem]', error ? 'text-destructive' : 'text-muted-foreground')}>
        {error || helperText}
      </p>
    )}
  </div>
));

Textarea.displayName = 'Textarea';

export { Textarea };
