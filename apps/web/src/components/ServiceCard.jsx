import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  BarChart3,
  Code2,
  Palette,
  Search,
  Smartphone,
  TrendingUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TiltCard } from '@/components/motion/Primitives.jsx';

const ICONS = { Code2, Smartphone, TrendingUp, Search, Palette, BarChart3 };

/**
 * ServiceCard — tilting, spotlit card used on the home page and services hub.
 */
const ServiceCard = ({ service, index = 0, className }) => {
  const Icon = ICONS[service.icon] ?? Code2;
  const accent = `hsl(var(--${service.accent}))`;

  return (
    <TiltCard className={cn('group h-full', className)} intensity={5}>
      <Link
        to={service.slug}
        className="card-lift relative flex h-full flex-col overflow-hidden p-7 md:p-8"
        aria-label={`${service.name} — ${service.tagline}`}
      >
        {/* Index watermark */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-6 top-5 font-mono text-[2.75rem] font-medium leading-none opacity-[0.07] transition-opacity duration-500 group-hover:opacity-[0.14]"
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Accent bloom */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-60"
          style={{ background: accent }}
        />

        <span
          className="relative mb-6 grid h-12 w-12 place-items-center rounded-2xl border border-border transition-transform duration-500 ease-swift group-hover:-translate-y-1 group-hover:scale-105"
          style={{ background: `hsl(var(--${service.accent}) / 0.13)` }}
        >
          <Icon className="h-[22px] w-[22px]" style={{ color: accent }} strokeWidth={1.7} />
        </span>

        <h3 className="relative mb-2.5 text-[1.3rem]">{service.name}</h3>

        <p className="relative mb-6 text-[0.9375rem] leading-relaxed text-muted-foreground">
          {service.description}
        </p>

        <span className="relative mt-auto inline-flex items-center gap-1.5 font-display text-[0.875rem] font-semibold text-brand">
          Explore service
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-swift group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>

        {/* Bottom sweep line */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-swift group-hover:scale-x-100"
          style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
        />
      </Link>
    </TiltCard>
  );
};

export default ServiceCard;
