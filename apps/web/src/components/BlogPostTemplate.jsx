import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, Check, Clock, Link2, Linkedin, Twitter } from 'lucide-react';

import Seo, { articleSchema, breadcrumbSchema } from '@/components/Seo.jsx';
import Breadcrumb from '@/components/Breadcrumb.jsx';
import BlogCard from '@/components/BlogCard.jsx';
import Button from '@/components/Button.jsx';
import { Reveal } from '@/components/motion/Primitives.jsx';
import { blogPosts } from '@/data/blogPosts.js';
import { SITE } from '@/data/site.js';

const slugify = (value) =>
  String(value)
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const flatten = (children) =>
  React.Children.toArray(children)
    .map((child) => (typeof child === 'string' ? child : child?.props?.children ?? ''))
    .join('');

/** Markdown → styled elements. Headings get ids so the contents rail can link to them. */
const markdownComponents = {
  h2: ({ children, ...props }) => (
    <h2 id={slugify(flatten(children))} {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 id={slugify(flatten(children))} {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 id={slugify(flatten(children))} {...props}>
      {children}
    </h4>
  ),
  a: ({ children, href, ...props }) => {
    const external = href?.startsWith('http');
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
      </a>
    );
  },
  img: ({ src, alt, ...props }) => <img src={src} alt={alt ?? ''} loading="lazy" decoding="async" {...props} />,
};

const BlogPostTemplate = ({ post }) => {
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28 });

  const headings = useMemo(() => {
    const matches = [...String(post?.content ?? '').matchAll(/^(##|###)\s+(.*)$/gm)];
    return matches.map((match) => ({
      level: match[1].length,
      text: match[2].trim(),
      id: slugify(match[2].trim()),
    }));
  }, [post?.content]);

  const related = useMemo(
    () => blogPosts.filter((entry) => entry.category === post?.category && entry.id !== post?.id).slice(0, 3),
    [post?.category, post?.id]
  );

  useEffect(() => {
    if (!copied) return undefined;
    const timer = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(timer);
  }, [copied]);

  if (!post) return null;

  const url = `${SITE.url}/blog/${post.slug}`;
  const formattedDate = new Date(post.date).toLocaleDateString('en-CH', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      // Clipboard can be blocked; the share links below still work
    }
  };

  return (
    <>
      <Seo
        title={post.title}
        path={`/blog/${post.slug}`}
        description={post.excerpt}
        image={post.featuredImage}
        type="article"
        keywords={post.tags?.join(', ')}
        publishedTime={post.date}
        modifiedTime={post.date}
        author={post.author?.name}
        schema={[
          articleSchema(post),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      {/* Reading progress */}
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[55] h-[3px] origin-left"
        style={{
          scaleX: progress,
          background: 'linear-gradient(90deg, hsl(var(--brand)), hsl(var(--brand-cyan)))',
        }}
      />

      <article>
        {/* ---------- Header ---------- */}
        <header className="relative overflow-hidden pb-12 pt-32">
          <div aria-hidden="true" className="absolute inset-0 bg-grid mask-fade-edges" />

          <div className="shell relative z-10">
            <Breadcrumb
              className="mb-10"
              items={[{ name: 'Blog', path: '/blog' }, { name: post.category }]}
            />

            <div className="mx-auto max-w-3xl">
              <Reveal direction="none">
                <Link
                  to="/blog"
                  className="pill mb-7 transition-colors hover:border-brand/50"
                  style={{ textTransform: 'none' }}
                >
                  {post.category}
                </Link>
              </Reveal>

              <Reveal delay={0.06}>
                <h1 className="text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.1]">{post.title}</h1>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="text-muted-foreground mt-6 text-[1.0625rem] leading-relaxed md:text-[1.1875rem]">
                  {post.excerpt}
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="mt-9 flex flex-wrap items-center justify-between gap-5 border-y border-border py-5">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.author.avatar}
                      alt=""
                      loading="lazy"
                      className="h-11 w-11 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-display text-[0.9375rem] font-semibold">{post.author.name}</p>
                      <p className="text-muted-foreground text-[0.8125rem]">{post.author.title}</p>
                    </div>
                  </div>

                  <div className="text-muted-foreground flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.1em]">
                    <time dateTime={post.date}>{formattedDate}</time>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readingTime} min read
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </header>

        {/* ---------- Cover ---------- */}
        <div className="shell">
          <Reveal className="mx-auto max-w-5xl overflow-hidden rounded-[1.75rem] border border-border">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="aspect-[16/8] w-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </Reveal>
        </div>

        {/* ---------- Body ---------- */}
        <div className="shell py-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Contents + share rail */}
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-32">
                {headings.length > 0 && (
                  <nav aria-label="Table of contents" className="mb-9">
                    <p className="eyebrow mb-4">Contents</p>
                    <ul className="space-y-2.5 border-l border-border">
                      {headings.map((heading) => (
                        <li key={heading.id} style={{ paddingLeft: heading.level === 3 ? '1.75rem' : '1rem' }}>
                          <a
                            href={`#${heading.id}`}
                            className="block text-[0.8125rem] leading-snug text-muted-foreground transition-colors hover:text-brand"
                          >
                            {heading.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}

                <p className="eyebrow mb-4">Share</p>
                <div className="flex gap-2">
                  <ShareLink
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}`}
                    label="Share on Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                  </ShareLink>
                  <ShareLink
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
                    label="Share on LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </ShareLink>
                  <button
                    type="button"
                    onClick={copyLink}
                    aria-label="Copy link"
                    className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/50 hover:text-brand"
                  >
                    {copied ? <Check className="h-4 w-4 text-brand-cyan" /> : <Link2 className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </aside>

            {/* Article */}
            <div className="lg:col-span-9">
              <div className="prose-marketai mx-auto max-w-[42rem]">
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                  {post.content}
                </ReactMarkdown>
              </div>

              {/* Tags */}
              {post.tags?.length > 0 && (
                <div className="mx-auto mt-12 max-w-[42rem]">
                  <ul className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Author */}
              <div className="mx-auto mt-14 max-w-[42rem] rounded-[1.5rem] border border-border bg-[hsl(var(--surface)/0.6)] p-8">
                <div className="flex flex-col gap-6 sm:flex-row">
                  <img
                    src={post.author.avatar}
                    alt=""
                    loading="lazy"
                    className="h-20 w-20 shrink-0 rounded-full object-cover"
                  />
                  <div>
                    <p className="eyebrow mb-2">Written by</p>
                    <h2 className="text-[1.25rem]">{post.author.name}</h2>
                    <p className="mb-3 text-[0.9375rem] text-brand">{post.author.title}</p>
                    <p className="text-muted-foreground leading-relaxed">{post.author.bio}</p>
                  </div>
                </div>
              </div>

              {/* Back */}
              <div className="mx-auto mt-12 max-w-[42rem]">
                <Button to="/blog" variant="secondary" size="sm">
                  <ArrowLeft className="h-4 w-4" />
                  All articles
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Related ---------- */}
        {related.length > 0 && (
          <section className="section border-t border-border">
            <div className="shell">
              <p className="eyebrow mb-8">Related reading</p>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {related.map((entry, index) => (
                  <Reveal key={entry.id} delay={index * 0.07} className="h-full">
                    <BlogCard post={entry} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  );
};

const ShareLink = ({ href, label, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/50 hover:text-brand"
  >
    {children}
  </a>
);

export default BlogPostTemplate;
