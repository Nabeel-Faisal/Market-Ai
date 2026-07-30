import React from 'react';
import { Plus } from 'lucide-react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/motion/Primitives.jsx';

/**
 * FaqAccordion — shared question list used on the home page, the FAQ page and
 * the local landing pages, so the interaction is identical everywhere.
 */
const FaqAccordion = ({ items = [], className, idPrefix = 'faq' }) => (
  <AccordionPrimitive.Root type="single" collapsible className={cn('w-full space-y-3', className)}>
    {items.map((item, index) => {
      const question = item.q ?? item.question;
      const answer = item.a ?? item.answer;

      return (
        <Reveal key={`${idPrefix}-${index}`} delay={index * 0.04} duration={0.5}>
          <AccordionPrimitive.Item
            value={`${idPrefix}-${index}`}
            className="group overflow-hidden rounded-2xl border border-border bg-[hsl(var(--surface)/0.6)] transition-colors duration-300 data-[state=open]:border-brand/40"
          >
            <AccordionPrimitive.Header>
              {/*
                Radix renders Header as an <h3>, whose em-based tracking resolves
                against its own 32px font-size and then inherits down as an
                absolute px value — far too tight for this 17px trigger. Set the
                tracking explicitly so it is measured against the trigger's size.
              */}
              <AccordionPrimitive.Trigger className="flex w-full items-start justify-between gap-5 px-6 py-5 text-left font-display text-[1.0625rem] font-semibold leading-snug tracking-[-0.012em] text-foreground transition-colors hover:text-brand">
                {question}
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border transition-all duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:border-brand group-data-[state=open]:bg-brand group-data-[state=open]:text-white">
                  <Plus className="h-3.5 w-3.5" />
                </span>
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>

            <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
              <p className="text-muted-foreground px-6 pb-6 pr-14 leading-relaxed">{answer}</p>
            </AccordionPrimitive.Content>
          </AccordionPrimitive.Item>
        </Reveal>
      );
    })}
  </AccordionPrimitive.Root>
);

export default FaqAccordion;
