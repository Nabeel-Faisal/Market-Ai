import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';

import Seo, { breadcrumbSchema, serviceSchema } from '@/components/Seo.jsx';
import SectionHeading from '@/components/SectionHeading.jsx';
import ServiceCard from '@/components/ServiceCard.jsx';
import Button from '@/components/Button.jsx';
import Aurora from '@/components/motion/Aurora.jsx';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Primitives.jsx';
import { APPROACH, CITIES, INDUSTRIES, SERVICES } from '@/data/site.js';

/** What each service typically includes — shown in the comparison table. */
const INCLUDES = {
  '/web-development': ['Discovery & UX', 'Design system', 'Front & back end', 'CMS + training', 'Core Web Vitals'],
  '/app-development': ['Product strategy', 'iOS & Android', 'API layer', 'Store submission', 'Crash monitoring'],
  '/digital-marketing': ['Channel strategy', 'Paid & organic', 'Creative production', 'Attribution setup', 'Monthly reporting'],
  '/seo-agency': ['Technical audit', 'Multilingual hreflang', 'Content architecture', 'Digital PR', 'Rank tracking'],
  '/brand-development': ['Positioning', 'Identity system', 'Voice & messaging', 'Brand guidelines', 'Asset library'],
  '/business-intelligence': ['Data audit', 'Pipeline & warehouse', 'Custom dashboards', 'KPI framework', 'Team enablement'],
};

const ENGAGEMENTS = [
  {
    name: 'Project',
    price: 'Fixed scope',
    description: 'A defined build with a start, a finish and a fixed price agreed up front.',
    points: ['Website, app or dashboard builds', 'Milestone-based payments', 'Full handover and code ownership'],
    best: 'Best for a specific thing you need shipped',
  },
  {
    name: 'Retainer',
    price: 'Monthly',
    description: 'An ongoing share of our capacity for growth work that compounds over time.',
    points: ['SEO, marketing and CRO', 'Rolling priorities you set', 'Live dashboard, monthly review'],
    best: 'Best for growth that needs constant hands',
    featured: true,
  },
  {
    name: 'Audit',
    price: 'One-off',
    description: 'An outside read on what is broken, what it costs you and what to do about it.',
    points: ['Technical, brand or campaign scope', 'Prioritised findings, not a 90-page PDF', 'Fee credited if you continue with us'],
    best: 'Best when you need clarity before committing',
  },
];

const ServicesPage = () => (
  <>
    <Seo
      title="Services"
      path="/services"
      description="Web development, app development, digital marketing, SEO, brand development and business intelligence for Swiss companies. Compare what each service includes and how engagements work."
      keywords="digital agency services Switzerland, web development, app development, SEO agency, digital marketing, business intelligence Zurich Geneva"
      schema={[
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ]),
        ...SERVICES.map((service) =>
          serviceSchema({ name: service.name, description: service.description, path: service.slug })
        ),
      ]}
    />

    {/* ---------- Hero ---------- */}
    <section className="relative overflow-hidden pb-16 pt-40">
      <div aria-hidden="true" className="absolute inset-0 bg-grid mask-fade-edges" />
      <Aurora density={2} />

      <div className="shell relative z-10">
        <SectionHeading
          eyebrow="Services"
          title="Everything you need"
          highlight="to grow, in one place."
          description="Six services that work standalone or together. Most clients start with one and add the next once the first is paying for itself."
          as="h1"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button to="/contact" size="lg">
              Discuss your project
              <ArrowRight className="h-[18px] w-[18px]" />
            </Button>
            <Button to="/ai-analyzer" variant="secondary" size="lg">
              Not sure? Run the analyzer
            </Button>
          </div>
        </SectionHeading>
      </div>
    </section>

    {/* ---------- Service grid ---------- */}
    <section className="section pt-8">
      <div className="shell">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <Reveal key={service.slug} delay={(index % 3) * 0.07} className="h-full">
              <ServiceCard service={service} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* ---------- What's included ---------- */}
    <section className="section border-y border-border bg-[hsl(var(--surface)/0.4)]">
      <div className="shell">
        <SectionHeading
          eyebrow="Scope"
          title="What each engagement includes."
          description="A typical scope by service. Everything is adjusted to your situation after discovery — this is the starting shape, not a menu you have to order from."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <Reveal
              key={service.slug}
              delay={(index % 3) * 0.06}
              className="rounded-2xl border border-border bg-[hsl(var(--surface))] p-7"
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <h3 className="text-[1.15rem]">{service.name}</h3>
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: `hsl(var(--${service.accent}))` }}
                  aria-hidden="true"
                />
              </div>

              <ul className="space-y-2.5">
                {(INCLUDES[service.slug] ?? []).map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] text-muted-foreground">
                    <Check
                      className="mt-1 h-3.5 w-3.5 shrink-0"
                      style={{ color: `hsl(var(--${service.accent}))` }}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                to={service.slug}
                className="link-underline mt-6 inline-flex items-center gap-1.5 font-display text-[0.875rem] font-semibold text-brand"
              >
                Full details
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* ---------- Engagement models ---------- */}
    <section className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="How we engage"
          title="Three ways to work"
          highlight="with us."
          description="No packages, no tiers you have to squeeze into. Pick the shape that matches the problem."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {ENGAGEMENTS.map((model, index) => (
            <Reveal
              key={model.name}
              delay={index * 0.08}
              className={`relative flex flex-col rounded-[1.5rem] border p-8 transition-all duration-500 ${
                model.featured
                  ? 'border-brand/50 bg-[hsl(var(--surface))] shadow-[0_30px_70px_-40px_hsl(var(--brand)/0.7)]'
                  : 'border-border bg-[hsl(var(--surface)/0.6)]'
              }`}
            >
              {model.featured && (
                <span className="absolute -top-3 left-8 rounded-full bg-brand px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white">
                  Most common
                </span>
              )}

              <p className="eyebrow mb-3">{model.price}</p>
              <h3 className="mb-3 text-[1.5rem]">{model.name}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{model.description}</p>

              <ul className="mb-8 space-y-2.5">
                {model.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-[0.9375rem] text-muted-foreground">
                    <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-brand-cyan" />
                    {point}
                  </li>
                ))}
              </ul>

              <p className="text-muted-foreground mt-auto border-t border-border pt-5 text-[0.8125rem] italic">
                {model.best}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <p className="text-muted-foreground text-[0.9375rem]">
            Every quote is itemised after discovery — third-party costs like ad spend and licences are
            always listed separately from our fee.
          </p>
        </Reveal>
      </div>
    </section>

    {/* ---------- Process recap ---------- */}
    <section className="section border-t border-border bg-[hsl(var(--surface)/0.4)]">
      <div className="shell">
        <SectionHeading eyebrow="Process" title="The same four phases, every time." />

        <Stagger className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-[1.5rem] border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {APPROACH.map((step) => (
            <StaggerItem key={step.id} className="bg-[hsl(var(--surface))] p-8">
              <span className="font-mono text-[0.75rem] tracking-[0.18em] text-brand">{step.id}</span>
              <h3 className="mb-3 mt-4 text-[1.2rem]">{step.title}</h3>
              <p className="text-muted-foreground text-[0.9375rem] leading-relaxed">{step.description}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>

    {/* ---------- Coverage ---------- */}
    <section className="section">
      <div className="shell">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-2">
          <SectionHeading
            align="left"
            eyebrow="Reach"
            title="Delivered across Switzerland."
            description={`Every service on this page is available in all ${CITIES.length} cities we cover, in German, French, Italian and English.`}
          />

          <div>
            <p className="eyebrow mb-4">Sectors we know well</p>
            <ul className="flex flex-wrap gap-2">
              {INDUSTRIES.map((industry) => (
                <li
                  key={industry}
                  className="rounded-full border border-border px-3.5 py-1.5 text-[0.8125rem] text-muted-foreground"
                >
                  {industry}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default ServicesPage;
