import express from 'express';

const router = express.Router();

const baseUrl = process.env.WEBSITE_DOMAIN
  ? `https://${process.env.WEBSITE_DOMAIN}`
  : 'https://marketai.ch';

/**
 * Cities and services must stay in sync with apps/web/src/data/localServicePages.js.
 * The canonical sitemap is the static file generated at build time
 * (apps/web/tools/generate-sitemap.js); this endpoint mirrors it for callers
 * that hit the API directly.
 */
const cities = [
  'zurich',
  'geneva',
  'bern',
  'lausanne',
  'basel',
  'lucerne',
  'st-gallen',
  'winterthur',
  'biel',
  'neuchatel',
];

const services = [
  'web-development',
  'app-development',
  'digital-marketing',
  'seo-agency',
  'brand-development',
  'business-intelligence',
];

const staticPages = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/services', priority: '0.9', changefreq: 'monthly' },
  { loc: '/about', priority: '0.8', changefreq: 'monthly' },
  { loc: '/contact', priority: '0.8', changefreq: 'yearly' },
  { loc: '/ai-analyzer', priority: '0.8', changefreq: 'monthly' },
  { loc: '/blog', priority: '0.8', changefreq: 'weekly' },
  { loc: '/bi-dashboard', priority: '0.6', changefreq: 'monthly' },
  { loc: '/faq', priority: '0.6', changefreq: 'monthly' },
  { loc: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { loc: '/terms-conditions', priority: '0.3', changefreq: 'yearly' },
  { loc: '/cookie-policy', priority: '0.3', changefreq: 'yearly' },
  { loc: '/impressum', priority: '0.3', changefreq: 'yearly' },
  { loc: '/disclaimer', priority: '0.3', changefreq: 'yearly' },
  { loc: '/refund-policy', priority: '0.3', changefreq: 'yearly' },
];

router.get('/', (req, res) => {
  const servicePages = services.map((slug) => ({
    loc: `/${slug}`,
    priority: '0.9',
    changefreq: 'monthly',
  }));

  const localPages = services.flatMap((service) =>
    cities.map((city) => ({
      loc: `/${service}-in-${city}`,
      priority: '0.7',
      changefreq: 'monthly',
    })),
  );

  const allPages = [...staticPages, ...servicePages, ...localPages];
  const lastmod = new Date().toISOString().split('T')[0];

  const body = allPages
    .map(
      (page) =>
        `  <url>\n    <loc>${baseUrl}${page.loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`;

  res.set('Content-Type', 'application/xml');
  res.send(xml);
});

export default router;
