/**
 * Single source of truth for company facts, navigation and reusable marketing
 * content. Pages, the header/footer, the sitemap generator and every JSON-LD
 * block read from here, so a change lands everywhere at once.
 */

export const SITE = {
  name: 'Market Ai',
  legalName: 'Market Ai Switzerland',
  url: 'https://marketai.ch',
  tagline: 'AI-Powered Growth for Swiss Businesses',
  description:
    'Swiss AI-powered digital agency. Web development, app development, digital marketing, SEO, branding and BI dashboards for businesses in Zurich, Geneva, Basel, Bern and beyond.',
  email: 'info@marketai.ch',
  phone: '+41 78 322 88 20',
  phoneHref: '+41783228820',
  address: {
    street: 'Bd Carl-Vogt 60',
    postalCode: '1205',
    city: 'Genève',
    country: 'CH',
    countryName: 'Switzerland',
  },
  founded: '2021',
  languages: ['German', 'French', 'Italian', 'English'],
  social: {
    linkedin: 'https://linkedin.com/company/marketai',
    twitter: 'https://twitter.com/marketai',
  },
};

export const CITIES = [
  'Zurich',
  'Geneva',
  'Basel',
  'Bern',
  'Lausanne',
  'Lucerne',
  'Winterthur',
  'St. Gallen',
  'Lugano',
  'Thun',
  'Neuchâtel',
  'Fribourg',
  'Schaffhausen',
  'Solothurn',
  'Aarau',
];

/** Primary service pages — drives the nav, the home grid and the sitemap. */
export const SERVICES = [
  {
    slug: '/web-development',
    name: 'Web Development',
    short: 'Web',
    tagline: 'Lightning-fast sites engineered to convert',
    description:
      'Custom websites built with modern AI technologies. Optimized for Swiss market standards and multilingual support.',
    accent: 'brand',
    icon: 'Code2',
  },
  {
    slug: '/app-development',
    name: 'App Development',
    short: 'Apps',
    tagline: 'Native and cross-platform products people keep',
    description:
      'Native and cross-platform mobile applications. Seamless user experiences powered by smart algorithms.',
    accent: 'brand-cyan',
    icon: 'Smartphone',
  },
  {
    slug: '/digital-marketing',
    name: 'Digital Marketing',
    short: 'Marketing',
    tagline: 'Campaigns steered by data, not guesswork',
    description:
      'Data-driven marketing strategies tailored for Geneva and Swiss markets using predictive analytics.',
    accent: 'brand-violet',
    icon: 'TrendingUp',
  },
  {
    slug: '/seo-agency',
    name: 'SEO Agency',
    short: 'SEO',
    tagline: 'Rankings that compound month over month',
    description:
      'Comprehensive SEO services to rank higher in Swiss search results. Semantic and local optimization.',
    accent: 'brand-amber',
    icon: 'Search',
  },
  {
    slug: '/brand-development',
    name: 'Brand Development',
    short: 'Brand',
    tagline: 'Identity systems built to be remembered',
    description:
      'Strategic brand identity and positioning for tech companies. From generative logo design to guidelines.',
    accent: 'brand-pink',
    icon: 'Palette',
  },
  {
    slug: '/business-intelligence',
    name: 'Business Intelligence',
    short: 'BI',
    tagline: 'Decisions backed by live numbers',
    description:
      'Transform your data into actionable insights. Custom dashboards for informed decision-making.',
    accent: 'brand-lime',
    icon: 'BarChart3',
  },
];

/** Header navigation. */
export const NAV = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services', children: SERVICES },
  { name: 'About', path: '/about' },
  { name: 'AI Analyzer', path: '/ai-analyzer' },
  { name: 'Blog', path: '/blog' },
];

/** Headline numbers used on the home page and about page. */
/**
 * Home-page ticker between the hero and the stats console. Each entry pairs the
 * outcome a client buys with the discipline that delivers it.
 */
export const GROWTH_TICKER = [
  { outcome: 'Rank higher', discipline: 'SEO & content', accent: 'brand' },
  { outcome: 'Convert better', discipline: 'Landing pages & CRO', accent: 'brand-cyan' },
  { outcome: 'Spend smarter', discipline: 'Google & Meta Ads', accent: 'brand-violet' },
  { outcome: 'Retain longer', discipline: 'Email & CRM automation', accent: 'brand-pink' },
  { outcome: 'Launch faster', discipline: 'Web & campaign builds', accent: 'brand-amber' },
  { outcome: 'See clearly', discipline: 'GA4 & attribution', accent: 'brand-lime' },
  { outcome: 'Sound like you', discipline: 'Brand & creative', accent: 'brand' },
];

/**
 * `code` and `series` drive the telemetry-console presentation on the home page:
 * `code` is the monospace key shown on the left, `series` a 0–1 sparkline trend.
 */
export const STATS = [
  {
    value: 140,
    suffix: '+',
    label: 'Projects delivered',
    detail: 'Across Swiss and EU markets',
    code: 'projects_delivered',
    series: [0.18, 0.24, 0.3, 0.28, 0.38, 0.45, 0.5, 0.58, 0.66, 0.72, 0.85, 1],
  },
  {
    value: 3.4,
    suffix: 'x',
    label: 'Average ROI uplift',
    decimals: 1,
    detail: 'Measured within 12 months',
    code: 'avg_roi_uplift',
    series: [0.12, 0.15, 0.22, 0.2, 0.34, 0.42, 0.55, 0.5, 0.68, 0.78, 0.9, 1],
  },
  {
    value: 15,
    suffix: '',
    label: 'Swiss cities served',
    detail: 'From Geneva to St. Gallen',
    code: 'swiss_cities_served',
    series: [0.2, 0.3, 0.3, 0.4, 0.45, 0.5, 0.6, 0.6, 0.72, 0.8, 0.9, 1],
  },
  {
    value: 98,
    suffix: '%',
    label: 'Client retention',
    detail: 'Partners who renew each year',
    code: 'client_retention',
    series: [0.72, 0.68, 0.8, 0.76, 0.85, 0.82, 0.9, 0.88, 0.93, 0.95, 0.97, 1],
  },
];

/** How the agency works — shown on the home page and about page. */
export const APPROACH = [
  {
    id: '01',
    title: 'Diagnose',
    description:
      'We audit your funnel, stack and market position before a single pixel moves. Every engagement starts with evidence, not opinion.',
    points: [
      'Technical and analytics audit',
      'Competitor and search-demand mapping',
      'A written read on what is actually costing you money',
    ],
  },
  {
    id: '02',
    title: 'Architect',
    description:
      'A concrete plan with scope, milestones and the numbers we intend to move. You approve the destination before we build the road.',
    points: [
      'Itemised scope and fixed milestones',
      'The KPIs we agree to be judged on',
      'No work starts until you have signed off',
    ],
  },
  {
    id: '03',
    title: 'Build',
    description:
      'Weekly shipping, transparent progress, no black boxes. You see working software and live campaigns, not status decks.',
    points: [
      'Weekly releases you can click through',
      'A shared board with real status',
      'Direct access to the people building it',
    ],
  },
  {
    id: '04',
    title: 'Compound',
    description:
      'Launch is the starting line. We measure, iterate and scale what works until the results are structural rather than seasonal.',
    points: [
      'A live dashboard, not a monthly PDF',
      'What works gets more budget; what does not gets cut',
      'Quarterly review against the original numbers',
    ],
  },
];

/** Differentiators. */
export const PILLARS = [
  {
    id: '01',
    title: 'Swiss precision, startup pace',
    description:
      'The quality bar and compliance rigour the Swiss market expects, delivered on timelines that match how fast your competitors move.',
    points: [
      'GDPR and revised FADP built in from day one',
      'Swiss or EU data residency by default',
      'Shipping weekly, not quarterly',
    ],
  },
  {
    id: '02',
    title: 'AI where it actually pays',
    description:
      'We deploy AI when it removes real cost or unlocks real insight — never as a buzzword bolted onto a proposal.',
    points: [
      'We will tell you when AI is the wrong tool',
      'Measured against the cost it removes',
      'No black boxes you cannot audit',
    ],
  },
  {
    id: '03',
    title: 'One team, whole stack',
    description:
      'Strategy, design, engineering and growth sit in the same room. No handoffs lost between three different vendors.',
    points: [
      'One contract, one point of accountability',
      'Nothing falls between agency and developer',
      'The people who planned it are the ones who build it',
    ],
  },
  {
    id: '04',
    title: 'Numbers you can defend',
    description:
      'Every engagement ships with a dashboard. You always know what was spent, what moved and what it returned.',
    points: [
      'A live dashboard from week one',
      'Third-party costs always listed separately',
      'Figures your board can interrogate',
    ],
  },
];

/** Client voices. */
export const TESTIMONIALS = [
  {
    quote:
      'They rebuilt our platform in eleven weeks and it still feels fast two years later. The reporting alone changed how our board makes decisions.',
    author: 'Céline Roth',
    role: 'COO, Fintech scale-up',
    location: 'Zurich',
  },
  {
    quote:
      'The multilingual SEO work put us on page one in both French and German. Inbound leads roughly tripled inside six months.',
    author: 'Marc Blaser',
    role: 'Managing Director, B2B services',
    location: 'Geneva',
  },
  {
    quote:
      'What stood out was the honesty. They cut two features from our scope because the data said nobody would use them.',
    author: 'Anja Keller',
    role: 'Head of Digital, Life sciences',
    location: 'Basel',
  },
  {
    quote:
      'Our BI dashboard replaced four spreadsheets and a weekly meeting. That is the whole review.',
    author: 'Thomas Wyss',
    role: 'CFO, Manufacturing group',
    location: 'Winterthur',
  },
];

/** Technology marquee. */
export const TECH_STACK = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Python',
  'PostgreSQL',
  'Tailwind CSS',
  'React Native',
  'Swift',
  'Kotlin',
  'AWS',
  'Vercel',
  'GA4',
  'HubSpot',
  'Figma',
  'Docker',
];

/** Industries served. */
/** Approximate city-centre coordinates, used to place the coverage map pins. */
export const CITY_GEO = {
  Zurich: { lat: 47.377, lon: 8.54 },
  Geneva: { lat: 46.204, lon: 6.143 },
  Basel: { lat: 47.559, lon: 7.588 },
  Bern: { lat: 46.948, lon: 7.447 },
  Lausanne: { lat: 46.52, lon: 6.633 },
  Lucerne: { lat: 47.05, lon: 8.309 },
  Winterthur: { lat: 47.5, lon: 8.724 },
  'St. Gallen': { lat: 47.425, lon: 9.377 },
  Lugano: { lat: 46.005, lon: 8.951 },
  Thun: { lat: 46.758, lon: 7.628 },
  Neuchâtel: { lat: 46.99, lon: 6.931 },
  Fribourg: { lat: 46.806, lon: 7.162 },
  Schaffhausen: { lat: 47.697, lon: 8.635 },
  Solothurn: { lat: 47.208, lon: 7.538 },
  Aarau: { lat: 47.391, lon: 8.045 },
};

export const INDUSTRIES = [
  'Financial services',
  'Life sciences & pharma',
  'Precision manufacturing',
  'Hospitality & tourism',
  'Professional services',
  'SaaS & technology',
  'Retail & e-commerce',
  'Public sector',
];

/** Home-page FAQ — also emitted as FAQPage structured data. */
export const HOME_FAQS = [
  {
    q: 'What does a typical engagement cost?',
    a: 'Development projects are priced per project and ongoing services such as SEO and marketing run on a monthly retainer. Every quote is itemised after the discovery phase, so you see exactly what each part of the work costs before committing.',
  },
  {
    q: 'How quickly can you start?',
    a: 'Depending on current capacity we usually begin the discovery phase within one to two weeks of signing. Urgent audits and rescue projects can often start sooner.',
  },
  {
    q: 'Do you work in German, French and Italian?',
    a: 'Yes. We build and market in all four Swiss national languages plus English, including correct hreflang architecture and culturally localised copy rather than machine translation.',
  },
  {
    q: 'Who owns the code and the accounts?',
    a: 'You do. On final payment, full intellectual property, repository access and every advertising or analytics account transfers to your name.',
  },
  {
    q: 'Are your solutions GDPR and FADP compliant?',
    a: 'Yes. All architectures and data-handling processes follow the EU GDPR and the revised Swiss FADP, with Swiss or EU hosting regions depending on your requirements.',
  },
  {
    q: 'What happens after launch?',
    a: 'Launch is the start of the measurement phase. Most clients continue on a support SLA covering maintenance, security patching and ongoing optimisation against the KPIs we agreed up front.',
  },
];

/** Legal + support links used by the footer. */
export const LEGAL_LINKS = [
  { name: 'Privacy Policy', path: '/privacy-policy' },
  { name: 'Terms & Conditions', path: '/terms-conditions' },
  { name: 'Cookie Policy', path: '/cookie-policy' },
  { name: 'Disclaimer', path: '/disclaimer' },
  { name: 'Impressum', path: '/impressum' },
  { name: 'Refund Policy', path: '/refund-policy' },
];

export const COMPANY_LINKS = [
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Blog & Insights', path: '/blog' },
  { name: 'AI Business Analyzer', path: '/ai-analyzer' },
  { name: 'BI Dashboard Demo', path: '/bi-dashboard' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Contact', path: '/contact' },
];
