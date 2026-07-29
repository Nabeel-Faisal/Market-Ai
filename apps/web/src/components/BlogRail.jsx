import React from 'react';
import { cn } from '@/lib/utils';
import { Marquee } from '@/components/motion/Primitives.jsx';
import BlogCard from '@/components/BlogCard.jsx';

const EdgeFade = ({ side }) => {
  const direction = side === 'left' ? 'right' : 'left';

  return (
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-y-0 z-10 w-16 backdrop-blur-[3px] md:w-32',
        side === 'left' ? 'left-0' : 'right-0',
      )}
      style={{
        background: `linear-gradient(to ${direction}, hsl(var(--background)), hsl(var(--background) / 0.55) 45%, transparent)`,
        maskImage: `linear-gradient(to ${direction}, #000 38%, transparent)`,
        WebkitMaskImage: `linear-gradient(to ${direction}, #000 38%, transparent)`,
      }}
    />
  );
};

/**
 * BlogRail — the latest articles as a slow full-bleed rail instead of a static
 * three-up grid. Stops on hover so the cards stay clickable, and falls back to
 * a swipeable row when the visitor prefers reduced motion.
 */
const BlogRail = ({ posts, speed = 64, className }) => (
  <div className={cn('relative overflow-hidden', className)}>
    <Marquee speed={speed} className="py-2">
      {posts.map((post) => (
        <span key={post.id} className="block w-[20rem] shrink-0 md:w-[22rem]">
          <BlogCard post={post} />
        </span>
      ))}
    </Marquee>

    <EdgeFade side="left" />
    <EdgeFade side="right" />
  </div>
);

export default BlogRail;
