import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, MapPin, Quote } from 'lucide-react';

import Seo, { breadcrumbSchema, faqSchema, organizationSchema } from '@/components/Seo.jsx';
import SectionHeading from '@/components/SectionHeading.jsx';
import Breadcrumb from '@/components/Breadcrumb.jsx';
import FaqAccordion from '@/components/FaqAccordion.jsx';
import InquiryForm from '@/components/InquiryForm.jsx';
import Button from '@/components/Button.jsx';
import Aurora from '@/components/motion/Aurora.jsx';
import { Reveal, SplitText, Stagger, StaggerItem } from '@/components/motion/Primitives.jsx';
import { SITE } from '@/data/site.js';

/**
 * LocalServiceLandingTemplate — the "<service> in <city>" landing page.
 *
 * These pages carry most of the site's local search weight, so the structured
 * data, breadcrumbs and internal links matter as much as the layout.
 */
const LocalServiceLandingTemplate = ({ pageData, relatedPages = [] }) => {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${pageData.serviceName} in ${pageData.cityName}`,
    description: pageData.metaDescription,
    url: `${SITE.url}/${pageData.pageSlug}`,
    serviceType: pageData.serviceName,
    provider: { '@id': `${SITE.url}/#organization` },
    areaServed: {
      '@type': 'City',
      name: pageData.cityName,
      containedInPlace: { '@type': 'Country', name: 'Switzerland' },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${pageData.serviceName} deliverables`,
      itemListElement: (pageData.serviceDetails?.deliverables ?? []).map((item) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: item },
      })),
    },
  };

  return (
    <>
      <Seo
        title={`${pageData.serviceName} in ${pageData.cityName}`}
        path={`/${pageData.pageSlug}`}
        description={pageData.metaDescription}
        keywords={pageData.localKeywords?.join(', ')}
        schema={[
          organizationSchema(),
          localBusinessSchema,
          faqSchema(pageData.faqs ?? []),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: pageData.serviceName, path: `/${pageData.serviceSlug}` },
            { name: pageData.cityName, path: `/${pageData.pageSlug}` },
          ]),
        ]}
      />

      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden pb-16 pt-32">
        <div aria-hidden="true" className="absolute inset-0 bg-grid mask-fade-edges" />
        <Aurora density={2} />

        <div className="shell relative z-10">
          <Breadcrumb
            className="mb-10"
            items={[
              { name: 'Services', path: '/services' },
              { name: pageData.serviceName, path: `/${pageData.serviceSlug}` },
              { name: pageData.cityName },
            ]}
          />

          <div className="mx-auto max-w-3xl text-center">
            <Reveal direction="none">
              <span className="pill">
                <MapPin className="h-3.5 w-3.5 text-brand-cyan" />
                Serving {pageData.cityName}, Switzerland
              </span>
            </Reveal>

            <h1 className="mt-7">
              <SplitText as="span" text={pageData.serviceName} className="block" animateOnMount />
              <SplitText
                as="span"
                text={`in ${pageData.cityName}`}
                className="block"
                wordClassName="text-gradient-animated"
                animateOnMount
                delay={0.28}
              />
            </h1>

            <Reveal delay={0.55}>
              <p className="text-muted-foreground mt-6 text-[1.0625rem] leading-relaxed md:text-[1.1875rem]">
                {pageData.heroSubheading}
              </p>
            </Reveal>

            <Reveal delay={0.65}>
              <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-[0.9375rem] leading-relaxed">
                {pageData.valueProposition}
              </p>
            </Reveal>

            <Reveal delay={0.75}>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Button href="#inquiry" size="lg">
                  Get a {pageData.cityName} quote
                  <ArrowRight className="h-[18px] w-[18px]" />
                </Button>
                <Button to={`/${pageData.serviceSlug}`} variant="secondary" size="lg">
                  About {pageData.serviceName}
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Content ---------- */}
      <section className="section border-y border-border bg-[hsl(var(--surface)/0.4)]">
        <div className="shell">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left: story + benefits */}
            <div className="space-y-6">
              <Reveal direction="right">
                <h2 className="mb-6 text-[clamp(1.6rem,3vw,2.25rem)]">
                  Local expertise, global standards
                </h2>
                {pageData.introduction?.map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </Reveal>

              <Reveal
                direction="right"
                delay={0.1}
                className="rounded-2xl border border-border bg-[hsl(var(--surface))] p-8"
              >
                <h3 className="mb-5 text-[1.15rem]">Why choose us in {pageData.cityName}?</h3>
                <ul className="space-y-3">
                  {pageData.localBenefits?.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3 text-[0.9375rem]">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-brand-cyan" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* Right: scope + testimonial */}
            <div className="space-y-6">
              <Reveal
                direction="left"
                className="rounded-2xl border border-border bg-[hsl(var(--surface))] p-8"
              >
                <h3 className="mb-4 text-[1.25rem]">Service overview</h3>
                <p className="text-muted-foreground mb-7 leading-relaxed">
                  {pageData.serviceOverview?.description}
                </p>

                <p className="eyebrow mb-4">Key deliverables</p>
                <Stagger className="grid grid-cols-1 gap-2.5 sm:grid-cols-2" gap={0.05}>
                  {pageData.serviceDetails?.deliverables?.map((item, index) => (
                    <StaggerItem
                      key={index}
                      className="flex items-center gap-2.5 rounded-xl border border-border bg-[hsl(var(--surface-raised)/0.6)] px-4 py-3 text-[0.875rem]"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                      <span className="text-foreground">{item}</span>
                    </StaggerItem>
                  ))}
                </Stagger>
              </Reveal>

              <Reveal
                direction="left"
                delay={0.1}
                className="relative overflow-hidden rounded-2xl border border-brand/40 bg-brand/5 p-8"
              >
                <Quote className="mb-4 h-7 w-7 text-brand opacity-60" aria-hidden="true" />
                <blockquote className="text-[1.0625rem] leading-relaxed text-foreground">
                  {pageData.testimonial?.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-border pt-5">
                  <p className="font-display text-[0.9375rem] font-semibold">
                    {pageData.testimonial?.author}
                  </p>
                  <p className="text-muted-foreground text-[0.8125rem]">{pageData.testimonial?.location}</p>
                </figcaption>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      {pageData.faqs?.length > 0 && (
        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Questions"
              title={`${pageData.serviceName} in ${pageData.cityName}, answered.`}
            />
            <div className="mx-auto mt-12 max-w-3xl">
              <FaqAccordion items={pageData.faqs} idPrefix={pageData.pageSlug} />
            </div>
          </div>
        </section>
      )}

      {/* ---------- Inquiry ---------- */}
      <InquiryForm
        endpoint="/local-service-inquiry"
        successMessage="Local service inquiry sent successfully."
        extraPayload={{ city: pageData.cityName, service: pageData.serviceName }}
        title={`Start your project in ${pageData.cityName}`}
        description={`Tell us about your ${pageData.serviceName.toLowerCase()} requirements and we will reply within one working day.`}
      />

      {/* ---------- Other services in this city ---------- */}
      {relatedPages.length > 0 && (
        <section className="section border-t border-border pt-16">
          <div className="shell">
            <p className="eyebrow mb-8">Other services in {pageData.cityName}</p>
            <Stagger className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4" gap={0.05}>
              {relatedPages.map((page) => (
                <StaggerItem key={page.pageSlug}>
                  <Link
                    to={`/${page.pageSlug}`}
                    className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-[hsl(var(--surface)/0.6)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40"
                  >
                    <h3 className="text-[0.9375rem] transition-colors group-hover:text-brand">
                      {page.serviceName}
                    </h3>
                    <span className="text-muted-foreground mt-4 inline-flex items-center gap-1 text-[0.8125rem]">
                      Learn more
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}
    </>
  );
};

export default LocalServiceLandingTemplate;
