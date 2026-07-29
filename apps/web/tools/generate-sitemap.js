/**
 * Generates public/sitemap.xml and public/robots.txt from the app's own route
 * data, so the sitemap can never drift away from the pages that actually exist.
 *
 * Run automatically as part of `npm run build`.
 */
import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { SITE } from '../src/data/site.js';
import { localServicePages } from '../src/data/localServicePages.js';
import { blogPosts } from '../src/data/blogPosts.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, '../public');
const today = new Date().toISOString().split('T')[0];

/** Static routes with their relative importance. */
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  { path: '/web-development', priority: '0.9', changefreq: 'monthly' },
  { path: '/app-development', priority: '0.9', changefreq: 'monthly' },
  { path: '/digital-marketing', priority: '0.9', changefreq: 'monthly' },
  { path: '/seo-agency', priority: '0.9', changefreq: 'monthly' },
  { path: '/brand-development', priority: '0.9', changefreq: 'monthly' },
  { path: '/business-intelligence', priority: '0.9', changefreq: 'monthly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'yearly' },
  { path: '/ai-analyzer', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/bi-dashboard', priority: '0.6', changefreq: 'monthly' },
  { path: '/faq', priority: '0.6', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms-conditions', priority: '0.3', changefreq: 'yearly' },
  { path: '/cookie-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/impressum', priority: '0.3', changefreq: 'yearly' },
  { path: '/disclaimer', priority: '0.3', changefreq: 'yearly' },
  { path: '/refund-policy', priority: '0.3', changefreq: 'yearly' },
];

const blogRoutes = blogPosts.map((post) => ({
  path: `/blog/${post.slug}`,
  priority: '0.7',
  changefreq: 'monthly',
  lastmod: new Date(post.date).toISOString().split('T')[0],
}));

const localRoutes = localServicePages.map((page) => ({
  path: `/${page.pageSlug}`,
  priority: '0.7',
  changefreq: 'monthly',
}));

const routes = [...staticRoutes, ...blogRoutes, ...localRoutes];

const escape = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${escape(`${SITE.url}${route.path}`)}</loc>
    <lastmod>${route.lastmod ?? today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const robots = `# ${SITE.legalName}
User-agent: *
Allow: /

# Nothing here is worth crawling
Disallow: /hcgi/

Sitemap: ${SITE.url}/sitemap.xml
`;

writeFileSync(resolve(publicDir, 'sitemap.xml'), sitemap, 'utf8');
writeFileSync(resolve(publicDir, 'robots.txt'), robots, 'utf8');

console.log(`[sitemap] wrote ${routes.length} URLs to public/sitemap.xml`);
