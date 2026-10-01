"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { testimonials, testimonialsSectionCopy } from "@/data/testimonials";
import { SectionHeader } from "@/components/zen/section-header";
import { Reveal } from "@/components/zen/reveal";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/zen/icons";

export function Testimonials() {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const current = testimonials[index];
  const total = testimonials.length;

  const go = (direction: -1 | 1) => {
    setIndex((value) => (value + direction + total) % total);
  };

  return (
    <section
      id="client-perspectives"
      aria-labelledby="testimonials-heading"
      className="relative w-full overflow-hidden bg-zen-bg-to px-0 pb-24 pt-20 text-zen-ink sm:pb-28 sm:pt-24 lg:pb-36 lg:pt-28"
    >
      <div className="mx-auto w-full max-w-[1480px] px-5 sm:px-10 xl:px-16">
        <SectionHeader
          index="05"
          eyebrow={testimonialsSectionCopy.eyebrow}
          eyebrowSub={testimonialsSectionCopy.eyebrowSub}
          title={
            <>
              <span className="block">THE BRIEF CHANGES.</span>
              <span className="block">THE PRINCIPLE DOESN&apos;T.</span>
            </>
          }
          titleId="testimonials-heading"
          description={testimonialsSectionCopy.description}
        />

        <Reveal delay={0.12}>
          <div className="mt-12 border-y border-zen-line sm:mt-14" aria-label="Project perspective carousel">
            <div className="grid lg:grid-cols-[minmax(0,1fr)_18rem]">
              <div className="min-h-[21rem] border-b border-zen-line px-0 py-9 sm:min-h-[23rem] sm:py-12 lg:border-b-0 lg:border-r lg:px-10 lg:py-14">
                <div aria-live="polite">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zen-accent">
                    {current.index} / {String(total).padStart(2, "0")} · COMMON BRIEF
                  </p>

                  <motion.p
                    key={current.index}
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-8 max-w-4xl font-display text-2xl font-medium leading-[1.1] tracking-tight text-zen-ink sm:text-4xl lg:text-5xl"
                  >
                    {current.brief}
                  </motion.p>

                  <div className="mt-10 grid gap-7 sm:grid-cols-2">
                    <div className="border-t border-zen-line pt-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zen-muted">
                        PRINCIPLE
                      </p>
                      <p className="mt-2 max-w-sm text-sm leading-relaxed text-zen-ink/90 sm:text-base">
                        {current.principle}
                      </p>
                    </div>
                    <div className="border-t border-zen-line pt-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zen-muted">
                        RESPONSE
                      </p>
                      <p className="mt-2 max-w-sm text-sm leading-relaxed text-zen-muted sm:text-base">
                        {current.response}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <aside className="flex flex-col justify-between p-6 sm:p-8">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zen-muted">
                    FIELD NOTE
                  </p>
                  <div className="mt-5 h-px w-12 bg-zen-accent" aria-hidden="true" />
                </div>
                <div className="mt-10 flex items-center justify-between gap-5 lg:mt-0">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      aria-label="Previous perspective"
                      onClick={() => go(-1)}
                      className="inline-flex h-11 w-11 cursor-pointer items-center justify-center border border-zen-line text-zen-muted transition-colors hover:border-zen-accent/40 hover:text-zen-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zen-accent"
                    >
                      <ArrowLeftIcon width={17} height={17} />
                    </button>
                    <button
                      type="button"
                      aria-label="Next perspective"
                      onClick={() => go(1)}
                      className="inline-flex h-11 w-11 cursor-pointer items-center justify-center border border-zen-line text-zen-muted transition-colors hover:border-zen-accent/40 hover:text-zen-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zen-accent"
                    >
                      <ArrowRightIcon width={17} height={17} />
                    </button>
                  </div>

                  <div className="text-right font-mono text-[10px] uppercase tracking-[0.16em] text-zen-muted/70">
                    Manual · no auto-play
                  </div>
                </div>
              </aside>
            </div>

            <div className="grid grid-cols-4 border-t border-zen-line sm:grid-cols-4" aria-label="Perspective selector">
              {testimonials.map((item, i) => (
                <button
                  key={item.index}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show perspective ${item.index}`}
                  aria-current={i === index}
                  className="border-r border-zen-line px-4 py-4 text-left last:border-r-0 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-zen-accent sm:px-6"
                >
                  <span className={`block h-1 w-full ${i === index ? "bg-zen-accent" : "bg-zen-line"}`} />
                  <span className={`mt-3 block font-mono text-[10px] tracking-[0.14em] ${i === index ? "text-zen-accent" : "text-zen-muted/60"}`}>
                    {item.index}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
