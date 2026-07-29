import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Globe,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  User,
  Wallet,
  Zap,
} from 'lucide-react';

import Button from '@/components/Button.jsx';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import apiServerClient from '@/lib/apiServerClient';

const LOCATIONS = ['Zurich', 'Geneva', 'Basel', 'Bern', 'Lausanne', 'Lucerne', 'Other Swiss City'];

const INDUSTRIES = [
  'Technology',
  'Finance / Banking',
  'Healthcare',
  'Retail & E-commerce',
  'Manufacturing',
  'Professional Services',
];

const GOALS = [
  { id: 'growth', label: 'Business growth & scaling' },
  { id: 'efficiency', label: 'Operational efficiency' },
  { id: 'brand', label: 'Brand development' },
  { id: 'revenue', label: 'Revenue increase' },
  { id: 'expansion', label: 'Market expansion' },
];

const ANALYSIS_PHASES = [
  'Reading market signals',
  'Benchmarking against your sector',
  'Mapping growth opportunities',
  'Drafting your roadmap',
];

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const AIBusinessAnalyzer = () => {
  const [step, setStep] = useState(1); // 1 = form, 2 = analyzing, 3 = results
  const [phase, setPhase] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    location: '',
    industry: '',
    goals: [],
    budget: 25000,
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    companyWebsite: '',
  });

  const update = (patch) => setForm((current) => ({ ...current, ...patch }));

  const toggleGoal = (goalId) =>
    setForm((current) => ({
      ...current,
      goals: current.goals.includes(goalId)
        ? current.goals.filter((id) => id !== goalId)
        : [...current.goals, goalId],
    }));

  const canSubmit =
    form.location &&
    form.industry &&
    form.goals.length > 0 &&
    form.fullName.trim().length >= 2 &&
    isValidEmail(form.email) &&
    form.companyName.trim().length >= 2;

  // Drive the analysing animation, then reveal results
  useEffect(() => {
    if (step !== 2) return undefined;

    const phaseTimer = setInterval(() => {
      setPhase((current) => Math.min(current + 1, ANALYSIS_PHASES.length - 1));
    }, 850);

    const doneTimer = setTimeout(() => {
      clearInterval(phaseTimer);
      setStep(3);
    }, 3500);

    return () => {
      clearInterval(phaseTimer);
      clearTimeout(doneTimer);
    };
  }, [step]);

  useEffect(() => {
    if (!error) return undefined;
    const timer = setTimeout(() => setError(''), 4000);
    return () => clearTimeout(timer);
  }, [error]);

  const startAnalysis = () => {
    if (!canSubmit) {
      setError('Please complete every required field before starting.');
      return;
    }
    setPhase(0);
    setStep(2);
  };

  const submitLead = async () => {
    setIsSubmitting(true);
    try {
      const response = await apiServerClient.fetch('/analyzer/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          companyName: form.companyName,
          companyWebsite: form.companyWebsite,
          analysisResults: {
            location: form.location,
            industry: form.industry,
            goals: form.goals,
            budget: form.budget,
          },
          aiReadinessScore: 85,
          recommendedServices: ['Web Development', 'Digital Marketing'],
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Submission failed');
      }

      setIsSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------------- Success ---------------- */
  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-[2rem] border border-border bg-[hsl(var(--surface)/0.7)] p-10 text-center backdrop-blur-xl md:p-16"
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 16 }}
          className="mx-auto mb-8 grid h-20 w-20 place-items-center rounded-full"
          style={{ background: 'linear-gradient(135deg, hsl(var(--brand-lime)), hsl(var(--brand-cyan)))' }}
        >
          <CheckCircle2 className="h-10 w-10 text-white" />
        </motion.span>

        <h2 className="text-[clamp(1.6rem,3vw,2.25rem)]">
          Thank you, {form.fullName.split(' ')[0]}.
        </h2>
        <p className="text-muted-foreground mx-auto mt-5 max-w-xl leading-relaxed">
          Your analysis is on its way. We've sent a confirmation to{' '}
          <strong className="text-foreground">{form.email}</strong> and our team will follow up shortly
          with your custom roadmap.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button to="/">Back to home</Button>
          <Button to="/services" variant="secondary">
            Explore services
          </Button>
        </div>
      </motion.div>
    );
  }

  /* ---------------- Analyzing ---------------- */
  if (step === 2) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-[2rem] border border-border bg-[hsl(var(--surface)/0.7)] p-10 text-center backdrop-blur-xl md:p-16"
      >
        <div className="mx-auto max-w-md">
          <div className="relative mx-auto mb-10 grid h-28 w-28 place-items-center">
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-transparent"
              style={{
                borderTopColor: 'hsl(var(--brand-cyan))',
                borderRightColor: 'hsl(var(--brand))',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
            />
            <motion.span
              className="absolute inset-3 rounded-full border-2 border-transparent"
              style={{ borderBottomColor: 'hsl(var(--brand-violet))' }}
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
            <Zap className="h-9 w-9 text-brand-cyan" />
          </div>

          <h2 className="text-gradient-blue-cyan text-[1.6rem]">Analyzing business data</h2>
          <p className="text-muted-foreground mt-3 text-[0.9375rem]">
            Processing market signals for {form.companyName}…
          </p>

          <ul className="mt-9 space-y-3 text-left">
            {ANALYSIS_PHASES.map((label, index) => (
              <li key={label} className="flex items-center gap-3">
                <span
                  className={cn(
                    'grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors duration-500',
                    index <= phase ? 'border-brand-cyan bg-brand-cyan/15' : 'border-border'
                  )}
                >
                  {index < phase ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand-cyan" />
                  ) : (
                    <span
                      className={cn(
                        'h-1.5 w-1.5 rounded-full',
                        index === phase ? 'animate-pulse bg-brand-cyan' : 'bg-border'
                      )}
                    />
                  )}
                </span>
                <span
                  className={cn(
                    'text-[0.9375rem] transition-colors duration-500',
                    index <= phase ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    );
  }

  /* ---------------- Results ---------------- */
  if (step === 3) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="text-center">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 16 }}
            className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full"
            style={{ background: 'linear-gradient(135deg, hsl(var(--brand-lime)), hsl(var(--brand-cyan)))' }}
          >
            <CheckCircle2 className="h-8 w-8 text-white" />
          </motion.span>
          <h2 className="text-[clamp(1.6rem,3vw,2.25rem)]">Initial analysis complete</h2>
          <p className="text-muted-foreground mt-3">Based on the profile of {form.companyName}</p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card-lift p-8"
          >
            <span className="mb-6 grid h-11 w-11 place-items-center rounded-2xl border border-border bg-brand-violet/12">
              <Sparkles className="h-5 w-5 text-brand-violet" strokeWidth={1.7} />
            </span>
            <h3 className="mb-5 text-[1.2rem]">AI recommendations</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-[0.9375rem] text-muted-foreground">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
                Implement AI-powered customer analytics to lift conversion by roughly a third.
              </li>
              <li className="flex items-start gap-3 text-[0.9375rem] text-muted-foreground">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
                Optimise your digital presence specifically for the {form.location} market.
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card-lift p-8"
          >
            <span className="mb-6 grid h-11 w-11 place-items-center rounded-2xl border border-border bg-brand-cyan/12">
              <TrendingUp className="h-5 w-5 text-brand-cyan" strokeWidth={1.7} />
            </span>
            <h3 className="mb-5 text-[1.2rem]">Growth roadmap</h3>
            <ol className="space-y-5 border-l border-border pl-6">
              <li className="relative">
                <span className="absolute -left-[1.72rem] top-1.5 h-3 w-3 rounded-full bg-brand-cyan" />
                <p className="font-display text-[0.9375rem] font-semibold">Phase 1 — Foundation</p>
                <p className="text-muted-foreground text-[0.8125rem]">Available in your full report</p>
              </li>
              <li className="relative opacity-60">
                <span className="absolute -left-[1.72rem] top-1.5 h-3 w-3 rounded-full bg-border" />
                <p className="font-display text-[0.9375rem] font-semibold">Phase 2 — Scale</p>
                <p className="text-muted-foreground text-[0.8125rem]">Unlocked with the full report</p>
              </li>
            </ol>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-[1.75rem] border border-brand/40 bg-brand/5 p-8 text-center md:p-11"
        >
          <h3 className="mb-3 text-[1.35rem]">Get your full report</h3>
          <p className="text-muted-foreground mx-auto mb-8 max-w-lg leading-relaxed">
            Submit your results to receive the detailed breakdown and book a free consultation for{' '}
            <strong className="text-foreground">{form.companyName}</strong>.
          </p>

          <ErrorNote message={error} className="mx-auto mb-6 max-w-md" />

          <Button size="lg" onClick={submitLead} isLoading={isSubmitting} magnetic={false}>
            {isSubmitting ? 'Submitting…' : 'Submit results'}
            {!isSubmitting && <Send className="h-[18px] w-[18px]" />}
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  /* ---------------- Form ---------------- */
  return (
    <div className="rounded-[2rem] border border-border bg-[hsl(var(--surface)/0.7)] p-7 backdrop-blur-xl md:p-11">
      <ErrorNote message={error} className="mb-8" />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
        {/* --- Business profile --- */}
        <div className="space-y-9">
          <FieldGroup icon={MapPin} accent="brand" label="Primary location" required>
            <div className="flex flex-wrap gap-2">
              {LOCATIONS.map((location) => (
                <ChoiceChip
                  key={location}
                  selected={form.location === location}
                  onClick={() => update({ location })}
                >
                  {location}
                </ChoiceChip>
              ))}
            </div>
          </FieldGroup>

          <FieldGroup icon={Briefcase} accent="brand-cyan" label="Industry sector" required>
            <div className="flex flex-wrap gap-2">
              {INDUSTRIES.map((industry) => (
                <ChoiceChip
                  key={industry}
                  selected={form.industry === industry}
                  onClick={() => update({ industry })}
                >
                  {industry}
                </ChoiceChip>
              ))}
            </div>
          </FieldGroup>

          <FieldGroup icon={Target} accent="brand-violet" label="Strategic goals" required>
            <div className="grid gap-2.5">
              {GOALS.map((goal) => {
                const selected = form.goals.includes(goal.id);
                return (
                  <button
                    key={goal.id}
                    type="button"
                    onClick={() => toggleGoal(goal.id)}
                    aria-pressed={selected}
                    className={cn(
                      'flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-[0.9375rem] transition-all duration-300',
                      selected
                        ? 'border-brand-violet bg-brand-violet/10 text-foreground'
                        : 'border-border text-muted-foreground hover:border-brand-violet/50 hover:text-foreground'
                    )}
                  >
                    <span
                      className={cn(
                        'grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors',
                        selected ? 'border-brand-violet bg-brand-violet' : 'border-border'
                      )}
                    >
                      {selected && <CheckCircle2 className="h-3.5 w-3.5 text-white" />}
                    </span>
                    {goal.label}
                  </button>
                );
              })}
            </div>
          </FieldGroup>

          <FieldGroup icon={Wallet} accent="brand-pink" label="Estimated budget">
            <p className="text-gradient-pink-magenta mb-5 font-display text-[1.75rem] font-medium tracking-[-0.02em]">
              CHF {form.budget.toLocaleString('en-CH')}
            </p>
            <Slider
              value={[form.budget]}
              onValueChange={(value) => update({ budget: value[0] })}
              min={5000}
              max={100000}
              step={5000}
              aria-label="Estimated budget in Swiss francs"
            />
            <div className="text-muted-foreground mt-3 flex justify-between font-mono text-[11px]">
              <span>CHF 5k</span>
              <span>CHF 100k</span>
            </div>
          </FieldGroup>
        </div>

        {/* --- Contact --- */}
        <div className="rounded-[1.5rem] border border-border bg-[hsl(var(--surface-raised)/0.5)] p-7">
          <h3 className="mb-7 flex items-center gap-2.5 border-b border-border pb-5 text-[1.2rem]">
            <User className="h-5 w-5 text-brand-cyan" strokeWidth={1.8} />
            Contact information
          </h3>

          <div className="space-y-5">
            <TextField
              id="analyzer-name"
              label="Full name"
              required
              placeholder="e.g. Maya Chen"
              value={form.fullName}
              onChange={(value) => update({ fullName: value })}
              autoComplete="name"
            />
            <TextField
              id="analyzer-email"
              label="Email address"
              required
              type="email"
              icon={Mail}
              placeholder="maya@company.ch"
              value={form.email}
              onChange={(value) => update({ email: value })}
              autoComplete="email"
            />
            <TextField
              id="analyzer-phone"
              label="Phone number"
              type="tel"
              icon={Phone}
              placeholder="+41 78 123 45 67"
              value={form.phone}
              onChange={(value) => update({ phone: value })}
              autoComplete="tel"
            />
            <TextField
              id="analyzer-company"
              label="Company name"
              required
              placeholder="e.g. Meridian Labs"
              value={form.companyName}
              onChange={(value) => update({ companyName: value })}
              autoComplete="organization"
            />
            <TextField
              id="analyzer-website"
              label="Company website"
              type="url"
              icon={Globe}
              placeholder="https://example.ch"
              value={form.companyWebsite}
              onChange={(value) => update({ companyWebsite: value })}
              autoComplete="url"
            />
          </div>

          <p className="text-muted-foreground mt-7 border-t border-border pt-5 text-[0.75rem] leading-relaxed">
            Your data is processed securely and never sold or shared with third parties.
          </p>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
        <p className="text-muted-foreground text-[0.8125rem]">
          {canSubmit ? 'Everything looks good — ready when you are.' : 'Complete the required fields to continue.'}
        </p>
        <Button size="lg" onClick={startAnalysis} disabled={!canSubmit} magnetic={false}>
          Start analysis
          <ChevronRight className="h-[18px] w-[18px]" />
        </Button>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */

const FieldGroup = ({ icon: Icon, accent, label, required, children }) => (
  <div>
    <div className="mb-4 flex items-center gap-3">
      <span
        className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-border"
        style={{ background: `hsl(var(--${accent}) / 0.12)` }}
      >
        <Icon className="h-4 w-4" style={{ color: `hsl(var(--${accent}))` }} strokeWidth={1.8} />
      </span>
      <span className="font-display text-[1.0625rem] font-semibold">
        {label} {required && <span className="text-destructive">*</span>}
      </span>
    </div>
    {children}
  </div>
);

const ChoiceChip = ({ selected, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={selected}
    className={cn(
      'rounded-full border px-4 py-2 text-[0.875rem] transition-all duration-300',
      selected
        ? 'border-transparent bg-brand text-white'
        : 'border-border text-muted-foreground hover:border-brand/50 hover:text-foreground'
    )}
  >
    {children}
  </button>
);

const TextField = ({ id, label, required, icon: Icon, value, onChange, ...rest }) => (
  <div>
    <label htmlFor={id} className="field-label">
      {label} {required && <span className="text-destructive">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <Icon
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
      )}
      <input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn('form-input-base', Icon && 'pl-11')}
        {...rest}
      />
    </div>
  </div>
);

const ErrorNote = ({ message, className }) => (
  <AnimatePresence>
    {message && (
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        role="alert"
        className={cn(
          'flex items-center gap-2.5 rounded-xl border border-destructive/50 bg-destructive/10 px-4 py-3 text-[0.875rem] text-destructive',
          className
        )}
      >
        <AlertCircle className="h-4 w-4 shrink-0" />
        {message}
      </motion.div>
    )}
  </AnimatePresence>
);

export default AIBusinessAnalyzer;
