import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import ScrollToTop from './components/ScrollToTop.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Cursor from './components/motion/Cursor.jsx';
import { ScrollProgress } from './components/motion/Primitives.jsx';
import { ThemeProvider } from './lib/theme.jsx';
import { Toaster } from '@/components/ui/sonner';
import { PageFallback } from './components/LoadingSkeletons.jsx';
import { pageVariants } from './lib/motion.js';

/*
  Only the landing page is eager. Every other route is split out, so a visitor
  downloads the page they asked for instead of all twenty — the difference is
  most of the initial bundle, and it is felt hardest on mobile connections.
  The <Suspense fallback> below covers the swap.
*/
import HomePage from './pages/HomePage.jsx';

const ServicesPage = lazy(() => import('./pages/ServicesPage.jsx'));
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));

// Service pages
const WebDevelopmentPage = lazy(() => import('./pages/WebDevelopmentPage.jsx'));
const AppDevelopmentPage = lazy(() => import('./pages/AppDevelopmentPage.jsx'));
const DigitalMarketingPage = lazy(() => import('./pages/DigitalMarketingPage.jsx'));
const SEOAgencyPage = lazy(() => import('./pages/SEOAgencyPage.jsx'));
const BrandDevelopmentPage = lazy(() => import('./pages/BrandDevelopmentPage.jsx'));
const BusinessIntelligencePage = lazy(() => import('./pages/BusinessIntelligencePage.jsx'));

const BlogListingPage = lazy(() => import('./pages/BlogListingPage.jsx'));
const LocalServicePage = lazy(() => import('./pages/LocalServicePage.jsx'));
const FAQ = lazy(() => import('./pages/FAQ.jsx'));

// Legal pages
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.jsx'));
const TermsConditions = lazy(() => import('./pages/TermsConditions.jsx'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy.jsx'));
const Impressum = lazy(() => import('./pages/Impressum.jsx'));
const Disclaimer = lazy(() => import('./pages/Disclaimer.jsx'));
const RefundPolicy = lazy(() => import('./pages/RefundPolicy.jsx'));

// Heavier routes are split out of the initial bundle
const AnalyzerPage = lazy(() => import('./pages/AnalyzerPage.jsx'));
const BIDashboardPage = lazy(() => import('./pages/BIDashboardPage.jsx'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage.jsx'));

/** Wraps each route in an enter/exit transition. */
const Page = ({ children }) => {
  const reduced = useReducedMotion();
  if (reduced) return <>{children}</>;

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Suspense fallback={<PageFallback />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page><HomePage /></Page>} />
          <Route path="/services" element={<Page><ServicesPage /></Page>} />
          <Route path="/about" element={<Page><AboutPage /></Page>} />
          <Route path="/contact" element={<Page><ContactPage /></Page>} />
          <Route path="/ai-analyzer" element={<Page><AnalyzerPage /></Page>} />

          {/* Service pages */}
          <Route path="/web-development" element={<Page><WebDevelopmentPage /></Page>} />
          <Route path="/app-development" element={<Page><AppDevelopmentPage /></Page>} />
          <Route path="/digital-marketing" element={<Page><DigitalMarketingPage /></Page>} />
          <Route path="/seo-agency" element={<Page><SEOAgencyPage /></Page>} />
          <Route path="/brand-development" element={<Page><BrandDevelopmentPage /></Page>} />
          <Route path="/business-intelligence" element={<Page><BusinessIntelligencePage /></Page>} />

          {/* Product demo */}
          <Route path="/bi-dashboard" element={<Page><BIDashboardPage /></Page>} />

          {/* Blog */}
          <Route path="/blog" element={<Page><BlogListingPage /></Page>} />
          <Route path="/blog/:slug" element={<Page><BlogPostPage /></Page>} />

          {/* Support & legal */}
          <Route path="/faq" element={<Page><FAQ /></Page>} />
          <Route path="/privacy-policy" element={<Page><PrivacyPolicy /></Page>} />
          <Route path="/terms-conditions" element={<Page><TermsConditions /></Page>} />
          <Route path="/cookie-policy" element={<Page><CookiePolicy /></Page>} />
          <Route path="/impressum" element={<Page><Impressum /></Page>} />
          <Route path="/disclaimer" element={<Page><Disclaimer /></Page>} />
          <Route path="/refund-policy" element={<Page><RefundPolicy /></Page>} />

          {/*
            Local SEO landing pages use one slug param (`web-development-in-zurich`)
            because React Router cannot match partial dynamic segments.
          */}
          <Route path="/:localSlug" element={<Page><LocalServicePage /></Page>} />

          <Route path="*" element={<Page><NotFoundPage /></Page>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <ScrollProgress />
        <Cursor />

        <div className="flex min-h-screen flex-col">
          <Header />
          <main id="main" className="flex-1">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>

        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;
