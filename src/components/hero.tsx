"use client";

import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { LotusIcon } from "@/components/icons";
import { useHeroMotion } from "@/lib/motion/use-hero-motion";

// El JS de animación (GSAP + canvas) llega en hidratación, después del primer
// paint: el texto del hero es estático en el HTML y no compite con el LCP.
const AmbientBg = lazy(() =>
  import("@/components/motion/ambient-bg").then((m) => ({ default: m.AmbientBg }))
);
const LotusMark = lazy(() =>
  import("@/components/motion/lotus-mark").then((m) => ({ default: m.LotusMark }))
);

function AfterPaint({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);
  if (!ready) return null;
  return <Suspense fallback={null}>{children}</Suspense>;
}

/** Hero: titular corto (ángulo zen) + subtítulo + dos CTAs + loto animado. */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  useHeroMotion(ref);

  return (
    <section
      ref={ref}
      aria-label="Presentación"
      className="relative overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-32"
    >
      <AfterPaint>
        <AmbientBg />
      </AfterPaint>

      <div data-hero-content className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p data-hero-item className="flex items-center gap-2 text-sm text-muted">
            <LotusIcon className="text-accent" width={18} height={18} />
            Desarrollo a medida · Odoo · ERPNext
          </p>

          <h1
            data-hero-item
            className="mt-6 max-w-3xl text-4xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-6xl"
          >
            Software en calma,
            <br />
            <span className="text-accent">hecho a tu medida.</span>
          </h1>

          <p
            data-hero-item
            className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted"
          >
            Construimos aplicaciones web, mobile y desktop e implementamos
            sistemas de gestión —un ERP es el software que ordena ventas, stock,
            facturación y administración en un solo lugar— adaptados a cómo
            funciona tu negocio, no al revés.
          </p>

          <div data-hero-item className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contacto"
              className="btn-primary rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-[#1a1210]"
            >
              Hablemos de tu proyecto
            </a>
            <a
              href="#proyectos"
              className="btn-secondary rounded-full border border-line bg-surface/60 px-7 py-3.5 text-base font-medium text-ink"
            >
              Ver proyectos
            </a>
          </div>

          {/* Dato real destacado, sin hype */}
          <p data-hero-item className="mt-14 flex items-baseline gap-3 text-sm text-muted">
            <span className="text-2xl font-semibold text-accent">3</span>
            sistemas ERP que construimos hoy están en producción, todos los días,
            en negocios reales.
          </p>
        </div>

        {/* Loto dibujándose — el símbolo de la marca como protagonista */}
        <div data-hero-item className="hidden justify-center lg:flex">
          <AfterPaint>
            <LotusMark size={300} />
          </AfterPaint>
        </div>
      </div>
    </section>
  );
}
