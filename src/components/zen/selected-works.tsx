"use client";

import { selectedWorks } from "@/data/works";
import { ImageReveal } from "@/components/zen/image-reveal";
import { useLeadDialog } from "@/lib/store/lead-dialog";

/**
 * Zen ERP — Selected Works
 *
 * Clean, natural vertical responsive grid layout.
 * No GSAP ScrollTrigger pinning or horizontal scroll interception,
 * ensuring standard continuous vertical scroll after Services.
 */
export function SelectedWorks() {
  const openDialog = useLeadDialog((s) => s.openDialog);

  return (
    <section
      id="works"
      aria-labelledby="works-heading"
      className="relative w-full overflow-hidden bg-[#0C1011] pb-24 pt-20 text-[#EEE8D5] sm:pb-32 sm:pt-28"
    >
      {/* Background architectural coordinate grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(238, 232, 213, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(238, 232, 213, 0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1480px] px-5 sm:px-10 xl:px-16">
        <header className="flex flex-col justify-between gap-6 border-b border-[#EEE8D5]/[0.08] pb-10 sm:pb-14 lg:flex-row lg:items-end">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 bg-[#CB4B16]" aria-hidden="true" />
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#839496] sm:text-xs">
                PROVEN ARCHITECTURE · SELECTED WORK
              </p>
            </div>

            <h2
              id="works-heading"
              className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-tight text-[#EEE8D5]"
            >
              SYSTEMS IN PRODUCTION.
            </h2>
          </div>

          <div className="flex flex-col items-start gap-3 lg:items-end">
            <p className="max-w-md text-sm text-[#839496] sm:text-base">
              Software built to order. Each deployment solves a distinct bottleneck with measurable operational impact.
            </p>
          </div>
        </header>

        {/* Natural vertical responsive grid (2 columns on desktop) */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10 sm:mt-16">
          {selectedWorks.map((work) => (
            <article
              key={work.id}
              onClick={() => openDialog("works", work.title)}
              className="group relative flex cursor-pointer flex-col border border-[#EEE8D5]/[0.08] bg-[#0E1315] p-6 transition-all duration-300 hover:border-[#CB4B16]/50 hover:bg-[#12191B] sm:p-8"
            >
              {/* Image artifact header */}
              <div className="relative overflow-hidden">
                <ImageReveal
                  src={work.media.src}
                  alt={work.media.alt}
                  aspectRatio="16:9"
                  fallbackColor={work.media.fallbackColor}
                  title={work.title}
                  kicker={work.category}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  containerClassName="rounded-[2px]"
                />
              </div>

              {/* Work metadata & descriptor */}
              <div className="mt-6 flex flex-1 flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-[#839496]">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#CB4B16]">{work.number}</span>
                      <span>/</span>
                      <span className="uppercase tracking-widest">{work.category}</span>
                    </div>
                    <span className="text-[11px] text-[#839496]/60">{work.client}</span>
                  </div>

                  <h3 className="mt-3 font-display text-xl font-bold uppercase tracking-tight text-[#EEE8D5] sm:text-2xl group-hover:text-white">
                    {work.title}
                  </h3>

                  <p className="mt-3 text-xs leading-relaxed text-[#839496] sm:text-sm">
                    {work.descriptor}
                  </p>
                </div>

                <div className="mt-6 border-t border-[#EEE8D5]/[0.08] pt-5">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="font-mono text-xl font-bold tracking-tight text-[#CB4B16] sm:text-2xl">
                        {work.impactMetric}
                      </span>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-[#839496]">
                        {work.impactLabel}
                      </p>
                    </div>

                    <span className="font-mono text-xs font-semibold text-[#CB4B16] transition-transform duration-300 group-hover:translate-x-1">
                      Case study ↗
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
