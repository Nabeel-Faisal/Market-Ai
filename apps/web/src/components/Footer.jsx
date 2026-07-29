import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from 'lucide-react';
import { getCities, getServices } from '@/data/localServicePages.js';
import { COMPANY_LINKS, LEGAL_LINKS, SERVICES, SITE } from '@/data/site.js';
import { useFormSubmission } from '@/hooks/useFormSubmission.js';
import { Reveal } from '@/components/motion/Primitives.jsx';
import Logo from '@/components/Logo.jsx';
import CeilingBreak from '@/components/CeilingBreak.jsx';
import ServiceMatrix from '@/components/ServiceMatrix.jsx';
import Button from '@/components/Button.jsx';

const Footer = () => {
  const services = getServices();
  const cities = getCities();
  const [email, setEmail] = useState('');
  const { submitForm, isSubmitting } = useFormSubmission(
    '/newsletter-signup',
    'Thank you for subscribing!'
  );

  const handleSubscribe = async (event) => {
    event.preventDefault();
    if (!email) return;
    await submitForm({ email }, () => setEmail(''));
  };

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-border bg-[hsl(var(--surface)/0.5)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, hsl(var(--brand) / 0.6), hsl(var(--brand-cyan) / 0.6), transparent)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full opacity-70"
        style={{
          background: 'radial-gradient(circle, hsl(var(--brand) / var(--aurora-alpha)), transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      <div className="shell relative z-10 pt-20">
        {/* ---------- Closing CTA ---------- */}
        <Reveal className="mb-20 overflow-hidden rounded-[2rem] border border-border bg-[hsl(var(--surface)/0.7)] p-8 backdrop-blur-xl md:p-14">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <div className="max-w-xl">
              <span className="eyebrow mb-4">
                <span className="inline-block h-[5px] w-[5px] rounded-full bg-brand" aria-hidden="true" />
                Next step
              </span>
              <h2 className="text-[clamp(1.9rem,3.4vw,2.9rem)]">
                Let&apos;s find out what your
                <span className="text-gradient-blue-cyan"> growth ceiling </span>
                really is.
              </h2>
              <p className="text-muted-foreground mt-5 max-w-lg leading-relaxed">
                A 30-minute call, no deck and no obligation. We will tell you plainly whether we are
                the right partner for what you are trying to do.
              </p>

              <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Button to="/contact" size="lg">
                  Book a consultation
                  <ArrowRight className="h-[18px] w-[18px]" />
                </Button>
                <Button to="/ai-analyzer" variant="secondary" size="lg">
                  Free AI analysis
                </Button>
              </div>
            </div>

            <CeilingBreak className="hidden lg:block" />
          </div>
        </Reveal>

        {/* ---------- Main grid ---------- */}
        <div className="grid grid-cols-1 gap-12 pb-16 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="text-muted-foreground mt-5 max-w-xs text-[0.9375rem] leading-relaxed">
              Premium digital solutions and AI strategies tailored for the uncompromising standards of
              the Swiss market.
            </p>

            <ul className="mt-7 space-y-3 text-[0.9375rem]">
              <li className="flex items-start gap-2.5 text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>
                  {SITE.address.street}
                  <br />
                  {SITE.address.postalCode} {SITE.address.city}, {SITE.address.countryName}
                </span>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-2.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail className="h-4 w-4 shrink-0 text-brand" />
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phoneHref}`}
                  className="flex items-center gap-2.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Phone className="h-4 w-4 shrink-0 text-brand" />
                  {SITE.phone}
                </a>
              </li>
            </ul>

            <div className="mt-7 flex items-center gap-2">
              <SocialLink href={SITE.social.linkedin} label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </SocialLink>
              <SocialLink href={SITE.social.twitter} label="Twitter">
                <Twitter className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>

          <div className="lg:col-span-2">
            <FooterHeading>Services</FooterHeading>
            <ul className="space-y-2.5">
              {SERVICES.map((service) => (
                <FooterLink key={service.slug} to={service.slug}>
                  {service.name}
                </FooterLink>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <FooterHeading>Company</FooterHeading>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map((link) => (
                <FooterLink key={link.path} to={link.path}>
                  {link.name}
                </FooterLink>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <FooterHeading>Stay ahead</FooterHeading>
            <p className="text-muted-foreground mb-5 text-[0.9375rem] leading-relaxed">
              One email a month on AI, search and digital growth in the Swiss market. No filler, and
              you can leave whenever you like.
            </p>

            <form onSubmit={handleSubscribe} className="relative">
              <label htmlFor="footer-newsletter" className="sr-only">
                Email address
              </label>
              <input
                id="footer-newsletter"
                type="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@company.ch"
                required
                disabled={isSubmitting}
                className="form-input-base pr-14"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                aria-label="Subscribe to the newsletter"
                className="absolute right-1.5 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-lg text-white transition-transform duration-300 hover:scale-105 disabled:opacity-50"
                style={{ background: 'linear-gradient(120deg, hsl(var(--brand)), hsl(var(--brand-cyan)))' }}
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
              </button>
            </form>

            <p className="text-muted-foreground mt-3 text-[0.75rem]">
              By subscribing you agree to our{' '}
              <Link to="/privacy-policy" className="link-underline text-brand">
                privacy policy
              </Link>
              .
            </p>
          </div>
        </div>

        {/* ---------- Local service areas (internal linking for local SEO) ---------- */}
        <div className="border-t border-border py-14">
          <FooterHeading>Local service areas</FooterHeading>
          <p className="text-muted-foreground -mt-2 mb-7 max-w-2xl text-[0.9375rem]">
            We deliver every service in {cities.length} Swiss cities. Pick a combination to open the
            dedicated page.
          </p>

          <ServiceMatrix services={services} cities={cities} />
        </div>

        {/* ---------- Bottom bar ---------- */}
        <div className="flex flex-col gap-5 border-t border-border py-8 md:flex-row md:items-center md:justify-between">
          <p className="text-muted-foreground text-[0.8125rem]">
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          </p>

          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="text-[0.8125rem] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

const FooterHeading = ({ children }) => <p className="eyebrow mb-5 block">{children}</p>;

const FooterLink = ({ to, children }) => (
  <li>
    <Link
      to={to}
      className="group inline-flex items-center gap-1 text-[0.9375rem] text-muted-foreground transition-colors hover:text-foreground"
    >
      {children}
      <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-60" />
    </Link>
  </li>
);

const SocialLink = ({ href, label, children }) => (
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

export default Footer;
