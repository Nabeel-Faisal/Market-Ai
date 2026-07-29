import React from 'react';
import { cn } from '@/lib/utils';

const Bar = ({ className }) => (
  <div className={cn('shimmer rounded-lg bg-[hsl(var(--muted))]', className)} />
);

/** Full-viewport fallback used while a lazy route loads. */
export const PageFallback = () => (
  <div className="shell flex min-h-[70vh] flex-col justify-center pt-32">
    <div className="mx-auto w-full max-w-3xl space-y-5">
      <Bar className="h-3.5 w-40" />
      <Bar className="h-14 w-full" />
      <Bar className="h-14 w-4/5" />
      <Bar className="h-5 w-2/3" />
      <div className="grid grid-cols-1 gap-4 pt-8 sm:grid-cols-3">
        <Bar className="h-32" />
        <Bar className="h-32" />
        <Bar className="h-32" />
      </div>
    </div>
    <span className="sr-only" role="status">
      Loading page
    </span>
  </div>
);

/** Article placeholder for the blog detail route. */
export const BlogPostSkeleton = () => (
  <div className="shell pb-24 pt-32">
    <div className="mx-auto max-w-3xl space-y-6">
      <Bar className="h-3.5 w-32" />
      <Bar className="h-12 w-full" />
      <Bar className="h-12 w-3/4" />
      <div className="flex items-center gap-4 pt-2">
        <Bar className="h-11 w-11 rounded-full" />
        <div className="space-y-2">
          <Bar className="h-3.5 w-32" />
          <Bar className="h-3 w-24" />
        </div>
      </div>
      <Bar className="h-[22rem] w-full rounded-3xl" />
      <div className="space-y-3 pt-4">
        {Array.from({ length: 7 }).map((_, index) => (
          <Bar key={index} className={cn('h-4', index % 3 === 2 ? 'w-2/3' : 'w-full')} />
        ))}
      </div>
    </div>
    <span className="sr-only" role="status">
      Loading article
    </span>
  </div>
);

/** Grid placeholder for the blog listing. */
export const BlogCardSkeleton = () => (
  <div className="space-y-4 rounded-2xl border border-border p-4">
    <Bar className="aspect-[16/10] w-full rounded-xl" />
    <Bar className="h-3 w-24" />
    <Bar className="h-5 w-full" />
    <Bar className="h-5 w-2/3" />
  </div>
);

export default PageFallback;
