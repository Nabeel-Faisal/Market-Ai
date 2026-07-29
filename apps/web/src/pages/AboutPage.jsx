import React from 'react';
import { ArrowRight, Globe2, Handshake, Layers, Lock, Rocket, Users } from 'lucide-react';

import Seo, { breadcrumbSchema, organizationSchema } from '@/components/Seo.jsx';
import SectionHeading from '@/components/SectionHeading.jsx';
import Button from '@/components/Button.jsx';
import Aurora from '@/components/motion/Aurora.jsx';
import ParticleField from '@/components/motion/ParticleField.jsx';
import { Counter, Reveal, Stagger, StaggerItem } from '@/components/motion/Primitives.jsx';
import { APPROACH, CITIES, PILLARS, SITE, STATS } from '@/data/site.js';

const VALUES = [
  {
    icon: Handshake,
    title: 'Say the inconvenient thing',
    description:
      'If a feature will not earn its cost, we say so before you pay for it. Short-term awkwardness beats long-term regret.',
  },
  {
    icon: Layers,
    title: 'Build it to last',
    description:
      'No throwaway code, no rented templates. What we ship should still be serving you in three years without a rewrite.',
  },
  {
    icon: Lock,
    title: 'Privacy is not a feature',
    description:
      'GDPR and the revised Swiss FADP shape the architecture from day one, not a checklist bolted on before launch.',
  },
  {
    icon: Rocket,
    title: 'Ship, then sharpen',
    description:
      'Working software beats perfect plans. We get something real in front of users early and improve it with evidence.',
  },
  {
    icon: Globe2,
    title: 'Speak the local language',
    description:
      'German, French, Italian and English — written by people who understand the cultural difference, not translation software.',
  },
  {
    icon: Users,
    title: 'One team, no handoffs',
    description:
      'Strategists, designers and engineers sit together. Nothing gets lost in a handover between three separate vendors.',
  },
];

const TIMELINE = [
  {
    year: '2021',
    title: 'Founded in Geneva',
    description:
      'Started as a two-person studio building websites for local businesses that were being badly served by international agencies.',
  },
  {
    year: '2022',
    title: 'Expanded into growth',
    description:
      'Clients kept asking who would fill the funnel we had just built. SEO and paid media became part of the offer.',
  },
  {
    year: '2023',
    title: 'AI moved from demo to default',
    description:
      'We began integrating language and prediction models where they measurably cut cost or surfaced insight — and refusing to where they did not.',
  },
  {
    year: '2024',
    title: 'Business intelligence practice',
    description:
      'Reporting became the most requested add-on, so we built a dedicated data team and a dashboard product to go with it.',
  },
  {
    year: 'Today',
    title: 'National coverage',
    description: `A distributed Swiss team serving clients in ${CITIES.length} cities across all language regions.`,
  },
];

const AboutPage = () => (
  <>
    <Seo
      title="About"
      path="/about"
      description="Market Ai is a Swiss digital agency combining strategy, design, engineering and growth in one team. Founded in Geneva, serving clients across Switzerland in four languages."
      keywords="about Market Ai, Swiss digital agency, Geneva agency, AI agency Switzerland, digital transformation team"
      schema={[
        organizationSchema(),
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ]),
      ]}
    />

    {/* ---------- Hero ---------- */}
    <section className="relative overflow-hidden pb-20 pt-40">
      <div aria-hidden="true" className="absolute inset-0 bg-grid mask-fade-edges" />
      <Aurora density={3} />
      <ParticleField className="opacity-70" />

      <div className="shell relative z-10">
        <SectionHeading
          eyebrow={`Est. ${SITE.founded} · ${SITE.address.city}`}
          title="We are the team Swiss companies call"
          highlight="when the last agency didn't work out."
          description="Market Ai exists because too many good Swiss businesses were paying international agencies for generic work that ignored how this market actually behaves. We do the opposite."
          as="h1"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button to="/contact" size="lg">
              Work with us
              <ArrowRight className="h-[18px] w-[18px]" />
            </Button>
            <Button to="/services" variant="secondary" size="lg">
              See what we do
            </Button>
          </div>
        </SectionHeading>
      </div>
    </section>

    {/* ---------- Stats ---------- */}
    <section className="pb-8">
      <div className="shell">
        <Stagger className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.75rem] border border-border bg-border lg:grid-cols-4">
          {STATS.map((stat) => (
            <StaggerItem key={stat.label} className="bg-[hsl(var(--surface))] p-7 md:p-9">
              <p className="text-gradient-blue-cyan font-display text-[clamp(2rem,4vw,3rem)] font-medium leading-none tracking-[-0.03em]">
                <Counter value={stat.value} decimals={stat.decimals ?? 0} suffix={stat.suffix} />
              </p>
              <p className="mt-3 font-display text-[0.9375rem] font-semibold">{stat.label}</p>
              <p className="text-muted-foreground mt-1 text-[0.8125rem]">{stat.detail}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>

    {/* ---------- Story ---------- */}
    <section className="section">
      <div className="shell">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                align="left"
                eyebrow="Our story"
                title="Built the slow way, on purpose."
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <ol className="space-y-3">
              {TIMELINE.map((entry, index) => (
                <Reveal
                  as="li"
                  key={entry.year}
                  delay={index * 0.07}
                  direction="left"
                  className="group flex gap-6 rounded-2xl border border-transparent p-5 transition-colors duration-500 hover:border-border hover:bg-[hsl(var(--surface)/0.7)]"
                >
                  <span className="w-16 shrink-0 pt-1 font-mono text-[0.8125rem] tracking-[0.1em] text-brand">
                    {entry.year}
                  </span>
                  <div className="border-l border-border pl-6 transition-colors duration-500 group-hover:border-brand/50">
                    <h3 className="mb-2 text-[1.15rem]">{entry.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{entry.description}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>

    {/* ---------- Values ---------- */}
    <section className="section border-y border-border bg-[hsl(var(--surface)/0.4)]">
      <div className="shell">
        <SectionHeading
          eyebrow="What we believe"
          title="Six rules we"
          highlight="actually hold to."
          description="Not wall art. These are the arguments we are willing to have with clients, and with each other."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((value, index) => (
            <Reveal key={value.title} delay={(index % 3) * 0.07} className="card-lift group p-8">
              <span className="mb-6 grid h-11 w-11 place-items-center rounded-2xl border border-border bg-brand/10 transition-transform duration-500 ease-swift group-hover:-translate-y-1">
                <value.icon className="h-5 w-5 text-brand" strokeWidth={1.7} />
              </span>
              <h3 className="mb-3 text-[1.15rem]">{value.title}</h3>
              <p className="text-muted-foreground text-[0.9375rem] leading-relaxed">{value.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* ---------- Method ---------- */}
    <section className="section">
      <div className="shell">
        <SectionHeading eyebrow="Method" title="How an engagement runs." />

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

    {/* ---------- Differentiators ---------- */}
    <section className="section border-t border-border">
      <div className="shell">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading align="left" eyebrow="The difference" title="Why clients stay." />
          </div>

          <div className="lg:col-span-8 space-y-3">
            {PILLARS.map((pillar, index) => (
              <Reveal
                key={pillar.title}
                delay={index * 0.06}
                className="rounded-2xl border border-border bg-[hsl(var(--surface)/0.6)] p-7 transition-colors duration-500 hover:border-brand/40"
              >
                <h3 className="mb-2.5 text-[1.15rem]">{pillar.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  </>
);

export default AboutPage;
