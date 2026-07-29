import React from 'react';
import { BarChart3, Crosshair, Megaphone, PieChart, Repeat, Target, TrendingUp, Users } from 'lucide-react';
import ServicePageTemplate from '@/components/ServicePageTemplate.jsx';

const processSteps = [
  {
    title: 'Market read',
    description:
      'Audience research, competitor spend analysis and a hard look at where your current budget is actually going.',
    icon: Crosshair,
  },
  {
    title: 'Channel plan',
    description:
      'A written strategy naming the channels, the budget split and the metric each one is accountable for.',
    icon: Target,
  },
  {
    title: 'Creative production',
    description:
      'Copy and assets built per channel and per language — not one asset stretched awkwardly across six placements.',
    icon: Megaphone,
  },
  {
    title: 'Launch & optimise',
    description:
      'Campaigns go live in controlled increments, with weekly optimisation against the numbers rather than hunches.',
    icon: TrendingUp,
  },
  {
    title: 'Report & scale',
    description:
      'A live dashboard showing spend, cost per acquisition and return. What works gets more budget; what does not gets cut.',
    icon: PieChart,
  },
];

const benefits = [
  {
    title: 'Predictable pipeline',
    description: 'Campaigns tuned to cost per qualified lead, not vanity impressions.',
    icon: Target,
  },
  {
    title: 'Full attribution',
    description: 'Server-side tracking that survives cookie loss, so you know which franc did the work.',
    icon: BarChart3,
  },
  {
    title: 'Audience precision',
    description: 'Segmentation by language region and intent — Romandie and Zurich are not one market.',
    icon: Users,
  },
  {
    title: 'Compounding creative',
    description: 'A structured testing cadence that makes every quarter cheaper than the last.',
    icon: Repeat,
  },
];

const deliverables = [
  'Audience & competitor research',
  'Channel strategy and budget model',
  'Google, Meta and LinkedIn campaign build',
  'Multilingual ad copy and creative',
  'Landing page and CRO support',
  'Server-side conversion tracking',
  'Marketing automation & lead routing',
  'Live performance dashboard',
  'Monthly review and roadmap',
];

const stats = [
  { value: 3.4, decimals: 1, suffix: 'x', label: 'Average return on ad spend achieved' },
  { value: 38, suffix: '%', label: 'Typical cost-per-lead reduction in year one' },
  { value: 4, suffix: ' languages', label: 'Campaigns run natively, not translated' },
  { value: 14, suffix: ' days', label: 'From kickoff to first live campaign' },
];

const faqs = [
  {
    q: 'How do you measure marketing success?',
    a: 'Strict KPI tracking through a custom dashboard covering return on ad spend, conversion rate and exact acquisition cost. Impressions and reach are context, never the headline.',
  },
  {
    q: 'Is ad spend included in your fee?',
    a: 'No, and we state that clearly in every proposal. Media budget is paid directly to the platforms from your own accounts, so you keep full visibility and ownership.',
  },
  {
    q: 'How quickly will we see results?',
    a: 'Paid channels produce data within days and usually stabilise into reliable performance within 6–8 weeks. Organic and content-led work compounds over 3–6 months.',
  },
  {
    q: 'Do you run campaigns in French and German?',
    a: 'Yes, written natively per language region. Swiss French and Swiss German audiences respond to different messaging, and translated copy underperforms in both.',
  },
];

const DigitalMarketingPage = () => (
  <ServicePageTemplate
    title="Marketing steered by data"
    subtitle="Digital Marketing"
    path="/digital-marketing"
    accent="brand-violet"
    serviceSlugForLocal="digital-marketing"
    description="Data-driven marketing strategies tailored for Geneva and the wider Swiss market, using predictive analytics to put budget where it actually returns."
    processSteps={processSteps}
    benefits={benefits}
    deliverables={deliverables}
    stats={stats}
    faqs={faqs}
    ctaText="Plan your campaign"
    localContent="We run campaigns across the German, French and Italian-speaking regions, adjusting message and channel mix to how each market genuinely buys."
  />
);

export default DigitalMarketingPage;
