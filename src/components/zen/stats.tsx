import { stats, statsSectionCopy } from "@/data/stats";
import { SectionHeader } from "@/components/zen/section-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/zen/reveal";

export function Stats() {
  return (
    <section
      id="at-a-glance"
      aria-labelledby="stats-heading"
      className="relative w-full overflow-hidden bg-zen-bg px-0 pb-24 pt-20 text-zen-ink sm:pb-28 sm:pt-24 lg:pb-36 lg:pt-28"
    >
      <div className="mx-auto w-full max-w-[1480px] px-5 sm:px-10 xl:px-16">
        <SectionHeader
          index="04"
          eyebrow={statsSectionCopy.eyebrow}
          eyebrowSub={statsSectionCopy.eyebrowSub}
          title={
            <>
              <span className="block">A FEW FACTS</span>
              <span className="block">ABOUT THE SYSTEM.</span>
            </>
          }
          titleId="stats-heading"
          description={statsSectionCopy.description}
        />

        <RevealGroup
          as="div"
          className="mt-12 grid gap-0 border-t border-l border-zen-line sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.08}
        >
          {stats.map((stat) => (
            <RevealItem key={stat.label} className="border-b border-r border-zen-line p-6 sm:p-7 lg:min-h-64 lg:p-8">
              <div className="flex h-full flex-col justify-between gap-10">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-6xl font-bold leading-none tracking-[-0.04em] text-zen-ink sm:text-7xl">
                      {stat.value}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.14em] text-zen-accent">
                      {stat.unit}
                    </span>
                  </div>
                  <h3 className="mt-8 font-display text-lg font-semibold uppercase tracking-tight text-zen-ink">
                    {stat.label}
                  </h3>
                </div>
                <p className="max-w-xs text-sm leading-relaxed text-zen-muted">
                  {stat.detail}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
