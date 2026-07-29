import React from 'react';
import { Helmet } from 'react-helmet';
import { SITE } from '@/data/site.js';

const absolute = (path = '/') => {
  if (!path) return SITE.url;
  if (path.startsWith('http')) return path;
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`;
};

/**
 * Seo — one component that owns every head tag for a page.
 *
 * Handles title, description, canonical, robots, Open Graph, Twitter cards and
 * any number of JSON-LD blocks. Pages pass content; nothing here is duplicated
 * across the codebase.
 */
const Seo = ({
  title,
  description = SITE.description,
  path = '/',
  image,
  type = 'website',
  keywords,
  noindex = false,
  publishedTime,
  modifiedTime,
  author,
  schema,
  children,
}) => {
  const fullTitle = title ? `${title} | ${SITE.name} Switzerland` : `${SITE.name} — ${SITE.tagline}`;
  const canonical = absolute(path);
  const ogImage = image ? absolute(image) : `${SITE.url}/og-default.png`;
  const schemas = Array.isArray(schema) ? schema.filter(Boolean) : schema ? [schema] : [];

  return (
    <Helmet prioritizeSeoTags>
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />
      <meta
        name="robots"
        content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1'}
      />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE.legalName} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_CH" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Geo signals for local search */}
      <meta name="geo.region" content="CH" />
      <meta name="geo.placename" content={SITE.address.city} />

      {schemas.map((entry, index) => (
        <script type="application/ld+json" key={index}>
          {JSON.stringify(entry)}
        </script>
      ))}

      {children}
    </Helmet>
  );
};

/* ------------------------------------------------------------------ *
 * Reusable structured-data builders
 * ------------------------------------------------------------------ */

export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE.url}/#organization`,
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.url,
  logo: `${SITE.url}/favicon.svg`,
  image: `${SITE.url}/og-default.png`,
  description: SITE.description,
  email: SITE.email,
  telephone: SITE.phone,
  foundingDate: SITE.founded,
  priceRange: '$$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street,
    postalCode: SITE.address.postalCode,
    addressLocality: SITE.address.city,
    addressCountry: SITE.address.country,
  },
  areaServed: [
    { '@type': 'Country', name: 'Switzerland' },
    ...['Zurich', 'Geneva', 'Basel', 'Bern', 'Lausanne', 'Lucerne'].map((city) => ({
      '@type': 'City',
      name: city,
    })),
  ],
  availableLanguage: SITE.languages,
  sameAs: [SITE.social.linkedin, SITE.social.twitter],
});

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.name,
  description: SITE.description,
  publisher: { '@id': `${SITE.url}/#organization` },
  inLanguage: 'en-CH',
});

export const breadcrumbSchema = (crumbs = []) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: absolute(crumb.path),
  })),
});

export const serviceSchema = ({ name, description, path }) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  description,
  url: absolute(path),
  serviceType: name,
  provider: { '@id': `${SITE.url}/#organization` },
  areaServed: { '@type': 'Country', name: 'Switzerland' },
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: absolute(path),
    servicePhone: SITE.phone,
  },
});

export const faqSchema = (faqs = []) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.q ?? item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.a ?? item.answer },
  })),
});

export const articleSchema = (post) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.excerpt,
  image: post.featuredImage,
  datePublished: post.date,
  dateModified: post.date,
  wordCount: post.content ? String(post.content).split(/\s+/).length : undefined,
  keywords: post.tags?.join(', '),
  articleSection: post.category,
  inLanguage: 'en-CH',
  author: {
    '@type': 'Person',
    name: post.author?.name,
    jobTitle: post.author?.title,
    description: post.author?.bio,
  },
  publisher: { '@id': `${SITE.url}/#organization` },
  mainEntityOfPage: { '@type': 'WebPage', '@id': absolute(`/blog/${post.slug}`) },
});

export default Seo;
