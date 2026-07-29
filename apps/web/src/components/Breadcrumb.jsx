import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Breadcrumb — visible trail. The matching BreadcrumbList structured data is
 * emitted by the page's <Seo> block via breadcrumbSchema().
 */
const Breadcrumb = ({ items = [], className }) => (
  <nav aria-label="Breadcrumb" className={cn('hide-scrollbar overflow-x-auto', className)}>
    <ol className="flex items-center gap-2 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
      <li>
        <Link to="/" className="inline-flex items-center gap-1.5 transition-colors hover:text-brand">
          <Home className="h-3.5 w-3.5" />
          Home
        </Link>
      </li>

      {items.map((item, index) => {
        const last = index === items.length - 1;
        return (
          <li key={item.path ?? item.name} className="flex items-center gap-2">
            <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" aria-hidden="true" />
            {last || !item.path ? (
              <span className="text-foreground" aria-current={last ? 'page' : undefined}>
                {item.name}
              </span>
            ) : (
              <Link to={item.path} className="transition-colors hover:text-brand">
                {item.name}
              </Link>
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);

export default Breadcrumb;
