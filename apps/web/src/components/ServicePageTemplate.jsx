import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, MapPin, Sparkles } from 'lucide-react';

import Seo, { breadcrumbSchema, faqSchema, organizationSchema, serviceSchema } from '@/components/Seo.jsx';
import SectionHeading from '@/components/SectionHeading.jsx';
import Breadcrumb from '@/components/Breadcrumb.jsx';
import ProcessTimeline from '@/components/ProcessTimeline.jsx';
import FaqAccordion from '@/components/FaqAccordion.jsx';
import InquiryForm from '@/components/InquiryForm.jsx';
import Button from '@/components/Button.jsx';
import Aurora from '@/components/motion/Aurora.jsx';
import ParticleField from '@/components/motion/ParticleField.jsx';
import { Counter, Reveal, SplitText, Stagger, StaggerItem } from '@/components/motion/Primitives.jsx';
import { CITIES, SERVICES } from '@/data/site.js';
import { getCities } from '@/data/localServicePages.js';

/**
 * ServicePageTemplate — the shared shell behind all six service pages.
 *
 * Every section is optional apart from the hero, so a page can be as light or
 * as deep as its subject deserves.
 */
const ServicePageTemplate = ({
  title,
  subtitle,
  description,
  path,
  accent = 'brand',
  serviceSlugForLocal,
  processSteps = [],
  benefits = [],
  deliverables = [],
  stats = [],
  faqs = [],
  ctaText = 'Start your project',
  localContent,
}) => {
  const related = SERVICES.filter((service) => service.slug !== path).slice(0, 3);
  const localCities = getCities().slice(0, 9);

  return (
    <>
      <Seo
        title={`${subtitle} in Switzerland`}
        path={path}
        description={`${description} Professional ${subtitle.toLowerCase()} for Swiss businesses in Zurich, Geneva, Basel, Bern, Lausanne and beyond.`}
        keywords={`${subtitle.toLowerCase()}, ${subtitle.toLowerCase()} Switzerland, ${subtitle.toLowerCase()} Zurich, ${subtitle.toLowerCase()} Geneva, Swiss digital agency`}
        schema={[
          organizationSchema(),
          serviceSchema({ name: subtitle, description, path }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: subtitle, path },
          ]),
          ...(faqs.length ? [faqSchema(faqs)] : []),
        ]}
      />

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden pb-20 pt-32">
        <div aria-hidden="true" className="absolute inset-0 bg-grid mask-fade-edges" />
        <Aurora variant={accent === 'brand' ? 'brand' : 'violet'} density={2} />
        <ParticleField className="opacity-60" />

        <div className="shell relative z-10">
          <Breadcrumb
            className="mb-10"
            items={[
              { name: 'Services', path: '/services' },
              { name: subtitle },
            ]}
          />

          <div className="max-w-4xl">
            <Reveal direction="none">
              <span className="pill">
                <MapPin className="h-3.5 w-3.5" style={{ color: `hsl(var(--${accent}))` }} />
                Available in all {CITIES.length} cities we serve
              </span>
            </Reveal>

            <h1 className="mt-7">
              <SplitText as="span" text={title} className="block" animateOnMount delay={0.1} />
              <SplitText
                as="span"
                text="for Swiss businesses"
                className="block"
                wordClassName="text-gradient-animated"
                animateOnMount
                delay={0.35}
              />
            </h1>

            <Reveal direction="up" delay={0.6}>
              <p className="text-muted-foreground mt-7 max-w-2xl text-[1.0625rem] leading-relaxed md:text-[1.1875rem]">
                {description}
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.72}>
              <p className="text-muted-foreground mt-4 max-w-2xl text-[0.9375rem]">
                Delivered in German, French, Italian and English — built to the standards this market
                expects.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.85}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href="#inquiry" size="lg" data-cursor="Start">
                  {ctaText}
                  <ArrowRight className="h-[18px] w-[18px]" />
                </Button>
                <Button to="/ai-analyzer" variant="secondary" size="lg">
                  <Sparkles className="h-[18px] w-[18px] text-brand-cyan" />
                  Analyze my business
                </Button>
              </div>
            </Reveal>
          </div>

          {stats.length > 0 && (
            <Stagger className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] border border-border bg-border lg:grid-cols-4">
              {stats.map((stat) => (
                <StaggerItem key={stat.label} className="bg-[hsl(var(--surface))] p-6 md:p-7">
                  <p className="font-display text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium leading-none tracking-[-0.03em]" style={{ color: `hsl(var(--${accent}))` }}>
                    {typeof stat.value === 'number' ? (
                      <Counter value={stat.value} decimals={stat.decimals ?? 0} suffix={stat.suffix ?? ''} />
                    ) : (
                      stat.value
                    )}
                  </p>
                  <p className="text-muted-foreground mt-2.5 text-[0.8125rem] leading-snug">{stat.label}</p>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </div>
      </section>

      {/* ================= BENEFITS ================= */}
      {benefits.length > 0 && (
        <section className="section border-y border-border bg-[hsl(var(--surface)/0.4)]">
          <div className="shell">
            <SectionHeading
              eyebrow="Why it matters"
              title="What you actually get."
              description="Outcomes we hold ourselves to, not features we list to fill a page."
            />

            <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit, index) => (
                <Reveal key={benefit.title} delay={index * 0.07} className="card-lift group p-7">
                  <span
                    className="mb-6 grid h-11 w-11 place-items-center rounded-2xl border border-border transition-transform duration-500 ease-swift group-hover:-translate-y-1"
                    style={{ background: `hsl(var(--${accent}) / 0.12)` }}
                  >
                    <benefit.icon
                      className="h-5 w-5"
                      style={{ color: `hsl(var(--${accent}))` }}
                      strokeWidth={1.7}
                    />
                  </span>
                  <h3 className="mb-2.5 text-[1.125rem]">{benefit.title}</h3>
                  <p className="text-muted-foreground text-[0.9375rem] leading-relaxed">{benefit.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= DELIVERABLES ================= */}
      {deliverables.length > 0 && (
        <section className="section">
          <div className="shell">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-32">
                  <SectionHeading
                    align="left"
                    eyebrow="Scope"
                    title="Everything included."
                    description="A typical engagement covers all of this. Anything you already have, we adapt to rather than rebuild."
                  >
                    <Button href="#inquiry" variant="secondary" size="sm">
                      Request a quote
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </SectionHeading>
                </div>
              </div>

              <div className="lg:col-span-7">
                <Stagger className="grid grid-cols-1 gap-2.5 sm:grid-cols-2" gap={0.05}>
                  {deliverables.map((item) => (
                    <StaggerItem
                      key={item}
                      className="flex items-start gap-3 rounded-xl border border-border bg-[hsl(var(--surface)/0.6)] px-5 py-4 text-[0.9375rem] transition-colors duration-300 hover:border-brand/40"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0"
                        style={{ color: `hsl(var(--${accent}))` }}
                      />
                      <span className="text-foreground">{item}</span>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= PROCESS ================= */}
      {processSteps.length > 0 && (
        <section className="section border-y border-border bg-[hsl(var(--surface)/0.4)]">
          <div className="shell">
            <SectionHeading
              eyebrow="Methodology"
              title="How the work runs."
              description="A transparent sequence with a deliverable at every stage — you always know where the project stands."
            />

            <div className="mt-14">
              <ProcessTimeline steps={processSteps} />
            </div>
          </div>
        </section>
      )}

      {/* ================= FAQ ================= */}
      {faqs.length > 0 && (
        <section className="section">
          <div className="shell">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-32">
                  <SectionHeading
                    align="left"
                    eyebrow="Questions"
                    title={`${subtitle}, answered.`}
                  >
                    <Button to="/faq" variant="secondary" size="sm">
                      All questions
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </SectionHeading>
                </div>
              </div>
              <div className="lg:col-span-8">
                <FaqAccordion items={faqs} idPrefix={`svc-${path.replace(/\//g, '')}`} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= LOCAL LINKS ================= */}
      {serviceSlugForLocal && (
        <section className="section border-t border-border bg-[hsl(var(--surface)/0.4)]">
          <div className="shell">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <SectionHeading
                  align="left"
                  eyebrow="Local"
                  title={`${subtitle} near you.`}
                  description={localContent}
                />
              </div>

              <div className="lg:col-span-7">
                <Stagger className="grid grid-cols-2 gap-2.5 sm:grid-cols-3" gap={0.04}>
                  {localCities.map((city) => (
                    <StaggerItem key={city.slug}>
                      <Link
                        to={`/${serviceSlugForLocal}-in-${city.slug}`}
                        className="group flex items-center justify-between gap-2 rounded-xl border border-border bg-[hsl(var(--surface))] px-4 py-3 text-[0.875rem] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/50"
                      >
                        <span className="truncate text-foreground">{city.name}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= INQUIRY ================= */}
      <InquiryForm
        endpoint="/service-inquiry"
        successMessage="Service inquiry sent. We will contact you shortly."
        extraPayload={{ serviceType: subtitle }}
        title={`Let's talk about your ${subtitle.toLowerCase()} project`}
        description="Send us the essentials and we will come back with an honest read on scope, timeline and budget."
      />

      {/* ================= RELATED SERVICES ================= */}
      <section className="section border-t border-border pt-16">
        <div className="shell">
          <p className="eyebrow mb-8">Related services</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {related.map((service) => (
              <Reveal key={service.slug}>
                <Link
                  to={service.slug}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-[hsl(var(--surface)/0.6)] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-brand/40"
                >
                  <h3 className="mb-2 text-[1.0625rem] transition-colors group-hover:text-brand">
                    {service.name}
                  </h3>
                  <p className="text-muted-foreground text-[0.875rem] leading-relaxed">{service.tagline}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 font-display text-[0.8125rem] font-semibold text-brand">
                    View
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicePageTemplate;
