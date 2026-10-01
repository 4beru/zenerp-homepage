"use client";

import { useCountUp } from "@/hooks/use-count-up";
import { stats, statsSectionCopy } from "@/data/stats";
import { Reveal, RevealGroup, RevealItem } from "@/components/zen/reveal";

function StatCell({
  stat,
  index,
}: {
  stat: (typeof stats)[number];
  index: number;
}) {
  const { ref, value } = useCountUp(stat.value, {
    duration: 1400,
    delay: 140 * index,
    startOnView: true,
  });

  return (
    <RevealItem className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
      <dl className="flex flex-col border-t border-[#EEE8D5]/[0.08] pt-6 first:border-t-0 first:pt-0 lg:border-t-0 lg:border-l lg:border-l-[#EEE8D5]/[0.08] lg:pt-0 lg:pl-8 lg:first:border-l-0 lg:first:pl-0">
        <dt className="order-2 mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[#839496]">
          {stat.label}
        </dt>
        <dd className="order-1 flex items-baseline gap-2">
          <span className="sr-only">{stat.full}. </span>
          <span aria-hidden="true" className="flex items-baseline gap-2">
            <span
              ref={ref}
              className="font-display text-5xl font-bold tracking-tight text-[#EEE8D5] tabular-nums sm:text-6xl lg:text-7xl"
            >
              {value}
            </span>
            <span className="font-mono text-base text-[#CB4B16] sm:text-lg">
              {stat.suffix}
            </span>
          </span>
        </dd>
        <p className="order-3 mt-2 text-sm leading-relaxed text-[#839496]/80">
          {stat.detail}
        </p>
      </dl>
    </RevealItem>
  );
}

export function Stats() {
  return (
    <section
      id="stats"
      aria-labelledby="stats-heading"
      className="relative w-full overflow-hidden bg-[#050505] px-0 pb-24 pt-20 text-[#EEE8D5] sm:pb-28 sm:pt-24 lg:pb-36 lg:pt-28"
    >
      <div className="relative mx-auto w-full max-w-[1480px] px-5 sm:px-10 xl:px-16">
        <header className="border-b border-[#EEE8D5]/[0.08] pb-10 sm:pb-14">
          <Reveal>
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <span className="h-1.5 w-1.5 bg-[#CB4B16]" aria-hidden="true" />
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#839496] sm:text-xs">
                {statsSectionCopy.eyebrow}
              </p>
              <span
                className="hidden font-mono text-xs text-[#839496]/40 sm:inline"
                aria-hidden="true"
              >
                ·
              </span>
              <span className="hidden font-mono text-xs tracking-wider text-[#839496]/70 sm:inline">
                {statsSectionCopy.eyebrowSub}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              id="stats-heading"
              className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-[#EEE8D5] text-balance"
            >
              {statsSectionCopy.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#839496] sm:text-lg">
              {statsSectionCopy.description}
            </p>
          </Reveal>
        </header>

        <RevealGroup
          as="div"
          stagger={0.12}
          className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-0 sm:mt-14"
        >
          {stats.map((stat, i) => (
            <StatCell key={stat.label} stat={stat} index={i} />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
