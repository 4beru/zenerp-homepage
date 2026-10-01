"use client";

import { useState } from "react";
import { faqs, faqSectionCopy } from "@/data/faq";
import { siteConfig } from "@/lib/site-config";
import { SectionHeader } from "@/components/zen/section-header";
import { Reveal } from "@/components/zen/reveal";
import { ArrowRightIcon, MailIcon } from "@/components/zen/icons";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative w-full overflow-hidden bg-zen-bg px-0 pb-24 pt-20 text-zen-ink sm:pb-28 sm:pt-24 lg:pb-36 lg:pt-28"
    >
      <div className="mx-auto w-full max-w-[1480px] px-5 sm:px-10 xl:px-16">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeader
              index="08"
              eyebrow={faqSectionCopy.eyebrow}
              eyebrowSub={faqSectionCopy.eyebrowSub}
              title={
                <>
                  <span className="block">WHAT PEOPLE</span>
                  <span className="block">ASK BEFORE</span>
                  <span className="block">STARTING.</span>
                </>
              }
              titleId="faq-heading"
              description={faqSectionCopy.description}
              bordered={false}
            />

            <Reveal delay={0.1}>
              <div className="mt-10 border-t border-zen-line pt-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zen-muted">
                  STILL HAVE A QUESTION?
                </p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group mt-4 inline-flex items-center gap-2.5 text-sm font-medium text-zen-ink transition-colors hover:text-zen-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zen-accent"
                >
                  <MailIcon width={16} height={16} className="text-zen-accent" />
                  {siteConfig.email}
                  <ArrowRightIcon width={14} height={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="border-t border-zen-line">
              {faqs.map((item, index) => {
                const open = openIndex === index;
                const answerId = `faq-answer-${index}`;
                const triggerId = `faq-trigger-${index}`;
                return (
                  <div key={item.question} className="border-b border-zen-line">
                    <button
                      id={triggerId}
                      type="button"
                      aria-expanded={open}
                      aria-controls={answerId}
                      onClick={() => setOpenIndex(open ? null : index)}
                      className="group flex w-full cursor-pointer items-start gap-5 py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-zen-accent sm:py-7"
                    >
                      <span className="pt-0.5 font-mono text-[10px] tracking-[0.16em] text-zen-accent/80">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 font-display text-lg font-medium tracking-tight text-zen-ink transition-colors group-hover:text-zen-accent sm:text-xl">
                        {item.question}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`mt-1 flex h-5 w-5 items-center justify-center border border-zen-line font-mono text-xs text-zen-muted transition-transform duration-300 ${open ? "rotate-45 border-zen-accent/40 text-zen-accent" : ""}`}
                      >
                        +
                      </span>
                    </button>
                    <div
                      id={answerId}
                      role="region"
                      aria-labelledby={triggerId}
                      hidden={!open}
                      className="pb-7 pl-9 sm:pl-10"
                    >
                      <p className="max-w-2xl border-l border-zen-accent/30 pl-5 text-sm leading-relaxed text-zen-muted sm:text-base">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
