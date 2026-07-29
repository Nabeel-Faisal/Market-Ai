import React from 'react';
import { FileSearch, Globe, Link2, MapPin, PenLine, Search, Stethoscope, TrendingUp } from 'lucide-react';
import ServicePageTemplate from '@/components/ServicePageTemplate.jsx';

const processSteps = [
  {
    title: 'Technical audit',
    description:
      'Crawl, index and Core Web Vitals analysis to find what is quietly stopping you from ranking at all.',
    icon: Stethoscope,
  },
  {
    title: 'Keyword & intent map',
    description:
      'Search demand mapped per language region and matched to the stage of the buying decision it belongs to.',
    icon: FileSearch,
  },
  {
    title: 'On-page & architecture',
    description:
      'Information architecture, internal linking and hreflang corrected so each page has one clear job.',
    icon: Globe,
  },
  {
    title: 'Content production',
    description:
      'Genuinely useful pages written for humans first, structured so search engines can read them properly.',
    icon: PenLine,
  },
  {
    title: 'Authority building',
    description:
      'Digital PR and relevant Swiss link acquisition — earned placements, never bought link farms.',
    icon: Link2,
  },
];

const benefits = [
  {
    title: 'Traffic that compounds',
    description: 'Organic rankings keep paying after the invoice is settled, unlike paid clicks.',
    icon: TrendingUp,
  },
  {
    title: 'Local pack visibility',
    description: 'Google Business Profile and local schema tuned per city you actually operate in.',
    icon: MapPin,
  },
  {
    title: 'Multilingual done right',
    description: 'Correct hreflang and per-language content so DE, FR and IT pages stop competing with each other.',
    icon: Globe,
  },
  {
    title: 'Answer-engine ready',
    description: 'Structured data and clear semantics so AI search surfaces you rather than a competitor.',
    icon: Search,
  },
];

const deliverables = [
  'Full technical SEO audit',
  'Keyword and intent research',
  'Information architecture plan',
  'On-page optimisation across templates',
  'Structured data implementation',
  'Multilingual hreflang setup',
  'Local SEO and Google Business Profile',
  'Content calendar and production',
  'Monthly rank and traffic reporting',
];

const stats = [
  { value: 3, suffix: '–6 mo', label: 'Before meaningful ranking movement' },
  { value: 15, label: 'Swiss cities with dedicated local pages' },
  { value: 4, suffix: ' languages', label: 'Optimised natively with hreflang' },
  { value: 100, suffix: '%', label: 'Earned links — no paid link schemes' },
];

const faqs = [
  {
    q: 'When will I see results from SEO?',
    a: 'Technical fixes can lift things within weeks. Significant, durable ranking improvement typically takes 3–6 months, and we tell you that before you sign rather than after.',
  },
  {
    q: 'Do you guarantee first-page rankings?',
    a: 'No, and be sceptical of anyone who does. We commit to the work, the reporting and a realistic trajectory based on your starting position and competition.',
  },
  {
    q: 'How is SEO different in Switzerland?',
    a: 'Four languages, several distinct regional markets, and search behaviour that differs sharply between Romandie and the German-speaking cantons. Architecture and content have to reflect that.',
  },
  {
    q: 'What about AI search and answer engines?',
    a: 'We structure content and schema so language-model-driven search can cite you accurately. The fundamentals — clarity, structure, genuine authority — are the same ones that win in classic search.',
  },
];

const SEOAgencyPage = () => (
  <ServicePageTemplate
    title="Search visibility that lasts"
    subtitle="SEO Agency"
    path="/seo-agency"
    accent="brand-amber"
    serviceSlugForLocal="seo-agency"
    description="Comprehensive SEO services to rank higher in Swiss search results, combining technical depth, semantic content and city-level local optimisation."
    processSteps={processSteps}
    benefits={benefits}
    deliverables={deliverables}
    stats={stats}
    faqs={faqs}
    ctaText="Request an SEO audit"
    localContent="We build city-level visibility across Zurich, Geneva, Basel, Bern and beyond — with content and structured data tuned to how each local market searches."
  />
);

export default SEOAgencyPage;
