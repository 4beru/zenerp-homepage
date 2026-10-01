"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  services,
  servicesSectionCopy,
  type ServiceCategory,
} from "@/data/services";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useLeadDialog } from "@/lib/store/lead-dialog";

/**
 * Zen ERP — Services & Capabilities.
 *
 * Editorial capability register built from the Hero's visual language:
 * typography, hairlines, restrained surfaces, monospace metadata, and
 * terracotta interaction signals.
 */
export function Services() {
  const [activeFilter, setActiveFilter] = useState<ServiceCategory>("all");
  const openDialog = useLeadDialog((s) => s.openDialog);
  const reduced = usePrefersReducedMotion();

  const filteredServices = services.filter(
    (service) =>
      activeFilter === "all" || service.category === activeFilter,
  );

  const filterKeys: ServiceCategory[] = [
    "all",
    "products",
    "systems",
    "bespoke",
  ];

  const filterCounts: Record<ServiceCategory, number> = {
    all: services.length,
    products: services.filter((service) => service.category === "products").length,
    systems: services.filter((service) => service.category === "systems").length,
    bespoke: services.filter((service) => service.category === "bespoke").length,
  };

  return (
    <section
      id="servicios"
      aria-labelledby="services-heading"
      className="relative w-full overflow-hidden bg-[#050505] px-0 pb-28 pt-24 text-[#EEE8D5] sm:pb-36 sm:pt-32 lg:pb-44 lg:pt-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(238, 232, 213, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(238, 232, 213, 0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 30%, black 15%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 30%, black 15%, transparent 80%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1480px] px-5 sm:px-10 xl:px-16">
        <header className="border-b border-[#EEE8D5]/[0.08] pb-10 sm:pb-14 lg:pb-16">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <span className="h-1.5 w-1.5 bg-[#CB4B16]" aria-hidden="true" />
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#839496] sm:text-xs">
              {servicesSectionCopy.eyebrow}
            </p>
            <span
              className="hidden font-mono text-xs text-[#839496]/40 sm:inline"
              aria-hidden="true"
            >
              ·
            </span>
            <span className="hidden font-mono text-xs tracking-wider text-[#839496]/70 sm:inline">
              {servicesSectionCopy.eyebrowSub}
            </span>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-7">
              <h2
                id="services-heading"
                className="font-display text-[clamp(2.1rem,4.5vw,3.75rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-[#EEE8D5] text-balance"
              >
                {servicesSectionCopy.headline.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
            </div>

            <div className="flex flex-col justify-end lg:col-span-5 lg:pl-4">
              <p className="text-base leading-relaxed text-[#839496] sm:text-lg">
                {servicesSectionCopy.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#EEE8D5]/[0.08] pt-4 font-mono text-[11px] uppercase tracking-wider text-[#839496]/60 sm:text-xs">
                <span>6 service lines</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#CB4B16]">Built around real workflows</span>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 pt-6 sm:mt-12 md:flex-row md:items-end md:justify-between">
            <div
              role="group"
              aria-label="Filter services by category"
              className="flex flex-wrap gap-2"
            >
              {filterKeys.map((key) => {
                const isActive = activeFilter === key;

                return (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveFilter(key)}
                    className={[
                      "group relative inline-flex min-h-10 cursor-pointer items-center gap-2 border px-3.5 py-2 font-mono text-xs uppercase tracking-wider transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CB4B16] sm:px-4",
                      isActive
                        ? "border-[#CB4B16] bg-[#151C1E] text-[#EEE8D5]"
                        : "border-[#EEE8D5]/[0.08] text-[#839496] hover:border-[#EEE8D5]/20 hover:text-[#EEE8D5]",
                    ].join(" ")}
                  >
                    <span>{servicesSectionCopy.filterLabels[key]}</span>
                    <span
                      className={
                        isActive
                          ? "text-[#CB4B16]"
                          : "text-[#839496]/50 transition-colors group-hover:text-[#839496]"
                      }
                    >
                      [{String(filterCounts[key]).padStart(2, "0")}]
                    </span>
                    {isActive ? (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 left-0 h-[2px] w-full bg-[#CB4B16]"
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>

            <p
              aria-live="polite"
              className="font-mono text-[11px] uppercase tracking-wider text-[#839496]"
            >
              Showing {filteredServices.length} of {services.length} services
            </p>
          </div>
        </header>

        <div className="divide-y divide-[#EEE8D5]/[0.08] border-b border-[#EEE8D5]/[0.08]">
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredServices.map((service, index) => (
              <motion.article
                key={service.id}
                layout={!reduced}
                initial={reduced ? undefined : { opacity: 0, y: 14 }}
                animate={reduced ? undefined : { opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -10 }}
                transition={{
                  duration: 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative bg-transparent transition-colors duration-300 hover:bg-[#0E1315]/90 focus-within:bg-[#0E1315]/90"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-[3px] origin-left scale-x-0 bg-[#CB4B16] opacity-0 transition-[transform,opacity] duration-300 group-hover:scale-x-100 group-hover:opacity-100 group-focus-within:scale-x-100 group-focus-within:opacity-100"
                />

                <div className="grid grid-cols-1 gap-6 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-12 lg:items-start lg:gap-8 lg:px-8 lg:py-12">
                  <div className="flex items-start justify-between gap-4 lg:col-span-2 lg:flex-col lg:justify-between lg:space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-semibold tracking-wider text-[#CB4B16] sm:text-base">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="font-mono text-xs text-[#839496]/50"
                        aria-hidden="true"
                      >
                        /
                      </span>
                      <span className="font-mono text-xs uppercase tracking-wider text-[#839496]">
                        {service.categoryLabel}
                      </span>
                    </div>

                    <span className="font-mono text-[11px] tracking-wide text-[#839496]/60">
                      {service.tag}
                    </span>
                  </div>

                  <div className="lg:col-span-5">
                    <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-[#EEE8D5] sm:text-3xl">
                      {service.title}
                    </h3>

                    <p className="mt-4 text-sm leading-relaxed text-[#839496] sm:text-base">
                      {service.description}
                    </p>

                    <div className="mt-4 flex items-start gap-2 text-xs text-[#839496]/70">
                      <span className="mt-0.5 text-[#CB4B16]" aria-hidden="true">
                        ↳
                      </span>
                      <p>{service.operationalScope}</p>
                    </div>
                  </div>

                  <div className="border-t border-[#EEE8D5]/[0.06] pt-4 lg:col-span-3 lg:border-t-0 lg:pt-0">
                    <h4 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#839496]">
                      {servicesSectionCopy.deliverablesHeading}
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {service.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-xs leading-snug text-[#839496] transition-colors duration-200 group-hover:text-[#EEE8D5]/90"
                        >
                          <span
                            className="font-mono text-[#CB4B16]/70"
                            aria-hidden="true"
                          >
                            —
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col items-start gap-3 pt-2 lg:col-span-2 lg:items-end lg:pt-0">
                    <button
                      type="button"
                      onClick={() =>
                        openDialog("servicio-" + service.id, service.title)
                      }
                      className="group/cta inline-flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 border border-[#EEE8D5]/20 bg-[#151C1E] px-4 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-[#EEE8D5] transition-colors duration-300 hover:border-[#CB4B16] hover:bg-[#CB4B16] hover:text-[#050505] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CB4B16] sm:w-auto sm:px-5"
                    >
                      <span>{servicesSectionCopy.ctaAction}</span>
                      <span
                        className="font-mono text-base transition-transform duration-300 group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1"
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-16 pt-10 sm:mt-20 sm:pt-14">
          <div className="flex items-center gap-3">
            <span className="h-1 w-1 bg-[#CB4B16]" aria-hidden="true" />
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#839496]">
              {servicesSectionCopy.commitmentsHeading}
            </h3>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {servicesSectionCopy.commitments.map((commitment) => (
              <div
                key={commitment.number}
                className="group border-l border-[#EEE8D5]/[0.08] pl-5 transition-colors duration-200 hover:border-[#CB4B16]"
              >
                <span className="font-mono text-xs font-semibold text-[#CB4B16]">
                  {commitment.number}
                </span>
                <h4 className="mt-2 font-display text-base font-bold uppercase text-[#EEE8D5]">
                  {commitment.title}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-[#839496]">
                  {commitment.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 border border-[#EEE8D5]/[0.08] bg-[#0E1315] p-7 sm:mt-20 sm:p-10 lg:p-12">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-3xl">
              <span className="font-mono text-xs uppercase tracking-widest text-[#CB4B16]">
                {servicesSectionCopy.bottomBanner.tag}
              </span>
              <h3 className="mt-3 font-display text-xl font-bold uppercase tracking-tight text-[#EEE8D5] sm:text-2xl lg:text-3xl">
                {servicesSectionCopy.bottomBanner.headline}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#839496] sm:text-base">
                {servicesSectionCopy.bottomBanner.subtext}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                type="button"
                onClick={() =>
                  openDialog(
                    "servicios-custom-architecture",
                    "Bespoke Software & Custom Systems",
                  )
                }
                className="group/primary inline-flex min-h-11 cursor-pointer items-center gap-2.5 border border-[#CB4B16] bg-[#CB4B16] px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#050505] transition-colors duration-300 hover:bg-transparent hover:text-[#EEE8D5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CB4B16] sm:text-sm"
              >
                <span>{servicesSectionCopy.bottomBanner.primaryCta}</span>
                <span
                  className="transition-transform duration-300 group-hover/primary:translate-x-1 group-hover/primary:-translate-y-1"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </button>

              <a
                href="#proceso"
                className="group inline-flex min-h-10 items-center gap-2 py-2 font-mono text-xs uppercase tracking-wider text-[#839496] transition-colors hover:text-[#EEE8D5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CB4B16]"
              >
                <span>{servicesSectionCopy.bottomBanner.secondaryCta}</span>
                <span
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                  aria-hidden="true"
                >
                  ↓
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
