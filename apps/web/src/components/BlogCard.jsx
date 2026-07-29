import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * BlogCard — article teaser used on the blog index, the home page and the
 * related-posts rail.
 */
const BlogCard = ({ post, featured = false, className }) => {
  const date = new Date(post.date);
  const formatted = date.toLocaleDateString('en-CH', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <article
      className={cn(
        'card-lift group flex h-full flex-col overflow-hidden',
        featured && 'md:flex-row',
        className
      )}
    >
      <Link
        to={`/blog/${post.slug}`}
        className={cn(
          'relative block shrink-0 overflow-hidden',
          featured ? 'md:w-1/2' : 'aspect-[16/10]'
        )}
        tabIndex={-1}
        aria-hidden="true"
      >
        <img
          src={post.featuredImage}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-swift group-hover:scale-[1.06]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background)/0.8)] via-transparent to-transparent opacity-70"
        />
        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/45 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white backdrop-blur-md">
          {post.category}
        </span>
      </Link>

      <div className={cn('flex flex-1 flex-col p-6', featured && 'md:justify-center md:p-9')}>
        <div className="text-muted-foreground mb-3.5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.1em]">
          <time dateTime={post.date}>{formatted}</time>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readingTime} min
          </span>
        </div>

        <h3
          className={cn(
            'mb-3 leading-snug transition-colors duration-300 group-hover:text-brand',
            featured ? 'text-[1.5rem] md:text-[1.85rem]' : 'text-[1.125rem]'
          )}
        >
          <Link to={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>

        <p
          className={cn(
            'text-muted-foreground text-[0.9375rem] leading-relaxed',
            featured ? 'line-clamp-4' : 'line-clamp-3'
          )}
        >
          {post.excerpt}
        </p>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-5">
          <div className="flex min-w-0 items-center gap-2.5">
            <img
              src={post.author.avatar}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-8 w-8 shrink-0 rounded-full object-cover"
            />
            <span className="truncate text-[0.8125rem] text-muted-foreground">{post.author.name}</span>
          </div>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-brand transition-transform duration-300 ease-swift group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
