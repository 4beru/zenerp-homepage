"use client";

import { useEffect, useRef, useState } from "react";
import { steps } from "@/data/process";
import { processIcons } from "@/components/zen/icons";
import { SectionHeader } from "@/components/zen/section-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/zen/reveal";
import { useLeadDialog } from "@/lib/store/lead-dialog";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const reduced = usePrefersReducedMotion();
  const openDialog = useLeadDialog((state) => state.openDialog);

  useEffect(() => {
    if (reduced) return;
    const root = sectionRef.current;
    if (!root) return;
    const stepEls = Array.from(root.querySelectorAll<HTMLElement>("[data-step]"));
    if (!stepEls.length) return;

    let raf = 0;
    const update = () => {
      const center = window.innerHeight * 0.55;
      const tops = stepEls.map((item) => item.getBoundingClientRect().top);
      let next = 0;
      tops.forEach((top, index) => {
        if (top <= center) next = index;
      });
      setActive(next);
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

  const current = reduced ? steps.length - 1 : active;
  const progress = reduced ? 1 : (active + 1) / steps.length;

  return (
    <section
      ref={sectionRef}
      id="proceso"
      aria-labelledby="approach-heading"
      className="relative w-full overflow-hidden bg-zen-bg-to px-0 pb-24 pt-20 text-zen-ink sm:pb-28 sm:pt-24 lg:pb-36 lg:pt-28"
    >
      <div className="mx-auto w-full max-w-[1480px] px-5 sm:px-10 xl:px-16">
        <SectionHeader
          index="03"
          eyebrow="APPROACH"
          eyebrowSub="A CLEAR PATH FROM PROBLEM TO PRODUCTION"
          title={
            <>
              <span className="block">A CLEAR PROCESS,</span>
              <span className="block">WITHOUT THE MYSTERY.</span>
            </>
          }
          titleId="approach-heading"
          description="From the first conversation to a working system. The important decisions stay visible as the project moves."
        />

        <RevealGroup
          as="ul"
          className="relative mt-12 grid gap-0 border-t border-l border-zen-line sm:mt-14 lg:grid-cols-4"
          stagger={0.08}
        >
          {steps.map((step, index) => {
            const Icon = processIcons[step.icon];
            const isActive = reduced || index === current;
            return (
              <RevealItem as="li" key={step.title} className="h-full border-b border-r border-zen-line">
                <div
                  data-step
                  data-active={isActive}
                  className="group relative flex h-full min-h-80 flex-col p-6 transition-colors duration-300 hover:bg-zen-surface sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.16em] text-zen-muted/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`flex h-10 w-10 items-center justify-center border transition-colors duration-300 ${
                        isActive ? "border-zen-accent/50 text-zen-accent" : "border-zen-line text-zen-muted/50"
                      }`}
                      aria-hidden="true"
                    >
                      <Icon width={18} height={18} />
                    </span>
                  </div>

                  <div className="mt-auto">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-zen-accent">
                      {step.kicker}
                    </p>
                    <h3 className="mt-3 font-display text-2xl font-semibold uppercase tracking-tight text-zen-ink">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-zen-muted sm:text-base">
                      {step.description}
                    </p>
                  </div>

                  <div className="absolute inset-x-6 bottom-0 h-px origin-left bg-zen-accent transition-transform duration-500 sm:inset-x-8" style={{ transform: `scaleX(${isActive ? 1 : 0})` }} />
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal delay={0.16}>
          <div className="mt-10 flex flex-col gap-4 border-t border-zen-line pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm leading-relaxed text-zen-muted">
              The first useful output is clarity about the problem and the shape of the work.
            </p>
            <button
              type="button"
              onClick={() => openDialog("approach")}
              className="inline-flex w-fit cursor-pointer items-center gap-2 border-b border-zen-accent/50 pb-1 text-sm font-medium text-zen-ink transition-colors hover:text-zen-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zen-accent"
            >
              Start a conversation →
            </button>
          </div>
        </Reveal>

        <div className="mt-7 h-px w-full bg-zen-line" aria-hidden="true">
          <div className="h-px origin-left bg-zen-accent/60 transition-transform duration-700" style={{ transform: `scaleX(${progress})` }} />
        </div>
      </div>
    </section>
  );
}
