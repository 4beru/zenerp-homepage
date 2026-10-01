"use client";

import {
  philosophyQuote,
  principles,
  philosophySectionCopy,
} from "@/data/philosophy";
import { Reveal, RevealGroup, RevealItem } from "@/components/zen/reveal";

export function Philosophy() {
  return (
    <section
      id="principles"
      aria-labelledby="principles-heading"
      className="relative w-full overflow-hidden bg-[#0C1011] px-0 pb-24 pt-20 text-[#EEE8D5] sm:pb-28 sm:pt-24 lg:pb-36 lg:pt-28"
    >
      <div className="relative mx-auto w-full max-w-[1480px] px-5 sm:px-10 xl:px-16">
        <header className="border-b border-[#EEE8D5]/[0.08] pb-10 sm:pb-14">
          <Reveal>
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <span className="h-1.5 w-1.5 bg-[#CB4B16]" aria-hidden="true" />
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#839496] sm:text-xs">
                {philosophySectionCopy.eyebrow}
              </p>
              <span
                className="hidden font-mono text-xs text-[#839496]/40 sm:inline"
                aria-hidden="true"
              >
                ·
              </span>
              <span className="hidden font-mono text-xs tracking-wider text-[#839496]/70 sm:inline">
                {philosophySectionCopy.eyebrowSub}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              id="principles-heading"
              className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-[#EEE8D5] text-balance"
            >
              {philosophySectionCopy.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#839496] sm:text-lg">
              {philosophySectionCopy.description}
            </p>
          </Reveal>
        </header>

        <div className="mt-14 lg:mt-20 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <figure className="relative">
              <span
                aria-hidden="true"
                className="block h-px w-16 bg-[#CB4B16]"
              />
              <blockquote className="mt-8 text-3xl font-medium leading-snug tracking-tight text-balance text-[#EEE8D5] sm:text-4xl lg:text-[2.75rem]">
                &ldquo;{philosophyQuote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 max-w-md text-sm leading-relaxed text-[#839496]">
                That is the standard: when a system actually works, people
                stop thinking about it. Stock closes, invoices go out,
                deliveries arrive—and you get back to running your business.
              </figcaption>
            </figure>
          </Reveal>

          <RevealGroup as="ul" className="mt-14 lg:mt-0" stagger={0.08}>
            {principles.map((p) => (
              <RevealItem as="li" key={p.title}>
                <div className="group border-t border-[#EEE8D5]/[0.08] py-8 transition-colors duration-300 first:border-t-0 first:pt-0 hover:border-[#CB4B16]/20 sm:py-10">
                  <div className="flex gap-6 sm:gap-8">
                    <span
                      aria-hidden="true"
                      className="mt-1 font-mono text-xs tracking-[0.14em] text-[#839496]/50"
                    >
                      {p.index}
                    </span>

                    <div className="flex-1">
                      <h3 className="font-display text-xl font-semibold tracking-tight text-[#EEE8D5] sm:text-2xl">
                        {p.title}
                      </h3>
                      <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#839496] sm:text-base">
                        {p.description}
                      </p>
                    </div>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
