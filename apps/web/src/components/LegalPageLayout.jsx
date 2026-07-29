import React, { useEffect, useState } from 'react';
import { FileText } from 'lucide-react';

import Seo, { breadcrumbSchema } from '@/components/Seo.jsx';
import Breadcrumb from '@/components/Breadcrumb.jsx';
import Button from '@/components/Button.jsx';
import Aurora from '@/components/motion/Aurora.jsx';
import { Reveal } from '@/components/motion/Primitives.jsx';
import { SITE } from '@/data/site.js';

/**
 * LegalPageLayout — shared shell for policy pages.
 *
 * Adds a sticky section rail with scroll-spy so long documents stay navigable,
 * and marks the page noindex-free but low-priority in the sitemap.
 */
const LegalPageLayout = ({ title, lastUpdated, sections = [], metaDescription, path, children }) => {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-25% 0px -65% 0px', threshold: 0 }
    );

    sections.forEach((section) => {
      const node = document.getElementById(section.id);
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [sections]);

  const resolvedPath = path ?? `/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  return (
    <>
      <Seo
        title={title}
        path={resolvedPath}
        description={metaDescription}
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: title, path: resolvedPath },
        ])}
      />

      {/* ---------- Header ---------- */}
      <section className="relative overflow-hidden pb-10 pt-32">
        <div aria-hidden="true" className="absolute inset-0 bg-grid mask-fade-edges" />
        <Aurora density={1} className="opacity-60" />

        <div className="shell relative z-10">
          <Breadcrumb className="mb-10" items={[{ name: title }]} />

          <Reveal direction="none">
            <span className="pill">
              <FileText className="h-3.5 w-3.5 text-brand" />
              Legal
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-6 text-[clamp(2.25rem,5vw,3.75rem)]">{title}</h1>
          </Reveal>

          {lastUpdated && (
            <Reveal delay={0.12}>
              <p className="text-muted-foreground mt-4 font-mono text-[0.8125rem]">
                Last updated: {lastUpdated}
              </p>
            </Reveal>
          )}
        </div>
      </section>

      {/* ---------- Body ---------- */}
      <div className="shell pb-24 pt-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {sections.length > 0 && (
            <aside className="lg:col-span-3">
              <nav className="lg:sticky lg:top-32" aria-label="Document sections">
                <p className="eyebrow mb-4">On this page</p>
                <ul className="space-y-1 border-l border-border">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        aria-current={activeId === section.id ? 'true' : undefined}
                        className={`-ml-px block border-l-2 py-1.5 pl-4 text-[0.8125rem] leading-snug transition-colors ${
                          activeId === section.id
                            ? 'border-brand text-brand'
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          )}

          <div className={sections.length > 0 ? 'lg:col-span-9' : 'lg:col-span-12'}>
            <div className="prose-marketai max-w-[46rem] [&_section]:scroll-mt-32">{children}</div>

            <div className="mt-16 max-w-[46rem] rounded-2xl border border-border bg-[hsl(var(--surface)/0.6)] p-8">
              <h2 className="mb-2 text-[1.15rem]">Questions about this document?</h2>
              <p className="text-muted-foreground mb-6 text-[0.9375rem] leading-relaxed">
                Write to{' '}
                <a href={`mailto:${SITE.email}`} className="link-underline text-brand">
                  {SITE.email}
                </a>{' '}
                and a person will answer — this is not a legal black hole.
              </p>
              <Button to="/contact" variant="secondary" size="sm">
                Contact us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LegalPageLayout;
