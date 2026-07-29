import React, { useMemo, useState } from 'react';
import { HelpCircle, Search } from 'lucide-react';

import Seo, { breadcrumbSchema, faqSchema } from '@/components/Seo.jsx';
import SectionHeading from '@/components/SectionHeading.jsx';
import Breadcrumb from '@/components/Breadcrumb.jsx';
import FaqAccordion from '@/components/FaqAccordion.jsx';
import Button from '@/components/Button.jsx';
import Aurora from '@/components/motion/Aurora.jsx';
import { Reveal } from '@/components/motion/Primitives.jsx';

const faqCategories = [
  {
    category: 'Services Overview',
    questions: [
      {
        q: 'What specific digital services do you offer?',
        a: 'We specialize in Custom Web Development, Native & Cross-Platform App Development, Data-Driven Digital Marketing, Technical SEO, Brand Development, and Custom Business Intelligence Dashboards.',
      },
      {
        q: 'Do you work with international clients outside Switzerland?',
        a: 'Yes, while our core expertise is the Swiss market, we work with global enterprises and startups, ensuring premium Swiss quality standards on all international deliverables.',
      },
      {
        q: 'Do you build custom software or use templates?',
        a: 'We build custom, scalable solutions tailored to your business needs. While we leverage robust frameworks (like React, Node.js), we do not rely on generic pre-made templates.',
      },
      {
        q: 'Do you provide content creation services?',
        a: 'Yes, our digital marketing and branding teams provide professional copywriting, visual asset creation, and content strategy aligned with your brand.',
      },
      {
        q: 'Can you take over an existing project?',
        a: 'Yes, we offer project auditing and rescue services. We will review your existing codebase or marketing campaigns and propose a strategic path forward.',
      },
    ],
  },
  {
    category: 'Pricing & Payments',
    questions: [
      {
        q: 'How is your pricing structured?',
        a: 'Pricing is project-based for development work (Web, App, BI) and retainer-based for ongoing services (SEO, Marketing). We provide detailed, transparent quotes after the discovery phase.',
      },
      {
        q: 'Do you require an upfront deposit?',
        a: 'Yes, we typically require a 30% to 50% deposit before commencing development projects to secure resources and begin the strategy phase.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept standard bank transfers (IBAN), major credit cards, and for select clients, specific Swiss digital payment methods.',
      },
      {
        q: 'Are there any hidden costs?',
        a: 'No. Our proposals include comprehensive line-item breakdowns. Third-party costs (like ad spend or external software licenses) are explicitly stated as separate from our agency fees.',
      },
      {
        q: 'Do you offer financing or payment plans?',
        a: 'For large enterprise projects, we can structure milestone-based payment plans spanning the duration of the project lifecycle.',
      },
    ],
  },
  {
    category: 'Project Timelines',
    questions: [
      {
        q: 'How long does a custom website take to build?',
        a: 'A standard corporate website takes 4-8 weeks, while complex enterprise platforms or e-commerce systems can take 12-16 weeks depending on requirements.',
      },
      {
        q: 'What is the timeline for mobile app development?',
        a: 'Minimum viable product (MVP) apps typically require 3-4 months. Fully featured cross-platform applications usually span 4-6 months from concept to app store launch.',
      },
      {
        q: 'How quickly can you start a project?',
        a: 'Depending on our current capacity, we generally onboard new clients and begin the discovery phase within 1-2 weeks of contract signing.',
      },
      {
        q: 'When will I see results from SEO?',
        a: 'SEO is a long-term strategy. While technical fixes provide immediate boosts, significant organic ranking improvements typically take 3-6 months to materialize.',
      },
      {
        q: 'How often do you communicate during a project?',
        a: 'We provide weekly status updates, maintain a shared project management dashboard, and schedule bi-weekly milestone review calls.',
      },
    ],
  },
  {
    category: 'Revisions & Support',
    questions: [
      {
        q: 'How many design revisions are included?',
        a: 'Our standard contracts include up to three major revision rounds during the design phase to ensure perfect alignment with your brand vision.',
      },
      {
        q: 'Do you offer post-launch support?',
        a: 'Yes, we offer Service Level Agreements (SLAs) that include regular maintenance, security patching, and technical support after launch.',
      },
      {
        q: 'What happens if my website breaks?',
        a: 'Clients on an active SLA receive priority support with guaranteed response times (usually within 24 hours) for critical issues.',
      },
      {
        q: 'Who owns the code after the project is done?',
        a: 'Upon final payment, full intellectual property rights and code ownership are transferred to you, the client.',
      },
      {
        q: 'Can I manage the website content myself?',
        a: 'Absolutely. We build user-friendly Content Management Systems (CMS) and provide training sessions for your team prior to handover.',
      },
    ],
  },
  {
    category: 'Data Privacy & Security',
    questions: [
      {
        q: 'Are your solutions GDPR and FADP compliant?',
        a: 'Yes, all our web architectures and data handling processes are designed strictly following the EU GDPR and the revised Swiss FADP.',
      },
      {
        q: 'Where is the data hosted?',
        a: 'We default to secure, Swiss-based servers or EU-based cloud regions (like AWS Frankfurt/Zurich) depending on your specific compliance requirements.',
      },
      {
        q: 'How do you handle sensitive user data?',
        a: 'We implement industry-standard encryption (in transit and at rest), secure authentication protocols, and strict access control measures.',
      },
      {
        q: 'Do you sign Non-Disclosure Agreements (NDAs)?',
        a: 'Yes, we regularly sign NDAs before initial discovery calls to protect your intellectual property and business secrets.',
      },
      {
        q: 'Is the AI Business Analyzer data kept private?',
        a: 'Yes. Data submitted through our analyzer is processed securely and is never sold to or shared with unauthorized third parties.',
      },
    ],
  },
  {
    category: 'Location & Service Areas',
    questions: [
      {
        q: 'Where is Market Ai located?',
        a: 'We are proudly headquartered in Zurich, Switzerland, operating with a network of premium digital specialists.',
      },
      {
        q: 'Do you meet clients in person?',
        a: 'Yes, we are available for in-person strategic meetings throughout major Swiss cities including Zurich, Geneva, Bern, and Basel.',
      },
      {
        q: 'Do you understand local Swiss markets?',
        a: 'Deeply. Our strategies account for Swiss cultural nuances, linguistic diversity (German, French, Italian, English), and high local consumer standards.',
      },
      {
        q: 'Can you handle multilingual websites?',
        a: 'Yes, we specialize in building scalable, SEO-optimized multilingual platforms crucial for the Swiss and European markets.',
      },
      {
        q: 'Do you work with startups or only enterprises?',
        a: 'We partner with ambitious startups requiring scalable architecture as well as established enterprises driving digital transformation.',
      },
    ],
  },
  {
    category: 'Technical & General',
    questions: [
      {
        q: 'What technology stack do you use?',
        a: 'We primarily utilize React, Next.js, Vite, Node.js, and modern CSS frameworks like Tailwind for robust, high-performance applications.',
      },
      {
        q: 'Do you use AI in your development?',
        a: 'Yes, we integrate advanced AI APIs for business intelligence, process automation, and intelligent chatbots when it adds tangible business value.',
      },
      {
        q: 'Can you integrate with our existing CRM/ERP?',
        a: 'Yes, we have extensive experience building custom API integrations with platforms like Salesforce, HubSpot, SAP, and custom legacy systems.',
      },
      {
        q: 'Are your websites mobile-responsive?',
        a: '100%. Mobile-first design is standard practice for all our web development projects, ensuring flawless operation across all devices.',
      },
      {
        q: 'How do you measure marketing success?',
        a: 'We rely on strict KPI tracking, utilizing custom Business Intelligence dashboards to track ROI, conversion rates, and exact acquisition costs.',
      },
    ],
  },
];

const allQuestions = faqCategories.flatMap((category) => category.questions);

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-');

const FAQ = () => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return faqCategories;

    return faqCategories
      .map((category) => ({
        ...category,
        questions: category.questions.filter(
          (item) => item.q.toLowerCase().includes(term) || item.a.toLowerCase().includes(term)
        ),
      }))
      .filter((category) => category.questions.length > 0);
  }, [query]);

  const resultCount = filtered.reduce((total, category) => total + category.questions.length, 0);

  return (
    <>
      <Seo
        title="Frequently Asked Questions"
        path="/faq"
        description="Answers to common questions about Market Ai's services, pricing, timelines, data privacy, support and technical processes."
        keywords="digital agency FAQ Switzerland, agency pricing, project timelines, GDPR FADP compliance, Swiss web agency questions"
        schema={[
          faqSchema(allQuestions),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'FAQ', path: '/faq' },
          ]),
        ]}
      />

      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden pb-12 pt-32">
        <div aria-hidden="true" className="absolute inset-0 bg-grid mask-fade-edges" />
        <Aurora variant="violet" density={2} />

        <div className="shell relative z-10">
          <Breadcrumb className="mb-10" items={[{ name: 'FAQ' }]} />

          <SectionHeading
            eyebrow="Support & information"
            title="Everything you'd ask"
            highlight="before the first call."
            description="Thirty-five questions we get asked most often, answered without marketing language."
            as="h1"
          />

          {/* Search */}
          <Reveal delay={0.2} className="mx-auto mt-10 max-w-lg">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <label htmlFor="faq-search" className="sr-only">
                Search questions
              </label>
              <input
                id="faq-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search questions…"
                className="form-input-base pl-11"
              />
            </div>
            {query && (
              <p className="text-muted-foreground mt-3 text-center text-[0.8125rem]">
                {resultCount} {resultCount === 1 ? 'result' : 'results'} for “{query}”
              </p>
            )}
          </Reveal>
        </div>
      </section>

      {/* ---------- Content ---------- */}
      <section className="section pt-8">
        <div className="shell">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Category rail */}
            <aside className="lg:col-span-3">
              <nav className="lg:sticky lg:top-32" aria-label="FAQ categories">
                <p className="eyebrow mb-4">Categories</p>
                <ul className="hide-scrollbar flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
                  {faqCategories.map((category) => (
                    <li key={category.category} className="shrink-0">
                      <a
                        href={`#${slugify(category.category)}`}
                        className="block whitespace-nowrap rounded-xl border border-border px-4 py-2.5 text-[0.875rem] text-muted-foreground transition-colors hover:border-brand/50 hover:text-foreground lg:whitespace-normal lg:border-transparent lg:px-3"
                      >
                        {category.category}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* Questions */}
            <div className="lg:col-span-9">
              {filtered.length === 0 ? (
                <div className="rounded-2xl border border-border bg-[hsl(var(--surface)/0.6)] p-12 text-center">
                  <HelpCircle className="mx-auto mb-4 h-8 w-8 text-muted-foreground" />
                  <h2 className="mb-2 text-[1.35rem]">Nothing matched that search</h2>
                  <p className="text-muted-foreground mb-6">
                    Try a different word, or just ask us directly — we answer faster than you'd expect.
                  </p>
                  <Button to="/contact" variant="secondary">
                    Ask us directly
                  </Button>
                </div>
              ) : (
                <div className="space-y-14">
                  {filtered.map((category) => (
                    <section
                      key={category.category}
                      id={slugify(category.category)}
                      className="scroll-mt-32"
                    >
                      <h2 className="mb-6 border-b border-border pb-4 text-[1.5rem] md:text-[1.75rem]">
                        {category.category}
                      </h2>
                      <FaqAccordion
                        items={category.questions}
                        idPrefix={slugify(category.category)}
                      />
                    </section>
                  ))}
                </div>
              )}

              {/* Closing CTA */}
              <Reveal className="mt-16 rounded-[1.75rem] border border-border bg-[hsl(var(--surface)/0.6)] p-9 text-center md:p-12">
                <h2 className="mb-3 text-[1.5rem] md:text-[1.85rem]">Still have questions?</h2>
                <p className="text-muted-foreground mx-auto mb-7 max-w-md leading-relaxed">
                  Our team gives specific answers for specific projects. Send the details and we will
                  come back with a real opinion.
                </p>
                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                  <Button to="/contact">Contact our team</Button>
                  <Button to="/ai-analyzer" variant="secondary">
                    Run the free analyzer
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
