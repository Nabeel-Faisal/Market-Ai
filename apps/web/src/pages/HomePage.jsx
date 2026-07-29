import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  MousePointerClick,
  Sparkles,
} from 'lucide-react';

import Seo, { faqSchema, organizationSchema, websiteSchema } from '@/components/Seo.jsx';
import SectionHeading from '@/components/SectionHeading.jsx';
import ServiceIndex from '@/components/ServiceIndex.jsx';
import FaqAccordion from '@/components/FaqAccordion.jsx';
import Button from '@/components/Button.jsx';
import Aurora from '@/components/motion/Aurora.jsx';
import ParticleField from '@/components/motion/ParticleField.jsx';
import HeroDepthLayer from '@/components/motion/HeroDepthLayer.jsx';
import PinnedChapter from '@/components/motion/PinnedChapter.jsx';
import { Reveal, SplitText } from '@/components/motion/Primitives.jsx';
import BlogRail from '@/components/BlogRail.jsx';
import StatsTerrain from '@/components/StatsTerrain.jsx';
import GrowthTicker from '@/components/GrowthTicker.jsx';
import HeroPanel from '@/components/HeroPanel.jsx';
import TestimonialDrum from '@/components/TestimonialDrum.jsx';
import ApproachTower from '@/components/ApproachTower.jsx';
import AnalyzerRadar from '@/components/AnalyzerRadar.jsx';
import CoverageMap from '@/components/CoverageMap.jsx';
import IndustryTicker from '@/components/IndustryTicker.jsx';
import { blogPosts } from '@/data/blogPosts.js';
import {
  APPROACH,
  CITIES,
  CITY_GEO,
  GROWTH_TICKER,
  HOME_FAQS,
  INDUSTRIES,
  PILLARS,
  SERVICES,
  SITE,
  STATS,
  TESTIMONIALS,
} from '@/data/site.js';

const HomePage = () => {
  const reduced = useReducedMotion();
  const latestPosts = [...blogPosts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  return (
    <>
      <Seo
        path="/"
        description={SITE.description}
        keywords="AI agency Switzerland, digital agency Zurich, web development Geneva, SEO agency Switzerland, digital marketing Basel, business intelligence Bern"
        schema={[organizationSchema(), websiteSchema(), faqSchema(HOME_FAQS)]}
      />

      {/* ================= HERO ================= */}
      <section className="relative flex min-h-[82svh] items-center overflow-hidden pb-14 pt-32">
        <div aria-hidden="true" className="absolute inset-0 bg-grid mask-fade-edges" />
        <Aurora />
        <ParticleField className="opacity-90" />

        {/* WebGL depth, biased toward the panel side and faded out at every edge
            so nothing ever terminates in a hard line */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            maskImage: 'radial-gradient(ellipse 58% 72% at 70% 48%, #000 28%, transparent 76%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 58% 72% at 70% 48%, #000 28%, transparent 76%)',
          }}
        >
          <HeroDepthLayer />
        </div>

        <div className="shell relative z-10">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            {/* ---- Copy ---- */}
            <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
              {/* Tighter than the global h1 clamp — the copy column is narrower now */}
              <h1 className="text-[clamp(2.5rem,4.8vw,4.05rem)]">
                {/* Wipe-revealed mesh: the colour field is seen through the glyphs */}
                <motion.span
                  className="text-mesh block"
                  initial={reduced ? false : { clipPath: 'inset(0 100% 0 0)' }}
                  animate={{ clipPath: 'inset(0 0% 0 0)' }}
                  transition={{ duration: 1.15, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  AI-Powered Growth
                </motion.span>
                <SplitText
                  as="span"
                  text="for Swiss Businesses"
                  className="block text-foreground"
                  animateOnMount
                  delay={0.6}
                />
              </h1>

              <Reveal direction="up" delay={0.95} duration={0.8}>
                <p className="text-muted-foreground mx-auto mt-7 max-w-xl text-[1.0625rem] leading-relaxed md:text-[1.1875rem] lg:mx-0">
                  We build the websites, apps, campaigns and dashboards that Swiss companies grow on
                  — engineered for Zurich, Geneva, Basel, Bern and everywhere in between.
                </p>
              </Reveal>

              <Reveal direction="up" delay={1.1}>
                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                  <Button to="/contact" size="lg" data-cursor="Let's talk">
                    Schedule consultation
                    <ArrowRight className="h-[18px] w-[18px]" />
                  </Button>
                  <Button to="/ai-analyzer" variant="secondary" size="lg">
                    <Sparkles className="h-[18px] w-[18px] text-brand-cyan" />
                    Analyze my business — free
                  </Button>
                </div>
              </Reveal>

              <Reveal direction="up" delay={1.25}>
                <ul className="text-muted-foreground mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[0.8125rem] lg:justify-start">
                  {['No lock-in contracts', 'GDPR & FADP compliant', 'You own the code'].map(
                    (item) => (
                      <li key={item} className="flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5 text-brand-cyan" />
                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </Reveal>
            </div>

            {/* ---- Live panel ---- */}
            <Reveal direction="up" delay={0.5} duration={0.9} className="mx-auto w-full max-w-md lg:max-w-none">
              <HeroPanel />
            </Reveal>
          </div>
        </div>

      </section>

      {/* ================= GROWTH TICKER ================= */}
      <GrowthTicker items={GROWTH_TICKER} />

      {/* ================= STATS ================= */}
      <section className="section">
        <div className="shell">
          <StatsTerrain stats={STATS} />
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section id="services" className="section relative overflow-hidden">
        <Aurora variant="violet" density={2} className="opacity-60" />

        <div className="shell relative z-10">
          <SectionHeading
            eyebrow="What we do"
            title="Six disciplines,"
            highlight="one accountable team."
            description="Strategy, design, engineering and growth under a single roof — so nothing gets lost between vendors and nobody points fingers when a number moves the wrong way."
          />

          <ServiceIndex services={SERVICES} className="mt-16" />

          <Reveal className="mt-12 flex justify-center">
            <Button to="/services" variant="secondary">
              Compare all services
              <ArrowRight className="h-[18px] w-[18px]" />
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ================= APPROACH (slabs stack as you scroll) ================= */}
      <ApproachTower
        id="approach"
        eyebrow="How we work"
        title="A method, not a"
        highlight="mood board."
        description="Four phases, each with a deliverable you can hold us to. You always know which one we are in and what comes next."
        steps={APPROACH}
        className="border-y border-border"
        footer={
          <Button to="/about" variant="secondary" size="sm">
            More about the studio
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        }
      />

      {/* ================= PILLARS (pinned chapter, inverted) ================= */}
      <PinnedChapter
        id="why-us"
        eyebrow="Why Market Ai"
        title="Reasons clients"
        highlight="stay with us."
        description="Every agency promises quality. These are the four things our clients actually name when we ask them why they renewed."
        steps={PILLARS}
        tone="dark"
        footer={
          <Button to="/contact" variant="secondary" size="sm">
            Start a conversation
            <ArrowRight className="h-4 w-4" />
          </Button>
        }
      />

      {/* ================= TESTIMONIALS ================= */}
      <section className="section relative overflow-hidden border-y border-border bg-[hsl(var(--surface)/0.4)]">
        <Aurora variant="cyan" density={2} className="opacity-50" />

        <div className="shell relative z-10">
          <SectionHeading
            align="left"
            eyebrow="Client voices"
            title="In their words."
            description="Four Swiss teams on what actually changed after we shipped."
          />

          <TestimonialDrum items={TESTIMONIALS} className="mt-14" />
        </div>
      </section>

      {/* ================= ANALYZER CTA ================= */}
      <section className="section">
        <div className="shell">
          <Reveal className="relative overflow-hidden rounded-[2rem] border border-border p-9 md:p-16">
            <Aurora variant="brand" density={3} />
            <div aria-hidden="true" className="absolute inset-0 bg-dots opacity-60" />

            <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
              <div>
                <span className="eyebrow mb-5">
                  <Sparkles className="h-3.5 w-3.5 text-brand-cyan" />
                  Free tool
                </span>
                <h2 className="text-[clamp(1.9rem,3.6vw,3rem)]">
                  Not sure where your
                  <span className="text-gradient-blue-cyan"> biggest gap </span>
                  is?
                </h2>
                <p className="text-muted-foreground mt-5 max-w-lg leading-relaxed">
                  Answer a handful of questions and our AI analyzer returns a prioritised view of
                  where your growth is leaking, which services would fix it, and a realistic budget
                  split. Takes about two minutes.
                </p>
                <div className="mt-8">
                  <Button to="/ai-analyzer" size="lg" data-cursor="Start">
                    <MousePointerClick className="h-[18px] w-[18px]" />
                    Run the free analysis
                  </Button>
                </div>
              </div>

              <AnalyzerRadar className="hidden lg:block" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= COVERAGE (local SEO) ================= */}
      <section className="section border-y border-border bg-[hsl(var(--surface)/0.4)]">
        <div className="shell">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                align="left"
                eyebrow="Where we work"
                title="Local teams, national coverage."
                description={`We serve clients in ${CITIES.length} Swiss cities across the German, French and Italian-speaking regions — in person when it matters, remote when it doesn't.`}
              />

              <IndustryTicker industries={INDUSTRIES} className="mt-8" />
            </div>

            <div className="lg:col-span-7">
              <CoverageMap cities={CITIES} geo={CITY_GEO} />
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="section">
        <div className="shell">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <SectionHeading
                  align="left"
                  eyebrow="Questions"
                  title="Answered up front."
                  description="The things people ask before the first call. If yours isn't here, just ask us directly."
                >
                  <Button to="/faq" variant="secondary" size="sm">
                    Full FAQ
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </SectionHeading>
              </div>
            </div>

            <div className="lg:col-span-8">
              <FaqAccordion items={HOME_FAQS} idPrefix="home-faq" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= LATEST INSIGHTS ================= */}
      <section className="section relative overflow-hidden border-t border-border">
        <div className="shell">
          <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              align="left"
              eyebrow="Insights"
              title="Reading worth your time."
              className="max-w-xl"
            />
            <Reveal>
              <Button to="/blog" variant="secondary" size="sm">
                All articles
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Reveal>
          </div>

        </div>

        <BlogRail posts={latestPosts} />
      </section>
    </>
  );
};

export default HomePage;
