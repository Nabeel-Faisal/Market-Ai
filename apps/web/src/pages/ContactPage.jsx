import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AlertCircle, Clock, Globe, Mail, MapPin, Phone, Send } from 'lucide-react';

import Seo, { breadcrumbSchema, organizationSchema } from '@/components/Seo.jsx';
import SectionHeading from '@/components/SectionHeading.jsx';
import Breadcrumb from '@/components/Breadcrumb.jsx';
import Button from '@/components/Button.jsx';
import Aurora from '@/components/motion/Aurora.jsx';
import ParticleField from '@/components/motion/ParticleField.jsx';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Primitives.jsx';
import { useFormSubmission } from '@/hooks/useFormSubmission.js';
import { CITIES, SITE } from '@/data/site.js';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Please give us at least a sentence to work with'),
});

const ContactPage = () => {
  const { submitForm, isSubmitting } = useFormSubmission(
    '/contact',
    'Message sent successfully. We will get back to you soon.'
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', phone: '', subject: '', message: '' },
  });

  const onSubmit = async (data) => {
    await submitForm(data, reset);
  };

  const channels = [
    {
      icon: Mail,
      label: 'Email',
      value: SITE.email,
      href: `mailto:${SITE.email}`,
      detail: 'Replies within one working day',
      accent: 'brand',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: SITE.phone,
      href: `tel:${SITE.phoneHref}`,
      detail: 'Mon–Fri, 08:30–18:00 CET',
      accent: 'brand-cyan',
    },
    {
      icon: MapPin,
      label: 'Swiss HQ',
      value: `${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}`,
      detail: 'Meetings by appointment',
      accent: 'brand-violet',
    },
  ];

  return (
    <>
      <Seo
        title="Contact"
        path="/contact"
        description="Contact Market Ai for AI-powered digital solutions in Switzerland. Based in Geneva, serving businesses across Zurich, Lausanne, Basel, Bern and all Swiss cities."
        keywords="contact digital agency Switzerland, Geneva agency contact, Zurich web agency, Swiss marketing agency contact"
        schema={[
          organizationSchema(),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
        ]}
      />

      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden pb-14 pt-32">
        <div aria-hidden="true" className="absolute inset-0 bg-grid mask-fade-edges" />
        <Aurora density={2} />
        <ParticleField className="opacity-60" />

        <div className="shell relative z-10">
          <Breadcrumb className="mb-10" items={[{ name: 'Contact' }]} />

          <SectionHeading
            align="left"
            eyebrow="Get in touch"
            title="Tell us what you're"
            highlight="trying to build."
            description="No sales script and no gatekeeping. Write to us and you get a straight answer about whether we can help, and what it would realistically take."
            as="h1"
          />
        </div>
      </section>

      {/* ---------- Channels ---------- */}
      <section className="pb-6">
        <div className="shell">
          <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {channels.map((channel) => {
              const Inner = (
                <>
                  <span
                    className="mb-5 grid h-11 w-11 place-items-center rounded-2xl border border-border transition-transform duration-500 ease-swift group-hover:-translate-y-1"
                    style={{ background: `hsl(var(--${channel.accent}) / 0.12)` }}
                  >
                    <channel.icon
                      className="h-5 w-5"
                      style={{ color: `hsl(var(--${channel.accent}))` }}
                      strokeWidth={1.7}
                    />
                  </span>
                  <p className="eyebrow mb-2">{channel.label}</p>
                  <p className="font-display text-[1.0625rem] font-semibold text-foreground">
                    {channel.value}
                  </p>
                  <p className="text-muted-foreground mt-1.5 text-[0.8125rem]">{channel.detail}</p>
                </>
              );

              return (
                <StaggerItem key={channel.label}>
                  {channel.href ? (
                    <a href={channel.href} className="card-lift group flex h-full flex-col p-7">
                      {Inner}
                    </a>
                  ) : (
                    <div className="card-lift group flex h-full flex-col p-7">{Inner}</div>
                  )}
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* ---------- Form + info ---------- */}
      <section className="section">
        <div className="shell">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Form */}
            <Reveal direction="right" className="lg:col-span-7">
              <div className="rounded-[2rem] border border-border bg-[hsl(var(--surface)/0.7)] p-8 backdrop-blur-xl md:p-11">
                <h2 className="mb-2 text-[clamp(1.5rem,2.6vw,2rem)]">Send a message</h2>
                <p className="text-muted-foreground mb-9">
                  The more context you give us, the more useful our first reply will be.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="field-label">
                        Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Anika Bergström"
                        aria-invalid={Boolean(errors.name)}
                        className={`form-input-base ${errors.name ? 'form-input-error' : ''}`}
                        {...register('name')}
                      />
                      {errors.name && (
                        <p className="form-error-text">
                          <AlertCircle className="h-3.5 w-3.5" /> {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="field-label">
                        Email <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="your.email@example.ch"
                        aria-invalid={Boolean(errors.email)}
                        className={`form-input-base ${errors.email ? 'form-input-error' : ''}`}
                        {...register('email')}
                      />
                      {errors.email && (
                        <p className="form-error-text">
                          <AlertCircle className="h-3.5 w-3.5" /> {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="field-label">
                        Phone <span className="normal-case tracking-normal opacity-70">(optional)</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+41 78 123 45 67"
                        className="form-input-base"
                        {...register('phone')}
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="field-label">
                        Subject <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="subject"
                        type="text"
                        placeholder="How can we help?"
                        aria-invalid={Boolean(errors.subject)}
                        className={`form-input-base ${errors.subject ? 'form-input-error' : ''}`}
                        {...register('subject')}
                      />
                      {errors.subject && (
                        <p className="form-error-text">
                          <AlertCircle className="h-3.5 w-3.5" /> {errors.subject.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="field-label">
                      Message <span className="text-destructive">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      placeholder="Tell us about your project, your timeline and what success looks like…"
                      aria-invalid={Boolean(errors.message)}
                      className={`form-input-base resize-none ${errors.message ? 'form-input-error' : ''}`}
                      {...register('message')}
                    />
                    {errors.message && (
                      <p className="form-error-text">
                        <AlertCircle className="h-3.5 w-3.5" /> {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    isLoading={isSubmitting}
                    magnetic={false}
                  >
                    {isSubmitting ? 'Sending…' : 'Send message'}
                    {!isSubmitting && <Send className="h-[18px] w-[18px]" />}
                  </Button>

                  <p className="text-muted-foreground text-center text-[0.75rem]">
                    Your details are used only to answer this message and are never shared.
                  </p>
                </form>
              </div>
            </Reveal>

            {/* Side info */}
            <div className="space-y-4 lg:col-span-5">
              <Reveal direction="left" className="rounded-2xl border border-border bg-[hsl(var(--surface)/0.6)] p-7">
                <span className="mb-5 grid h-11 w-11 place-items-center rounded-2xl border border-border bg-brand/10">
                  <Globe className="h-5 w-5 text-brand" strokeWidth={1.7} />
                </span>
                <h3 className="mb-3 text-[1.15rem]">Cities we serve</h3>
                <p className="text-muted-foreground text-[0.9375rem] leading-relaxed">{CITIES.join(', ')}.</p>
                <p className="text-muted-foreground mt-4 border-t border-border pt-4 text-[0.8125rem]">
                  Working languages: {SITE.languages.join(', ')}
                </p>
              </Reveal>

              <Reveal
                direction="left"
                delay={0.08}
                className="rounded-2xl border border-border bg-[hsl(var(--surface)/0.6)] p-7"
              >
                <span className="mb-5 grid h-11 w-11 place-items-center rounded-2xl border border-border bg-brand-cyan/10">
                  <Clock className="h-5 w-5 text-brand-cyan" strokeWidth={1.7} />
                </span>
                <h3 className="mb-3 text-[1.15rem]">What happens next</h3>
                <ol className="space-y-3">
                  {[
                    'We read your message properly — a person, not an autoresponder.',
                    'You get a reply within one working day with our honest first read.',
                    'If it looks like a fit, we book a 30-minute call. No deck, no pitch.',
                  ].map((step, index) => (
                    <li key={step} className="flex gap-3 text-[0.9375rem] text-muted-foreground">
                      <span className="font-mono text-[0.75rem] text-brand">0{index + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </Reveal>

              <Reveal
                direction="left"
                delay={0.16}
                className="rounded-2xl border border-brand/40 bg-brand/5 p-7"
              >
                <h3 className="mb-2.5 text-[1.15rem]">Prefer to see numbers first?</h3>
                <p className="text-muted-foreground mb-5 text-[0.9375rem] leading-relaxed">
                  Run our free AI business analysis and bring the results to the call. It takes about
                  two minutes.
                </p>
                <Button to="/ai-analyzer" variant="secondary" size="sm">
                  Open the analyzer
                </Button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
