import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';

import Seo, { breadcrumbSchema } from '@/components/Seo.jsx';
import SectionHeading from '@/components/SectionHeading.jsx';
import Breadcrumb from '@/components/Breadcrumb.jsx';
import BlogCard from '@/components/BlogCard.jsx';
import Button from '@/components/Button.jsx';
import Aurora from '@/components/motion/Aurora.jsx';
import { Reveal } from '@/components/motion/Primitives.jsx';
import { blogPosts } from '@/data/blogPosts.js';
import { SITE } from '@/data/site.js';
import { cn } from '@/lib/utils';

const categories = ['All', ...new Set(blogPosts.map((post) => post.category))];

const BlogListingPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');

  const sorted = useMemo(
    () => [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date)),
    []
  );

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return sorted.filter((post) => {
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      const matchesSearch =
        !term ||
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term) ||
        post.content.toLowerCase().includes(term) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(term));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, query, sorted]);

  const showFeatured = activeCategory === 'All' && !query.trim() && filtered.length > 0;
  const [featured, ...rest] = filtered;
  const gridPosts = showFeatured ? rest : filtered;

  return (
    <>
      <Seo
        title="Blog & Insights"
        path="/blog"
        description="Actionable intelligence on AI strategy, digital transformation, SEO and business growth in the Swiss market. Written by the Market Ai team."
        keywords="AI blog Switzerland, digital transformation insights, SEO Switzerland, Zurich Geneva Basel tech blog"
        schema={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            '@id': `${SITE.url}/blog#blog`,
            name: `${SITE.name} Insights`,
            description:
              'Actionable intelligence on AI strategy, digital transformation and business growth in the Swiss market.',
            url: `${SITE.url}/blog`,
            publisher: { '@id': `${SITE.url}/#organization` },
            blogPost: sorted.slice(0, 10).map((post) => ({
              '@type': 'BlogPosting',
              headline: post.title,
              url: `${SITE.url}/blog/${post.slug}`,
              datePublished: post.date,
              author: { '@type': 'Person', name: post.author?.name },
            })),
          },
        ]}
      />

      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden pb-12 pt-32">
        <div aria-hidden="true" className="absolute inset-0 bg-grid mask-fade-edges" />
        <Aurora variant="violet" density={2} />

        <div className="shell relative z-10">
          <Breadcrumb className="mb-10" items={[{ name: 'Blog' }]} />

          <SectionHeading
            eyebrow="Insights"
            title="Notes from the"
            highlight="Swiss digital front line."
            description="What we're learning about AI, search and growth — written for people who have to make the decisions, not for other agencies."
            as="h1"
          />

          {/* Search */}
          <Reveal delay={0.2} className="mx-auto mt-10 max-w-lg">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <label htmlFor="blog-search" className="sr-only">
                Search articles
              </label>
              <input
                id="blog-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search articles…"
                className="form-input-base px-11"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Filters + grid ---------- */}
      <section className="section pt-6">
        <div className="shell">
          <div className="hide-scrollbar mb-12 flex justify-start gap-2 overflow-x-auto pb-2 md:justify-center">
            {categories.map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={active}
                  className={cn(
                    'relative shrink-0 rounded-full border px-5 py-2.5 text-[0.875rem] transition-colors duration-300',
                    active
                      ? 'border-transparent text-white'
                      : 'border-border text-muted-foreground hover:border-brand/50 hover:text-foreground'
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="blog-filter-pill"
                      className="absolute inset-0 -z-10 rounded-full"
                      style={{
                        background: 'linear-gradient(120deg, hsl(var(--brand)), hsl(var(--brand-cyan)))',
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {category === 'All' ? 'All articles' : category}
                </button>
              );
            })}
          </div>

          {filtered.length === 0 ? (
            <div className="mx-auto max-w-md rounded-[1.5rem] border border-border bg-[hsl(var(--surface)/0.6)] p-12 text-center">
              <h2 className="mb-2 text-[1.35rem]">No articles found</h2>
              <p className="text-muted-foreground mb-6">Try a different search term or category.</p>
              <Button
                variant="secondary"
                onClick={() => {
                  setQuery('');
                  setActiveCategory('All');
                }}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <>
              {showFeatured && (
                <Reveal className="mb-6">
                  <BlogCard post={featured} featured />
                </Reveal>
              )}

              <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {gridPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.24) }}
                    >
                      <BlogCard post={post} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogListingPage;
