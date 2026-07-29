import React from 'react';
import { Clock, Lock, Sparkles } from 'lucide-react';

import Seo, { breadcrumbSchema } from '@/components/Seo.jsx';
import SectionHeading from '@/components/SectionHeading.jsx';
import Breadcrumb from '@/components/Breadcrumb.jsx';
import AIBusinessAnalyzer from '@/components/AIBusinessAnalyzer.jsx';
import Aurora from '@/components/motion/Aurora.jsx';
import ParticleField from '@/components/motion/ParticleField.jsx';
import { Reveal } from '@/components/motion/Primitives.jsx';
import { SITE } from '@/data/site.js';

const AnalyzerPage = () => (
  <>
    <Seo
      title="AI Business Analyzer"
      path="/ai-analyzer"
      description="Get a free AI-powered analysis of your business. Discover growth opportunities, recommended services and a realistic budget allocation for your Swiss business."
      keywords="free business analysis Switzerland, AI business analyzer, digital maturity assessment, growth audit Zurich Geneva"
      schema={[
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'AI Analyzer', path: '/ai-analyzer' },
        ]),
        {
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'AI Business Analyzer',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          url: `${SITE.url}/ai-analyzer`,
          provider: { '@id': `${SITE.url}/#organization` },
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'CHF' },
        },
      ]}
    />

    <section className="relative overflow-hidden pb-12 pt-32">
      <div aria-hidden="true" className="absolute inset-0 bg-grid mask-fade-edges" />
      <Aurora density={3} />
      <ParticleField className="opacity-70" />

      <div className="shell relative z-10">
        <Breadcrumb className="mb-10" items={[{ name: 'AI Analyzer' }]} />

        <SectionHeading
          eyebrow="Free tool"
          title="AI Business"
          highlight="Analyzer"
          description="Answer a few questions and get a prioritised read on where your growth is leaking, which services would fix it, and what a realistic budget looks like."
          as="h1"
        />

        <Reveal delay={0.24}>
          <ul className="text-muted-foreground mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[0.8125rem]">
            <li className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-brand-cyan" />
              Takes about two minutes
            </li>
            <li className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-brand-cyan" />
              No cost, no obligation
            </li>
            <li className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-brand-cyan" />
              Your data is never sold
            </li>
          </ul>
        </Reveal>
      </div>
    </section>

    <section className="pb-24">
      <div className="shell">
        <div className="mx-auto max-w-5xl">
          <AIBusinessAnalyzer />
        </div>
      </div>
    </section>
  </>
);

export default AnalyzerPage;
