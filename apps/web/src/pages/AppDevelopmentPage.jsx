import React from 'react';
import { Bell, Compass, Layers, LineChart, PenTool, Rocket, Smartphone, TestTube, Zap } from 'lucide-react';
import ServicePageTemplate from '@/components/ServicePageTemplate.jsx';

const processSteps = [
  {
    title: 'Product strategy',
    description:
      'We pressure-test the idea first: who it is for, what it replaces, and which single metric defines success.',
    icon: Compass,
  },
  {
    title: 'Experience design',
    description:
      'Interactive prototypes your team can actually tap through, validated before a line of production code exists.',
    icon: PenTool,
  },
  {
    title: 'Build',
    description:
      'Native or cross-platform development with a shared API layer, shipped in reviewable increments every sprint.',
    icon: Smartphone,
  },
  {
    title: 'Hardening',
    description:
      'Device-lab testing, offline behaviour, accessibility and performance profiling on real hardware, not just simulators.',
    icon: TestTube,
  },
  {
    title: 'Release & iterate',
    description:
      'App Store and Play submission, staged rollout, crash monitoring and a roadmap driven by what users actually do.',
    icon: Rocket,
  },
];

const benefits = [
  {
    title: 'One codebase',
    description: 'Cross-platform where it saves money, native where the experience demands it.',
    icon: Layers,
  },
  {
    title: 'Instant response',
    description: 'Sixty-frame interactions and offline-first data so the app never feels like a website.',
    icon: Zap,
  },
  {
    title: 'Retention built in',
    description: 'Thoughtful onboarding, push strategy and in-app messaging that earns the notification.',
    icon: Bell,
  },
  {
    title: 'Measurable from day one',
    description: 'Event tracking and funnels wired before launch, so the first release already teaches you something.',
    icon: LineChart,
  },
];

const deliverables = [
  'Product discovery & feature prioritisation',
  'Interactive UI/UX prototype',
  'iOS & Android development',
  'Backend API and integrations',
  'Push notifications & deep linking',
  'Analytics and crash reporting',
  'App Store & Play Store submission',
  'Staged rollout and release management',
  'Post-launch support SLA',
];

const stats = [
  { value: 3, suffix: '–4 mo', label: 'Typical MVP timeline' },
  { value: 4, suffix: '–6 mo', label: 'Full cross-platform build' },
  { value: 2, suffix: ' stores', label: 'iOS and Android from one codebase' },
  { value: 99.9, decimals: 1, suffix: '%', label: 'Crash-free session target' },
];

const faqs = [
  {
    q: 'What is the timeline for mobile app development?',
    a: 'Minimum viable products typically take 3–4 months. Fully featured cross-platform applications usually run 4–6 months from concept to store launch.',
  },
  {
    q: 'Native or cross-platform — which should we choose?',
    a: 'Cross-platform covers the large majority of business apps at roughly half the cost. We recommend native only when the product depends on heavy device hardware, advanced graphics or platform-specific capability.',
  },
  {
    q: 'Do you handle App Store and Play Store submission?',
    a: 'Yes, including store listings, screenshots, privacy declarations and the review process. We publish under your developer accounts so you retain full ownership.',
  },
  {
    q: 'What happens after launch?',
    a: 'Most clients continue on a support SLA covering OS updates, crash triage, security patching and a rolling improvement backlog based on real usage data.',
  },
];

const AppDevelopmentPage = () => (
  <ServicePageTemplate
    title="Mobile apps people keep"
    subtitle="App Development"
    path="/app-development"
    accent="brand-cyan"
    serviceSlugForLocal="app-development"
    description="Native and cross-platform mobile applications with seamless user experiences powered by smart algorithms — built to be installed, opened and kept."
    processSteps={processSteps}
    benefits={benefits}
    deliverables={deliverables}
    stats={stats}
    faqs={faqs}
    ctaText="Scope your app"
    localContent="From Zurich fintechs to Lausanne research spin-offs, we build mobile products for Swiss teams who need something more considered than an outsourced template."
  />
);

export default AppDevelopmentPage;
