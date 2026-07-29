import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  BarChart3,
  Code2,
  Menu,
  Palette,
  Search,
  Smartphone,
  TrendingUp,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV, SERVICES, SITE } from '@/data/site.js';
import Logo from '@/components/Logo.jsx';
import ThemeToggle from '@/components/ThemeToggle.jsx';
import Button from '@/components/Button.jsx';

const ICONS = { Code2, Smartphone, TrendingUp, Search, Palette, BarChart3 };

const EASE = [0.22, 1, 0.36, 1];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const closeTimer = useRef(null);
  const location = useLocation();
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close every overlay when the route changes
  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [location.pathname]);

  // Lock body scroll behind the mobile sheet
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key !== 'Escape') return;
      setMobileOpen(false);
      setMegaOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const servicesActive = SERVICES.some((service) => location.pathname === service.slug);

  const openMega = () => {
    window.clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };

  const scheduleCloseMega = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 140);
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-brand px-5 py-3 text-white focus:not-sr-only focus:fixed focus:left-5 focus:top-5"
      >
        Skip to content
      </a>

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-swift',
          scrolled ? 'py-2.5' : 'py-4'
        )}
      >
        <div className="shell">
          <div
            className={cn(
              'flex items-center justify-between gap-4 rounded-full px-3 py-2 transition-all duration-500 ease-swift md:px-4',
              scrolled
                ? 'border border-border bg-[hsl(var(--surface)/0.72)] shadow-[0_14px_40px_-24px_hsl(var(--shadow-color)/0.7)] backdrop-blur-xl'
                : 'border border-transparent bg-transparent'
            )}
          >
            <Logo className="pl-1.5" />

            {/* ---------- Desktop nav ---------- */}
            <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
              {NAV.map((item) =>
                item.children ? (
                  <div
                    key={item.path}
                    className="relative"
                    onMouseEnter={openMega}
                    onMouseLeave={scheduleCloseMega}
                  >
                    <Link
                      to={item.path}
                      aria-expanded={megaOpen}
                      aria-haspopup="true"
                      onFocus={openMega}
                      className={cn(
                        'relative flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.875rem] font-medium transition-colors duration-300',
                        servicesActive || megaOpen
                          ? 'text-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {item.name}
                      <motion.span
                        aria-hidden="true"
                        animate={{ rotate: megaOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="text-[0.6rem] leading-none opacity-60"
                      >
                        ▾
                      </motion.span>
                      {servicesActive && <ActivePill />}
                    </Link>

                    <AnimatePresence>
                      {megaOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.99 }}
                          transition={{ duration: 0.24, ease: EASE }}
                          className="absolute left-1/2 top-full w-[min(44rem,92vw)] -translate-x-1/2 pt-4"
                        >
                          <div className="overflow-hidden rounded-3xl border border-border bg-[hsl(var(--surface)/0.92)] p-3 shadow-[0_30px_80px_-40px_hsl(var(--shadow-color)/0.9)] backdrop-blur-2xl">
                            <div className="grid grid-cols-2 gap-1.5">
                              {SERVICES.map((service, index) => {
                                const Icon = ICONS[service.icon] ?? Code2;
                                return (
                                  <motion.div
                                    key={service.slug}
                                    initial={reduced ? false : { opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.035, ease: EASE }}
                                  >
                                    <Link
                                      to={service.slug}
                                      className="group flex items-start gap-3 rounded-2xl p-3 transition-colors duration-300 hover:bg-[hsl(var(--muted)/0.7)]"
                                    >
                                      <span
                                        className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-border transition-transform duration-500 ease-swift group-hover:scale-110"
                                        style={{ background: `hsl(var(--${service.accent}) / 0.12)` }}
                                      >
                                        <Icon
                                          className="h-[17px] w-[17px]"
                                          style={{ color: `hsl(var(--${service.accent}))` }}
                                          strokeWidth={1.8}
                                        />
                                      </span>
                                      <span className="min-w-0">
                                        <span className="flex items-center gap-1 font-display text-[0.875rem] font-semibold text-foreground">
                                          {service.name}
                                          <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-70" />
                                        </span>
                                        <span className="mt-0.5 block text-[0.8125rem] leading-snug text-muted-foreground">
                                          {service.tagline}
                                        </span>
                                      </span>
                                    </Link>
                                  </motion.div>
                                );
                              })}
                            </div>

                            <div className="mt-2 flex items-center justify-between gap-4 rounded-2xl border border-border bg-[hsl(var(--muted)/0.5)] px-4 py-3">
                              <p className="text-[0.8125rem] text-muted-foreground">
                                Not sure which one you need?
                              </p>
                              <Link
                                to="/ai-analyzer"
                                className="link-underline shrink-0 font-display text-[0.8125rem] font-semibold text-brand"
                              >
                                Run the free analyzer
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'relative rounded-full px-4 py-2 text-[0.875rem] font-medium transition-colors duration-300',
                      isActive(item.path) ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {item.name}
                    {isActive(item.path) && <ActivePill />}
                  </Link>
                )
              )}
            </nav>

            {/* ---------- Right cluster ---------- */}
            <div className="flex items-center gap-2">
              <span
                className="hidden items-center gap-1.5 rounded-full border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground xl:inline-flex"
                title={`${SITE.legalName} — Swiss based`}
              >
                <span aria-hidden="true">🇨🇭</span> Switzerland
              </span>

              <ThemeToggle />

              <Button to="/contact" size="sm" className="hidden sm:inline-flex" magnetic={false}>
                Get in touch
              </Button>

              <button
                type="button"
                onClick={() => setMobileOpen((open) => !open)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-brand/50 lg:hidden"
              >
                {mobileOpen ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ---------- Mobile sheet ---------- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-[hsl(var(--background)/0.97)] backdrop-blur-2xl lg:hidden"
          >
            <div className="shell flex min-h-full flex-col pb-12 pt-28">
              <motion.nav
                initial="hidden"
                animate="visible"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } } }}
                className="flex flex-col gap-1"
                aria-label="Mobile"
              >
                {NAV.filter((item) => !item.children).map((item) => (
                  <MobileRow key={item.path} to={item.path} active={isActive(item.path)}>
                    {item.name}
                  </MobileRow>
                ))}

                <motion.p
                  variants={mobileItemVariants}
                  className="eyebrow mt-8 border-t border-border pt-8"
                >
                  Services
                </motion.p>

                {SERVICES.map((service) => {
                  const Icon = ICONS[service.icon] ?? Code2;
                  return (
                    <MobileRow
                      key={service.slug}
                      to={service.slug}
                      active={isActive(service.slug)}
                      icon={
                        <Icon
                          className="h-4 w-4"
                          style={{ color: `hsl(var(--${service.accent}))` }}
                          strokeWidth={1.9}
                        />
                      }
                    >
                      {service.name}
                    </MobileRow>
                  );
                })}

                <motion.div variants={mobileItemVariants} className="mt-10 flex flex-col gap-3">
                  <Button to="/contact" size="lg" className="w-full" magnetic={false}>
                    Start a project
                  </Button>
                  <Button to="/ai-analyzer" variant="secondary" size="lg" className="w-full" magnetic={false}>
                    Free AI business analysis
                  </Button>
                </motion.div>

                <motion.div
                  variants={mobileItemVariants}
                  className="mt-10 space-y-1 border-t border-border pt-8 text-[0.9375rem] text-muted-foreground"
                >
                  <a href={`mailto:${SITE.email}`} className="block transition-colors hover:text-foreground">
                    {SITE.email}
                  </a>
                  <a href={`tel:${SITE.phoneHref}`} className="block transition-colors hover:text-foreground">
                    {SITE.phone}
                  </a>
                </motion.div>
              </motion.nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const mobileItemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

const MobileRow = ({ to, children, active, icon }) => (
  <motion.div variants={mobileItemVariants}>
    <Link
      to={to}
      className={cn(
        'flex items-center gap-3 border-b border-border/60 py-4 font-display text-[1.35rem] font-semibold tracking-[-0.02em] transition-colors',
        active ? 'text-brand' : 'text-foreground'
      )}
    >
      {icon}
      {children}
    </Link>
  </motion.div>
);

const ActivePill = () => (
  <motion.span
    layoutId="nav-active-pill"
    className="absolute inset-0 -z-10 rounded-full border border-border bg-[hsl(var(--muted)/0.8)]"
    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
  />
);

export default Header;
