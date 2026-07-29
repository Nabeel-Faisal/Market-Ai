import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Calendar as CalendarIcon,
  Download,
  Lightbulb,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { format } from 'date-fns';

import Seo, { breadcrumbSchema } from '@/components/Seo.jsx';
import Breadcrumb from '@/components/Breadcrumb.jsx';
import KPICard from '@/components/KPICard.jsx';
import Button from '@/components/Button.jsx';
import Aurora from '@/components/motion/Aurora.jsx';
import { Reveal } from '@/components/motion/Primitives.jsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

const revenueData = [
  { name: 'Jan', total: 45000 },
  { name: 'Feb', total: 52000 },
  { name: 'Mar', total: 48000 },
  { name: 'Apr', total: 61000 },
  { name: 'May', total: 59000 },
  { name: 'Jun', total: 75000 },
  { name: 'Jul', total: 82000 },
];

const acquisitionData = [
  { name: 'Organic', users: 4000 },
  { name: 'Social', users: 3000 },
  { name: 'Direct', users: 2000 },
  { name: 'Paid', users: 2780 },
];

const funnelData = [
  { name: 'Visits', value: 12000 },
  { name: 'Signups', value: 3500 },
  { name: 'Active', value: 2000 },
  { name: 'Paid', value: 800 },
];

const regions = [
  { city: 'Zurich', value: 42, accent: 'brand' },
  { city: 'Geneva', value: 28, accent: 'brand-violet' },
  { city: 'Lausanne', value: 15, accent: 'brand-cyan' },
  { city: 'Bern', value: 10, accent: 'brand-pink' },
  { city: 'Basel', value: 5, accent: 'brand-lime' },
];

const insights = [
  {
    icon: TrendingUp,
    accent: 'brand',
    title: 'Forecasting',
    body: 'Projected to hit CHF 95k in August based on current Q3 acceleration trends.',
  },
  {
    icon: Lightbulb,
    accent: 'brand-violet',
    title: 'Optimisation',
    body: 'Increasing paid social spend by 15% could yield a 22% bump in marketing-qualified leads.',
  },
  {
    icon: AlertTriangle,
    accent: 'brand-amber',
    title: 'Anomaly alert',
    body: 'Checkout drop-off spiked 4% on mobile devices over the last 48 hours.',
  },
];

/** Chart tooltip styled with the site's own surface tokens. */
const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const point = payload[0];
  const isCurrency = point.dataKey === 'total';

  return (
    <div className="rounded-xl border border-border bg-[hsl(var(--surface))] px-4 py-3 shadow-lifted">
      <p className="text-muted-foreground mb-1 font-mono text-[11px] uppercase tracking-[0.1em]">{label}</p>
      <p className="text-gradient-blue-cyan font-display text-[1.15rem] font-semibold">
        {isCurrency ? 'CHF ' : ''}
        {Number(point.value).toLocaleString('en-CH')}
      </p>
    </div>
  );
};

const axisProps = {
  tickLine: false,
  axisLine: false,
  tick: { fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontFamily: 'JetBrains Mono, monospace' },
};

const BIDashboardPage = () => {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <Seo
        title="BI Dashboard Demo"
        path="/bi-dashboard"
        description="A live demonstration of the business intelligence dashboards Market Ai builds for Swiss companies — revenue, acquisition, funnel and regional performance in one view."
        keywords="business intelligence dashboard Switzerland, analytics dashboard demo, BI reporting Zurich"
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'BI Dashboard', path: '/bi-dashboard' },
        ])}
      />

      <section className="relative overflow-hidden pb-10 pt-32">
        <div aria-hidden="true" className="absolute inset-0 bg-grid mask-fade-edges" />
        <Aurora variant="violet" density={2} />

        <div className="shell relative z-10">
          <Breadcrumb className="mb-10" items={[{ name: 'BI Dashboard' }]} />

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Reveal direction="right">
              <span className="pill mb-5">
                <Sparkles className="h-3.5 w-3.5 text-brand-violet" />
                Live demo
              </span>
              <h1 className="text-[clamp(2.25rem,4.6vw,3.5rem)]">
                Intelligence <span className="text-gradient-purple-magenta">Hub</span>
              </h1>
              <p className="text-muted-foreground mt-4 max-w-xl leading-relaxed">
                This is the kind of dashboard we build for clients — every number live, one agreed
                definition, no monthly spreadsheet ritual.
              </p>
            </Reveal>

            <Reveal direction="left" className="flex flex-wrap items-center gap-3">
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="btn-ghost btn-sm gap-2"
                    aria-label="Select reporting date"
                  >
                    <CalendarIcon className="h-4 w-4 text-brand-cyan" />
                    {date ? format(date, 'PPP') : 'Pick a date'}
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  align="end"
                  className="w-auto rounded-2xl border-border bg-[hsl(var(--surface))] p-0"
                >
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>

              <Button variant="secondary" size="sm" magnetic={false}>
                <Download className="h-4 w-4" />
                Export
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="shell space-y-5">
          {/* KPIs */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Revenue', value: 422000, prefix: 'CHF ', change: '+14.5%', icon: Wallet, accent: 'brand' },
              { label: 'Growth rate', value: 24.8, decimals: 1, suffix: '%', change: '+2.1%', icon: TrendingUp, accent: 'brand-cyan' },
              { label: 'Active users', value: 12450, change: '+8.2%', icon: Users, accent: 'brand-violet' },
              { label: 'Conversion', value: 3.2, decimals: 1, suffix: '%', change: '-0.4%', icon: Activity, trend: 'down', accent: 'brand-pink' },
            ].map((kpi, index) => (
              <Reveal key={kpi.label} delay={index * 0.06}>
                <KPICard {...kpi} />
              </Reveal>
            ))}
          </div>

          {/* Revenue + insights */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <Reveal className="rounded-[1.5rem] border border-border bg-[hsl(var(--surface)/0.7)] p-6 backdrop-blur-xl md:p-8 lg:col-span-2">
              <h2 className="mb-7 text-[1.2rem]">Revenue trajectory</h2>
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData} margin={{ top: 10, right: 8, left: -18, bottom: 0 }}>
                    <defs>
                      <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--brand-cyan))" stopOpacity={0.45} />
                        <stop offset="100%" stopColor="hsl(var(--brand))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="name" {...axisProps} />
                    <YAxis {...axisProps} tickFormatter={(value) => `${value / 1000}k`} />
                    <Tooltip content={<ChartTooltip />} cursor={{ stroke: 'hsl(var(--border))' }} />
                    <Area
                      type="monotone"
                      dataKey="total"
                      stroke="hsl(var(--brand-cyan))"
                      strokeWidth={3}
                      fill="url(#revenueFill)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Reveal>

            <Reveal
              delay={0.08}
              className="rounded-[1.5rem] border border-border bg-[hsl(var(--surface)/0.7)] p-6 backdrop-blur-xl md:p-8"
            >
              <h2 className="mb-7 flex items-center gap-2.5 text-[1.2rem]">
                <Sparkles className="h-5 w-5 text-brand-violet" strokeWidth={1.8} />
                AI intelligence
              </h2>

              <div className="space-y-3">
                {insights.map((insight) => (
                  <div
                    key={insight.title}
                    className="rounded-2xl border border-border p-5 transition-colors duration-500 hover:border-brand/40"
                    style={{ background: `hsl(var(--${insight.accent}) / 0.06)` }}
                  >
                    <div className="flex items-start gap-3.5">
                      <insight.icon
                        className="mt-0.5 h-5 w-5 shrink-0"
                        style={{ color: `hsl(var(--${insight.accent}))` }}
                        strokeWidth={1.8}
                      />
                      <div>
                        <h3 className="mb-1.5 text-[0.9375rem]">{insight.title}</h3>
                        <p className="text-muted-foreground text-[0.875rem] leading-relaxed">{insight.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Secondary charts */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            <Reveal className="rounded-[1.5rem] border border-border bg-[hsl(var(--surface)/0.7)] p-6 backdrop-blur-xl md:p-7">
              <h2 className="mb-6 text-[1.0625rem]">Acquisition channels</h2>
              <div className="h-[230px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={acquisitionData} margin={{ top: 0, right: 0, left: -22, bottom: 0 }}>
                    <defs>
                      <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--brand-cyan))" />
                        <stop offset="100%" stopColor="hsl(var(--brand))" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="name" {...axisProps} />
                    <YAxis {...axisProps} />
                    <Tooltip cursor={{ fill: 'hsl(var(--muted) / 0.5)' }} content={<ChartTooltip />} />
                    <Bar dataKey="users" fill="url(#barFill)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Reveal>

            <Reveal
              delay={0.07}
              className="rounded-[1.5rem] border border-border bg-[hsl(var(--surface)/0.7)] p-6 backdrop-blur-xl md:p-7"
            >
              <h2 className="mb-6 text-[1.0625rem]">Conversion funnel</h2>
              <div className="h-[230px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={funnelData} margin={{ top: 5, right: 8, left: -18, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="name" {...axisProps} />
                    <YAxis {...axisProps} />
                    <Tooltip content={<ChartTooltip />} />
                    <Line
                      type="stepAfter"
                      dataKey="value"
                      stroke="hsl(var(--brand-violet))"
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--brand-violet))', r: 4, strokeWidth: 2, stroke: 'hsl(var(--surface))' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Reveal>

            <Reveal
              delay={0.14}
              className="flex flex-col rounded-[1.5rem] border border-border bg-[hsl(var(--surface)/0.7)] p-6 backdrop-blur-xl md:p-7"
            >
              <h2 className="mb-7 text-[1.0625rem]">Regional split (CH)</h2>
              <div className="flex flex-1 flex-col justify-center gap-5">
                {regions.map((region, index) => (
                  <div key={region.city} className="flex items-center gap-4">
                    <span className="w-[4.5rem] shrink-0 text-[0.8125rem] text-muted-foreground">{region.city}</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-[hsl(var(--muted))]">
                      <motion.span
                        className="block h-full rounded-full"
                        style={{ background: `hsl(var(--${region.accent}))` }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${region.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                    <span className="w-9 shrink-0 text-right font-mono text-[0.8125rem]">
                      {region.value}%
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* CTA */}
          <Reveal className="mt-6 flex flex-col items-center justify-between gap-6 rounded-[1.75rem] border border-border bg-[hsl(var(--surface)/0.6)] p-8 md:flex-row md:p-11">
            <div>
              <h2 className="text-[1.4rem]">Want this for your own numbers?</h2>
              <p className="text-muted-foreground mt-2.5 max-w-lg leading-relaxed">
                We build these on top of whatever systems you already run — CRM, ERP, ad platforms or
                a decade of spreadsheets.
              </p>
            </div>
            <Button to="/business-intelligence" size="lg">
              Explore BI services
              <ArrowRight className="h-[18px] w-[18px]" />
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default BIDashboardPage;
