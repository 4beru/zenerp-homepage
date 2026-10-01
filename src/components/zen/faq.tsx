"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faqs, faqSectionCopy } from "@/data/faq";
import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/zen/reveal";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { ArrowRightIcon, MailIcon } from "@/components/zen/icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Faq() {
  const reduced = usePrefersReducedMotion();
  const [openItems, setOpenItems] = useState<string[]>([]);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative w-full overflow-hidden bg-[#050505] px-0 pb-24 pt-20 text-[#EEE8D5] sm:pb-28 sm:pt-24 lg:pb-36 lg:pt-28"
    >
      <div className="relative mx-auto w-full max-w-[1480px] px-5 sm:px-10 xl:px-16">
        <div className="lg:grid lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <header className="border-b border-[#EEE8D5]/[0.08] pb-10 sm:pb-14 lg:border-b-0 lg:pb-0">
              <Reveal>
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <span className="h-1.5 w-1.5 bg-[#CB4B16]" aria-hidden="true" />
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#839496] sm:text-xs">
                    {faqSectionCopy.eyebrow}
                  </p>
                  <span
                    className="hidden font-mono text-xs text-[#839496]/40 sm:inline"
                    aria-hidden="true"
                  >
                    ·
                  </span>
                  <span className="hidden font-mono text-xs tracking-wider text-[#839496]/70 sm:inline">
                    {faqSectionCopy.eyebrowSub}
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <h2
                  id="faq-heading"
                  className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-[#EEE8D5] text-balance"
                >
                  {faqSectionCopy.title.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h2>
              </Reveal>

              <Reveal delay={0.14}>
                <p className="mt-5 max-w-md text-base leading-relaxed text-[#839496] sm:text-lg">
                  {faqSectionCopy.description}
                </p>
              </Reveal>
            </header>

            <Reveal delay={0.2} className="lg:sticky lg:top-32 lg:mt-10">
              <div className="mt-10 border border-[#EEE8D5]/[0.08] bg-[#0E1315] p-6 lg:mt-0">
                <p className="text-base font-semibold text-[#EEE8D5]">
                  Still have questions?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#839496]">
                  If your question isn&apos;t here, write us and we&apos;ll
                  respond within one business day.
                </p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group mt-5 inline-flex items-center gap-2.5 border border-[#CB4B16]/40 bg-[#CB4B16]/10 px-4 py-2.5 text-sm font-medium text-[#CB4B16] transition-colors duration-200 hover:bg-[#CB4B16]/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CB4B16]"
                >
                  <MailIcon width={16} height={16} />
                  {siteConfig.email}
                  <ArrowRightIcon
                    width={14}
                    height={14}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="mt-12 lg:mt-0">
            <Accordion
              type="multiple"
              value={openItems}
              onValueChange={setOpenItems}
              className="flex flex-col"
            >
              {faqs.map((f, i) => (
                <AccordionItem
                  key={`faq-${i}`}
                  value={`faq-${i}`}
                  className="border-b border-[#EEE8D5]/[0.08] last:border-b-0"
                >
                  <AccordionTrigger className="group py-7 text-left hover:no-underline [&>svg]:h-4 [&>svg]:w-4">
                    <span className="flex items-baseline gap-5 text-left">
                      <span
                        aria-hidden="true"
                        className="font-mono text-xs tracking-[0.14em] text-[#CB4B16]/70"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-base font-medium text-[#EEE8D5] transition-colors duration-200 group-hover:text-[#CB4B16] sm:text-lg">
                        {f.question}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-7">
                    <AnimatePresence initial={false}>
                      <motion.div
                        initial={reduced ? false : { opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduced ? undefined : { opacity: 0, y: -8 }}
                        transition={{
                          duration: reduced ? 0 : 0.3,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <p className="max-w-xl border-l border-[#CB4B16]/25 pl-5 text-sm leading-relaxed text-[#839496] sm:pl-7 sm:text-base">
                          {f.answer}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
