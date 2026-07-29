import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AlertCircle, Send } from 'lucide-react';
import { useFormSubmission } from '@/hooks/useFormSubmission.js';
import Button from '@/components/Button.jsx';
import { Reveal } from '@/components/motion/Primitives.jsx';
import { SITE } from '@/data/site.js';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Please give us at least a sentence about your project'),
});

/**
 * InquiryForm — the shared lead form used by service pages and local landing
 * pages. Endpoint and extra payload fields are supplied by the caller.
 */
const InquiryForm = ({
  endpoint = '/service-inquiry',
  successMessage = 'Inquiry sent. We will be in touch shortly.',
  extraPayload = {},
  title = 'Ready to start your project?',
  description,
  id = 'inquiry',
}) => {
  const { submitForm, isSubmitting } = useFormSubmission(endpoint, successMessage);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', phone: '', message: '' },
  });

  const onSubmit = async (data) => {
    await submitForm({ ...data, ...extraPayload }, reset);
  };

  return (
    <section id={id} className="section scroll-mt-28">
      <div className="shell">
        <Reveal className="mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-border bg-[hsl(var(--surface)/0.7)] p-8 backdrop-blur-xl md:p-12">
          <div className="mb-9 text-center">
            <h2 className="text-[clamp(1.6rem,3vw,2.25rem)]">{title}</h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-lg leading-relaxed">
              {description ?? 'Tell us what you are trying to achieve. We reply within one working day.'}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label htmlFor={`${id}-name`} className="field-label">
                  Full name <span className="text-destructive">*</span>
                </label>
                <input
                  id={`${id}-name`}
                  type="text"
                  autoComplete="name"
                  placeholder="Maya Chen"
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
                <label htmlFor={`${id}-email`} className="field-label">
                  Email <span className="text-destructive">*</span>
                </label>
                <input
                  id={`${id}-email`}
                  type="email"
                  autoComplete="email"
                  placeholder="maya@company.ch"
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

            <div>
              <label htmlFor={`${id}-phone`} className="field-label">
                Phone <span className="normal-case tracking-normal opacity-70">(optional)</span>
              </label>
              <input
                id={`${id}-phone`}
                type="tel"
                autoComplete="tel"
                placeholder={SITE.phone}
                className="form-input-base"
                {...register('phone')}
              />
            </div>

            <div>
              <label htmlFor={`${id}-message`} className="field-label">
                Project details <span className="text-destructive">*</span>
              </label>
              <textarea
                id={`${id}-message`}
                rows={5}
                placeholder="What are you building, and what does success look like?"
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

            <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting} magnetic={false}>
              {isSubmitting ? 'Sending…' : 'Send inquiry'}
              {!isSubmitting && <Send className="h-[18px] w-[18px]" />}
            </Button>

            <p className="text-muted-foreground text-center text-[0.75rem]">
              We use your details only to answer this inquiry. Nothing is shared with third parties.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default InquiryForm;
