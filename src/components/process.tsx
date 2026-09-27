"use client";

import { useRef } from "react";
import { steps } from "@/data/process";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { LotusDivider } from "@/components/motion/lotus-divider";
import { usePinnedSteps } from "@/lib/motion/use-pinned-steps";

/**
 * "Cómo trabajamos" con scroll storytelling: en desktop el panel se pinea y
 * el paso activo se resalta a medida que avanzás (scrub). En mobile o con
 * prefers-reduced-motion es una grilla normal que revela cada paso al pasar.
 */
export function Process() {
  const panelRef = useRef<HTMLDivElement>(null);
  usePinnedSteps(panelRef, "[data-step]", "[data-step-progress]");

  return (
    <section id="proceso" aria-labelledby="proceso-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            index="02"
            eyebrow="Cómo trabajamos"
            title={<span id="proceso-title">Un proceso claro, sin sorpresas</span>}
            description="Del primer diálogo al sistema funcionando. Sabés en qué etapa estás y qué viene después."
          />
        </Reveal>

        {/* Columna de progreso (solo desktop; adorna el panel pineado) */}
        <div ref={panelRef} className="relative mt-14 lg:flex lg:items-stretch lg:gap-10">
          <div aria-hidden className="hidden w-px shrink-0 self-stretch bg-line lg:block">
            <div data-step-progress className="h-1/4 w-full origin-top scale-y-0 bg-accent transition-transform duration-500 ease-out" />
            <div data-step-progress className="h-1/4 w-full origin-top scale-y-0 bg-accent transition-transform duration-500 ease-out" />
            <div data-step-progress className="h-1/4 w-full origin-top scale-y-0 bg-accent transition-transform duration-500 ease-out" />
            <div data-step-progress className="h-1/4 w-full origin-top scale-y-0 bg-accent transition-transform duration-500 ease-out" />
          </div>

          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, i) => (
              <li
                key={step.title}
                data-step
                data-active={i === 0 ? "true" : "false"}
                className="glass-card step-card relative h-full rounded-2xl p-6 pt-9"
              >
                <span
                  aria-hidden
                  className="absolute top-4 left-6 text-3xl font-semibold text-accent/25"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <Reveal>
          <p className="mt-10 text-sm text-muted">
            El primer paso es gratis y sin compromiso:{" "}
            <a href="#contacto" className="link-accent font-medium text-accent">
              agendá una charla de 15 minutos →
            </a>
          </p>
        </Reveal>
      </div>

      <LotusDivider />
    </section>
  );
}
