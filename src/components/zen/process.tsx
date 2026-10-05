"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { steps } from "@/data/process";
import { mediaAssets } from "@/data/media";
import { processIcons } from "@/components/zen/icons";
import { SectionHeader } from "@/components/zen/section-header";
import { useLeadDialog } from "@/lib/store/lead-dialog";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const approachImages = [
  mediaAssets.approachDiagnosis,
  mediaAssets.approachScope,
  mediaAssets.approachBuild,
  mediaAssets.approachLaunch,
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const reduced = usePrefersReducedMotion();
  const openDialog = useLeadDialog((state) => state.openDialog);

  useEffect(() => {
    if (reduced) return;
    const root = sectionRef.current;
    if (!root) return;
    const stepEls = Array.from(root.querySelectorAll<HTMLElement>("[data-step-card]"));
    if (!stepEls.length) return;

    let raf = 0;
    const update = () => {
      const triggerLine = window.innerHeight * 0.45;
      let currentActive = 0;
      stepEls.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerLine) {
          currentActive = idx;
        }
      });
      setActive(currentActive);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  const activeMedia = approachImages[active] ?? approachImages[0];

  return (
    <section
      ref={sectionRef}
      id="proceso"
      aria-labelledby="approach-heading"
      style={
        {
          "--zen-bg": "#F0EBE6",
          "--zen-ink": "#201D1D",
          "--zen-muted": "#635E59",
          "--zen-line": "rgba(32, 29, 29, 0.12)",
          "--zen-surface": "#E7E0DA",
          "--zen-surface-raised": "#DFD7D0",
        } as React.CSSProperties
      }
      className="relative w-full overflow-hidden bg-[#F0EBE6] px-0 pb-28 pt-24 text-[#201D1D] transition-colors duration-500 sm:pb-36 sm:pt-32"
    >
      {/* Light architectural hairline pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(32, 29, 29, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(32, 29, 29, 0.05) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1480px] px-5 sm:px-10 xl:px-16">
        <SectionHeader
          index="03"
          eyebrow="APPROACH · LIGHT WORLD"
          eyebrowSub="CLEAR ARCHITECTURE · NO SURPRISES"
          title={
            <>
              <span className="block">A RIGOROUS PROCESS,</span>
              <span className="block">MADE VISIBLE.</span>
            </>
          }
          titleId="approach-heading"
          description="From the first diagnosis to a live deployment. The decisions, trade-offs, and technical commitments remain completely transparent."
        />

        {/* 2-Column interactive stage */}
        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Interactive Steps */}
          <div className="flex flex-col space-y-4 lg:col-span-7">
            {steps.map((step, index) => {
              const Icon = processIcons[step.icon];
              const isActive = index === active;

              return (
                <div
                  key={step.title}
                  data-step-card
                  onClick={() => setActive(index)}
                  onMouseEnter={() => setActive(index)}
                  className={`group relative flex cursor-pointer flex-col border p-6 transition-all duration-300 sm:p-8 ${
                    isActive
                      ? "border-[#CB4B16] bg-[#E7E0DA] shadow-sm"
                      : "border-[rgba(32,29,29,0.12)] bg-transparent hover:border-[rgba(32,29,29,0.3)] hover:bg-[#EAE3DC]"
                  }`}
                >
                  {/* Active indicator bar */}
                  <div
                    aria-hidden="true"
                    className={`absolute inset-y-0 left-0 w-1 bg-[#CB4B16] transition-transform duration-300 ${
                      isActive ? "scale-y-100" : "scale-y-0"
                    }`}
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 font-mono text-xs font-semibold tracking-wider text-[#CB4B16]">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <span className="text-[rgba(32,29,29,0.25)]">/</span>
                      <span className="uppercase text-[#635E59]">{step.kicker}</span>
                    </div>

                    <span
                      className={`flex h-9 w-9 items-center justify-center border transition-colors duration-200 ${
                        isActive
                          ? "border-[#CB4B16] text-[#CB4B16]"
                          : "border-[rgba(32,29,29,0.15)] text-[#635E59]"
                      }`}
                      aria-hidden="true"
                    >
                      <Icon width={17} height={17} />
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-xl font-bold uppercase tracking-tight text-[#201D1D] sm:text-2xl">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[#635E59] sm:text-base">
                    {step.description}
                  </p>

                  {/* Inline visual snippet for mobile viewports */}
                  <div className="mt-4 overflow-hidden rounded-[2px] lg:hidden">
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#DDD5CE]">
                      <Image
                        src={approachImages[index].src}
                        alt={approachImages[index].alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 400px"
                        referrerPolicy="no-referrer"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Editorial Image Canvas (Desktop) */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28 flex flex-col border border-[rgba(32,29,29,0.12)] bg-[#E7E0DA] p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-[rgba(32,29,29,0.1)] pb-3 font-mono text-[11px] uppercase tracking-wider text-[#635E59]">
                <span>STAGE VISUALIZATION</span>
                <span className="text-[#CB4B16]">
                  {String(active + 1).padStart(2, "0")} / 04
                </span>
              </div>

              {/* Dynamic Image Crossfade */}
              <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-[2px] bg-[#DDD5CE]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMedia.id}
                    initial={
                      reduced
                        ? { opacity: 1 }
                        : { opacity: 0, scale: 1.05 }
                    }
                    animate={
                      reduced
                        ? { opacity: 1 }
                        : { opacity: 1, scale: 1 }
                    }
                    exit={
                      reduced
                        ? { opacity: 1 }
                        : { opacity: 0, scale: 0.98 }
                    }
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative h-full w-full"
                  >
                    <Image
                      src={activeMedia.src}
                      alt={activeMedia.alt}
                      fill
                      sizes="500px"
                      priority={false}
                      referrerPolicy="no-referrer"
                      className="object-cover"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(32,29,29,0.6)] via-transparent to-transparent"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-4 flex flex-col justify-between">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#CB4B16]">
                  {activeMedia.title}
                </span>
                <p className="mt-1 font-mono text-[10px] text-[#635E59]">
                  {activeMedia.credit}
                </p>
              </div>

              <div className="mt-6 border-t border-[rgba(32,29,29,0.1)] pt-4">
                <button
                  type="button"
                  onClick={() => openDialog("approach", `Phase ${active + 1}: ${steps[active].title}`)}
                  className="group inline-flex w-full cursor-pointer items-center justify-between border border-[rgba(32,29,29,0.3)] bg-[#201D1D] px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-[#F0EBE6] transition-colors duration-200 hover:bg-[#CB4B16] hover:text-[#050505] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CB4B16]"
                >
                  <span>Initiate Diagnosis</span>
                  <span
                    className="transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom banner for Light World */}
        <div className="mt-14 flex flex-col gap-4 border-t border-[rgba(32,29,29,0.15)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-relaxed text-[#635E59]">
            The first useful output is absolute clarity about what needs to be built, with zero lock-in or licensing fees.
          </p>
          <button
            type="button"
            onClick={() => openDialog("approach-bottom")}
            className="inline-flex w-fit cursor-pointer items-center gap-2 border-b border-[#CB4B16] pb-1 text-sm font-semibold uppercase tracking-wide text-[#201D1D] transition-colors hover:text-[#CB4B16] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CB4B16]"
          >
            <span>Review Scope Specifications</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
