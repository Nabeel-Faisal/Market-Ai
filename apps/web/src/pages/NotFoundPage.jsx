import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import Seo from '@/components/Seo.jsx';
import Button from '@/components/Button.jsx';
import Aurora from '@/components/motion/Aurora.jsx';
import { Reveal } from '@/components/motion/Primitives.jsx';
import { SERVICES } from '@/data/site.js';

const NotFoundPage = ({
  title = '404',
  heading = 'This page took a wrong turn.',
  message = "The page you're looking for doesn't exist, or it moved somewhere better.",
}) => (
  <>
    <Seo title="Page not found" path="/404" noindex description={message} />

    <section className="relative flex min-h-[85svh] items-center overflow-hidden py-32">
      <div aria-hidden="true" className="absolute inset-0 bg-grid mask-fade-edges" />
      <Aurora variant="violet" density={2} />

      <div className="shell relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal direction="none">
            <p className="text-gradient-animated font-display text-[clamp(5rem,16vw,11rem)] font-medium leading-none tracking-[-0.05em]">
              {title}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-4 text-[clamp(1.6rem,3.4vw,2.5rem)]">{heading}</h1>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="text-muted-foreground mx-auto mt-5 max-w-md leading-relaxed">{message}</p>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button to="/" size="lg">
                <Home className="h-[18px] w-[18px]" />
                Back to home
              </Button>
              <Button to="/contact" variant="secondary" size="lg">
                <ArrowLeft className="h-[18px] w-[18px]" />
                Talk to us
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.34}>
            <div className="mt-14 border-t border-border pt-8">
              <p className="eyebrow mb-4 justify-center">Popular destinations</p>
              <ul className="flex flex-wrap justify-center gap-2">
                {SERVICES.map((service) => (
                  <li key={service.slug}>
                    <Link
                      to={service.slug}
                      className="inline-block rounded-full border border-border px-4 py-2 text-[0.8125rem] text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/50 hover:text-foreground"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  </>
);

export default NotFoundPage;
