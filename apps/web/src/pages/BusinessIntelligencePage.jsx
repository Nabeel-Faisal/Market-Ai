import React from 'react';
import { Activity, Boxes, Database, Gauge, GraduationCap, LayoutDashboard, Lock, Workflow } from 'lucide-react';
import ServicePageTemplate from '@/components/ServicePageTemplate.jsx';

const processSteps = [
  {
    title: 'Data audit',
    description:
      'We map every system holding your numbers and find where the same figure disagrees with itself.',
    icon: Database,
  },
  {
    title: 'Pipeline',
    description:
      'Automated ingestion into a single warehouse, so reporting stops depending on somebody exporting a spreadsheet.',
    icon: Workflow,
  },
  {
    title: 'KPI framework',
    description:
      'An agreed definition for every metric that matters — one number, one meaning, across the whole company.',
    icon: Gauge,
  },
  {
    title: 'Dashboards',
    description:
      'Role-specific views built for decisions, not decoration. Executives, operations and finance each get their own.',
    icon: LayoutDashboard,
  },
  {
    title: 'Enablement',
    description:
      'Training and documentation so your team runs the system confidently without calling us every month.',
    icon: GraduationCap,
  },
];

const benefits = [
  {
    title: 'One source of truth',
    description: 'The end of three departments arriving at a meeting with three different revenue figures.',
    icon: Boxes,
  },
  {
    title: 'Live, not monthly',
    description: 'Automated refreshes replace the manual reporting cycle that eats a week every month.',
    icon: Activity,
  },
  {
    title: 'Forward-looking',
    description: 'Forecasting and anomaly detection that flag problems while there is still time to act.',
    icon: Gauge,
  },
  {
    title: 'Compliant by design',
    description: 'Swiss or EU hosting, role-based access and encryption at rest and in transit.',
    icon: Lock,
  },
];

const deliverables = [
  'Data source audit and mapping',
  'Warehouse and pipeline setup',
  'KPI definition framework',
  'Executive and operational dashboards',
  'Automated reporting and alerts',
  'Forecasting and predictive models',
  'CRM / ERP integrations',
  'Role-based access control',
  'Team training and documentation',
];

const stats = [
  { value: 6, suffix: '–10 wks', label: 'From audit to first live dashboard' },
  { value: 1, label: 'Agreed definition per metric, company-wide' },
  { value: 40, suffix: '+ hrs', label: 'Manual reporting time saved per month' },
  { value: 100, suffix: '%', label: 'Swiss or EU data residency' },
];

const faqs = [
  {
    q: 'Can you integrate with our existing CRM or ERP?',
    a: 'Yes. We build custom API integrations with platforms like Salesforce, HubSpot, SAP and bespoke legacy systems, including ones with no modern API.',
  },
  {
    q: 'Where is our data hosted?',
    a: 'Swiss-based servers or EU cloud regions such as Frankfurt and Zurich, chosen against your specific compliance requirements.',
  },
  {
    q: 'How do you handle sensitive data?',
    a: 'Industry-standard encryption in transit and at rest, strict role-based access control and full audit logging. Compliance shapes the architecture from day one.',
  },
  {
    q: 'Do we need a data team to run this?',
    a: 'No. The system is built for the people who already work there. We train your team and document everything so the dashboards outlive our engagement.',
  },
];

const BusinessIntelligencePage = () => (
  <ServicePageTemplate
    title="Decisions backed by live data"
    subtitle="Business Intelligence"
    path="/business-intelligence"
    accent="brand-lime"
    serviceSlugForLocal="business-intelligence"
    description="Transform scattered data into actionable insight with custom dashboards, automated pipelines and a KPI framework your whole company agrees on."
    processSteps={processSteps}
    benefits={benefits}
    deliverables={deliverables}
    stats={stats}
    faqs={faqs}
    ctaText="Book a data audit"
    localContent="Swiss and EU data residency, FADP and GDPR compliance built in from the first architecture decision — not retrofitted before launch."
  />
);

export default BusinessIntelligencePage;
