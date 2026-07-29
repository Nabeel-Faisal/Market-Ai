import React from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Counter } from '@/components/motion/Primitives.jsx';

/**
 * KPICard — headline metric tile for the BI dashboard demo.
 */
const KPICard = ({
  label,
  value,
  change,
  icon: Icon,
  trend = 'up',
  prefix = '',
  suffix = '',
  decimals = 0,
  accent = 'brand',
}) => (
  <div className="card-lift group p-6">
    <div className="mb-6 flex items-start justify-between gap-3">
      <span
        className="grid h-11 w-11 place-items-center rounded-2xl border border-border transition-transform duration-500 ease-swift group-hover:-translate-y-1"
        style={{ background: `hsl(var(--${accent}) / 0.12)` }}
      >
        <Icon className="h-5 w-5" style={{ color: `hsl(var(--${accent}))` }} strokeWidth={1.7} />
      </span>

      <span
        className={cn(
          'inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-mono text-[11px]',
          trend === 'up'
            ? 'bg-[hsl(var(--success)/0.12)] text-[hsl(var(--success))]'
            : 'bg-destructive/12 text-destructive'
        )}
      >
        {trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
        {change}
      </span>
    </div>

    <p className="eyebrow mb-2">{label}</p>
    <p className="flex items-baseline gap-1.5 font-display text-[clamp(1.6rem,3vw,2.25rem)] font-medium leading-none tracking-[-0.03em]">
      {prefix && <span className="text-muted-foreground text-[0.9375rem] font-medium">{prefix}</span>}
      <Counter value={value} decimals={decimals} suffix={suffix} />
    </p>
  </div>
);

export default KPICard;
