import React from 'react';
import { BookOpen, Compass, Eye, Fingerprint, MessageSquare, Palette, Shapes, Sparkles } from 'lucide-react';
import ServicePageTemplate from '@/components/ServicePageTemplate.jsx';

const processSteps = [
  {
    title: 'Positioning',
    description:
      'Interviews, market mapping and honest internal debate about what you are actually better at than the alternatives.',
    icon: Compass,
  },
  {
    title: 'Narrative',
    description:
      'The story, the value proposition and the words your team can repeat without wincing — in every language you sell in.',
    icon: MessageSquare,
  },
  {
    title: 'Identity',
    description:
      'Logo, typography, colour and motion designed as one coherent system, tested at every size it will ever appear.',
    icon: Palette,
  },
  {
    title: 'Application',
    description:
      'The identity applied to the things you actually use daily: site, deck, signage, product UI and social templates.',
    icon: Shapes,
  },
  {
    title: 'Guidelines',
    description:
      'A practical guide plus an asset library, so the brand survives contact with everyone who uses it after us.',
    icon: BookOpen,
  },
];

const benefits = [
  {
    title: 'Instantly recognisable',
    description: 'A distinct visual signature that survives being scaled down to a favicon.',
    icon: Fingerprint,
  },
  {
    title: 'Consistent everywhere',
    description: 'One system across web, print, product and social, so nothing looks borrowed.',
    icon: Eye,
  },
  {
    title: 'Premium by default',
    description: 'Craft calibrated to the standard Swiss buyers quietly expect before they trust you.',
    icon: Sparkles,
  },
  {
    title: 'Genuinely usable',
    description: 'Guidelines your team can follow without calling an agency for every social post.',
    icon: BookOpen,
  },
];

const deliverables = [
  'Stakeholder interviews & brand audit',
  'Positioning and value proposition',
  'Naming support (where required)',
  'Logo and visual identity system',
  'Typography and colour system',
  'Messaging framework & tone of voice',
  'Multilingual copy adaptation',
  'Brand guidelines document',
  'Editable asset and template library',
];

const stats = [
  { value: 6, suffix: '–10 wks', label: 'Typical identity project timeline' },
  { value: 3, label: 'Major revision rounds included' },
  { value: 4, suffix: ' languages', label: 'Messaging adapted, not translated' },
  { value: 100, suffix: '%', label: 'Source files handed over to you' },
];

const faqs = [
  {
    q: 'How many design revisions are included?',
    a: 'Standard contracts include up to three major revision rounds during the design phase, which is enough for genuine alignment without endless circling.',
  },
  {
    q: 'Do we own the final assets?',
    a: 'Yes. On final payment, full intellectual property and every editable source file transfer to you.',
  },
  {
    q: 'Can you rebrand without losing our existing recognition?',
    a: 'Yes. Evolution is often the right call over revolution — we map what your market already associates with you and deliberately keep the equity worth keeping.',
  },
  {
    q: 'Do you handle brand messaging in multiple languages?',
    a: 'Yes. Messaging is adapted per language by people who write in it, because a tagline that lands in German often falls flat translated into French.',
  },
];

const BrandDevelopmentPage = () => (
  <ServicePageTemplate
    title="Brands built to be remembered"
    subtitle="Brand Development"
    path="/brand-development"
    accent="brand-pink"
    serviceSlugForLocal="brand-development"
    description="Strategic brand identity and positioning for ambitious companies — from generative logo exploration through to the guidelines that keep it consistent."
    processSteps={processSteps}
    benefits={benefits}
    deliverables={deliverables}
    stats={stats}
    faqs={faqs}
    ctaText="Start your rebrand"
    localContent="Swiss buyers read craft as credibility. We build identities that hold up against that standard, in every language region you operate in."
  />
);

export default BrandDevelopmentPage;
