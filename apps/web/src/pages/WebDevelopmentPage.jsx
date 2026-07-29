import React from 'react';
import { Code2, Gauge, Monitor, PenTool, Rocket, SearchCode, Shield, TestTube } from 'lucide-react';
import ServicePageTemplate from '@/components/ServicePageTemplate.jsx';

const processSteps = [
  {
    title: 'Discovery',
    description:
      'In-depth analysis of your business goals, target audience, and competitive landscape in the Swiss market.',
    icon: SearchCode,
  },
  {
    title: 'Design',
    description:
      'Creating premium, user-centric interfaces with a proper design system rather than one-off screens.',
    icon: PenTool,
  },
  {
    title: 'Development',
    description: 'Writing clean, scalable code using React, Next.js, and robust backend architectures.',
    icon: Code2,
  },
  {
    title: 'Testing',
    description:
      'Rigorous quality assurance across all devices, ensuring WCAG accessibility and performance standards.',
    icon: TestTube,
  },
  {
    title: 'Launch',
    description:
      'Smooth deployment to production environments with zero downtime and post-launch monitoring.',
    icon: Rocket,
  },
];

const benefits = [
  {
    title: 'Fast loading',
    description: 'Optimized asset delivery and edge caching for sub-second load times.',
    icon: Gauge,
  },
  {
    title: 'Mobile-first',
    description: 'Flawless responsive design that adapts perfectly to every screen size.',
    icon: Monitor,
  },
  {
    title: 'SEO-optimized',
    description: 'Built-in technical SEO foundations to rank higher in Swiss search results.',
    icon: SearchCode,
  },
  {
    title: 'Enterprise security',
    description: 'Robust protection against vulnerabilities to keep your data safe.',
    icon: Shield,
  },
];

const deliverables = [
  'Discovery workshop & technical audit',
  'Custom UI/UX design system',
  'Frontend & backend development',
  'Multilingual architecture (DE / FR / IT / EN)',
  'CMS integration and editor training',
  'Core Web Vitals optimisation',
  'Analytics and conversion tracking',
  'Accessibility (WCAG 2.2 AA) pass',
  'Deployment, monitoring and handover',
];

const stats = [
  { value: 98, label: 'Median Lighthouse performance score at launch' },
  { value: 1.2, decimals: 1, suffix: 's', label: 'Typical largest contentful paint' },
  { value: 4, suffix: '–8 wks', label: 'Standard corporate site timeline' },
  { value: 4, suffix: ' languages', label: 'Shipped on multilingual builds' },
];

const faqs = [
  {
    q: 'How long does a custom website take to build?',
    a: 'A standard corporate website takes 4–8 weeks. Complex enterprise platforms or e-commerce systems run 12–16 weeks depending on integrations and content volume.',
  },
  {
    q: 'Do you build custom or use templates?',
    a: 'Custom. We leverage robust frameworks like React and Next.js for the foundation, but the design and architecture are built for your business rather than adapted from a generic theme.',
  },
  {
    q: 'Can I manage the content myself after launch?',
    a: 'Yes. We build a user-friendly CMS around your actual editorial workflow and run training sessions with your team before handover.',
  },
  {
    q: 'Can you take over an existing website?',
    a: 'Yes. We audit the existing codebase, tell you plainly what is worth keeping, and propose either an incremental path or a rebuild — whichever genuinely costs you less over time.',
  },
  {
    q: 'How do you handle multilingual sites?',
    a: 'With proper hreflang architecture, per-language URL structures and culturally localised copy. Machine translation alone will not rank or convert in this market.',
  },
];

const WebDevelopmentPage = () => (
  <ServicePageTemplate
    title="High-performance websites"
    subtitle="Web Development"
    path="/web-development"
    accent="brand"
    serviceSlugForLocal="web-development"
    description="We craft lightning-fast, highly secure, and visually stunning web experiences designed specifically to convert your target audience in Switzerland."
    processSteps={processSteps}
    benefits={benefits}
    deliverables={deliverables}
    stats={stats}
    faqs={faqs}
    ctaText="Discuss your web project"
    localContent="Leading enterprises in Geneva, Zurich, Lausanne, Bern and Basel trust Market Ai to build their digital presence. We understand the multilingual and high-standard requirements of the Swiss landscape."
  />
);

export default WebDevelopmentPage;
