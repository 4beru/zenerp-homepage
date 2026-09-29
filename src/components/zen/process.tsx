"use client";

import { useEffect, useRef, useState } from "react";
import { steps } from "@/data/process";
import { processIcons } from "@/components/zen/icons";
import { SectionHeading } from "@/components/zen/section-heading";
import { Reveal } from "@/components/zen/reveal";
import { LotusDivider } from "@/components/zen/lotus-divider";
import { useLeadDialog } from "@/lib/store/lead-dialog";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Scroll storytelling para "Cómo trabajamos": resalta el paso activo según la
 * posición del scroll (regla CSS-only sobre scrollY: robusta en cualquier
 * layout, sin pinneo). Con prefers-reduced-motion todo queda activo.
 * La línea de progreso del timeline crece con el índice activo.
 */
export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const reduced = usePrefersReducedMotion();
  const openDialog = useLeadDialog((s) => s.openDialog);

  useEffect(() => {
    if (reduced) return;
    const root = sectionRef.current;
    if (!root) return;
    const stepEls = Array.from(
      root.querySelectorAll<HTMLElement>("[data-step]")
    );
    if (stepEls.length === 0) return;

    let raf = 0;
    const update = () => {
      // Leer TODA la geometría primero (una pasada), escribir después:
      // evita intercalar lecturas de layout con renders que mutan estilos
      // (read-write-read = thrashing + estados rezagados).
      const center = window.innerHeight * 0.55;
      const tops = stepEls.map((s) => s.getBoundingClientRect().top);
      let current = 0;
      tops.forEach((top, i) => {
        if (top <= center) current = i;
      });
      setActive(current);
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

  const isActive = (i: number) => (reduced ? true : i === active);
  const progress = reduced ? 1 : (active + 1) / steps.length;

  return (
    <section
      ref={sectionRef}
      id="proceso"
      aria-labelledby="proceso-title"
      className="relative overflow-hidden py-20 sm:py-28"
    >
      {/* Glow decorativo (esquina opuesta a Servicios) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(38% 34% at 12% 78%, rgba(255,171,145,0.06), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            index="03"
            eyebrow="Cómo trabajamos"
            title={
              <span id="proceso-title">
                Un proceso claro, <span className="text-zen-accent">sin sorpresas.</span>
              </span>
            }
            description="Del primer diálogo al sistema funcionando. Sabés en qué etapa estás y qué viene después."
          />
        </Reveal>

        {/* Timeline con línea de progreso */}
        <div className="relative mt-14 lg:flex lg:items-stretch lg:gap-10">
          {/* Línea vertical: base + relleno coral según el paso activo */}
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-[15px] w-px bg-zen-line lg:relative lg:left-auto lg:block lg:w-px lg:shrink-0 lg:self-stretch"
          >
            <div
              className="h-full w-full origin-top bg-zen-accent/80 transition-transform duration-700 ease-out"
              style={{ transform: `scaleY(${progress})` }}
            />
          </div>

          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, i) => {
              const Icon = processIcons[step.icon];
              return (
                <li
                  key={step.title}
                  data-step
                  data-active={isActive(i) ? "true" : "false"}
                  className="step-card glass-card relative h-full rounded-2xl p-6 pt-12 pl-14 lg:pt-14 lg:pl-6"
                >
                  {/* Nodo del timeline (mobile: sobre la línea; desktop: chip de ícono) */}
                  <span
                    aria-hidden
                    className="step-node absolute top-5 left-[9px] flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-zen-accent/50 bg-zen-surface transition-all duration-500 lg:static lg:mb-5 lg:h-12 lg:w-12 lg:border-zen-accent/25"
                  >
                    <Icon
                      className="hidden text-zen-accent transition-transform duration-500 lg:block"
                      width={20}
                      height={20}
                    />
                  </span>

                  <span
                    aria-hidden
                    className="absolute top-5 right-6 font-mono text-xs text-zen-muted/50"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <h3 className="text-lg font-semibold text-zen-ink">
                    {step.title}
                  </h3>
                  <p className="mt-1.5">
                    <span className="inline-flex items-center rounded-full border border-zen-accent/20 bg-zen-accent-soft px-2.5 py-0.5 text-[11px] font-medium text-zen-accent/90">
                      {step.kicker}
                    </span>
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-zen-muted">
                    {step.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>

        <Reveal>
          <p className="mt-10 text-sm text-zen-muted">
            El primer paso es gratis y sin compromiso:{" "}
            <button
              type="button"
              onClick={() =>
                openDialog("proceso-agenda", "Charla inicial de 15 minutos")
              }
              className="link-accent cursor-pointer font-medium text-zen-accent"
            >
              agendá una charla de 15 minutos →
            </button>
          </p>
        </Reveal>
      </div>

      <LotusDivider />
    </section>
  );
}
