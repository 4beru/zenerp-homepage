"use client";

import { useCountUp } from "@/hooks/use-count-up";
import { RevealGroup, RevealItem } from "@/components/zen/reveal";

/**
 * Métricas del compromiso (banda sin numeración, entre Proyectos y
 * Testimonios): números que cuentan al entrar al viewport. No son métricas
 * de clientes inventadas — son promesas verificables del estudio (tiempos,
 * caminos, propiedad). Con reduced-motion los valores se muestran directos.
 */

type Stat = {
  /** Valor numérico que cuenta. */
  value: number;
  /** Unidad corta al lado del número (coral, mono). */
  suffix: string;
  /** Lectura completa para lectores de pantalla. */
  full: string;
  label: string;
  detail: string;
};

const STATS: Stat[] = [
  {
    value: 15,
    suffix: "min",
    full: "15 minutos",
    label: "Primera charla",
    detail: "sin cargo ni compromiso",
  },
  {
    value: 3,
    suffix: "caminos",
    full: "3 caminos posibles",
    label: "Para tu proyecto",
    detail: "Odoo, ERPNext o desarrollo a medida",
  },
  {
    value: 24,
    suffix: "h",
    full: "24 horas máximo",
    label: "Tiempo de respuesta",
    detail: "en días hábiles",
  },
  {
    value: 100,
    suffix: "%",
    full: "100 por ciento tuyo",
    label: "Tu código y tus datos",
    detail: "siempre tuyos, sin rehenes",
  },
];

function StatCell({ stat, index }: { stat: Stat; index: number }) {
  const { ref, value } = useCountUp(stat.value, {
    duration: 1400,
    delay: 140 * index,
    startOnView: true,
  });

  return (
    <RevealItem className="lg:px-10 lg:first:pl-0 lg:last:pr-0">
      <div className="flex flex-col">
        <dd className="order-1 flex items-baseline gap-2">
          <span className="sr-only">{stat.full}. </span>
          <span aria-hidden="true" className="flex items-baseline gap-1.5">
            <span
              ref={ref}
              className="text-5xl font-semibold tracking-tight text-zen-ink tabular-nums sm:text-6xl"
            >
              {value}
            </span>
            <span className="font-mono text-base text-zen-accent sm:text-lg">
              {stat.suffix}
            </span>
          </span>
        </dd>
        <dt className="order-2 mt-3 text-sm font-semibold text-zen-ink">
          {stat.label}
        </dt>
        <p className="order-3 mt-1 text-xs leading-relaxed text-zen-muted">
          {stat.detail}
        </p>
      </div>
    </RevealItem>
  );
}

export function Stats() {
  return (
    <section
      aria-label="Zen en números: el compromiso"
      className="relative py-14 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <RevealGroup
          as="div"
          stagger={0.1}
          className="glass-card rounded-3xl px-6 py-10 sm:px-10 sm:py-12 lg:px-12"
        >
          {/* Kicker centrado con filos de hairline a los lados */}
          <RevealItem className="mb-10 flex items-center justify-center gap-4">
            <span
              aria-hidden
              className="h-px w-10 bg-gradient-to-r from-transparent to-zen-line sm:w-16"
            />
            <p className="font-mono text-[11px] tracking-[0.32em] text-zen-accent/80">
              EL COMPROMISO
            </p>
            <span
              aria-hidden
              className="h-px w-10 bg-gradient-to-l from-transparent to-zen-line sm:w-16"
            />
          </RevealItem>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:divide-x lg:divide-zen-line/60">
            {STATS.map((stat, i) => (
              <StatCell key={stat.label} stat={stat} index={i} />
            ))}
          </dl>
        </RevealGroup>
      </div>
    </section>
  );
}
