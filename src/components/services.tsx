"use client";

import { useRef } from "react";
import { services } from "@/data/services";
import { serviceIcons, ArrowRightIcon } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { LotusDivider } from "@/components/motion/lotus-divider";
import { useReveal } from "@/lib/motion/use-reveal";

export function Services() {
  const rootRef = useRef<HTMLElement>(null);
  // Stagger de toda la grilla: las tarjetas no entran todas a la vez
  useReveal(rootRef, { staggerSelector: "[data-stagger]", start: "top 78%" });

  return (
    <section ref={rootRef} id="servicios" aria-labelledby="servicios-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            index="01"
            eyebrow="Servicios"
            title={<span id="servicios-title">Todo lo que tu negocio necesita, en un solo lugar</span>}
            description="Desde una app para tu equipo hasta un sistema completo de gestión. Elegís uno o combinamos varios."
          />
        </Reveal>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = serviceIcons[s.icon];
            return (
              <Reveal key={s.id} group className="h-full">
                <li data-stagger className="card-hover glass-card h-full rounded-2xl p-6">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icon width={22} height={22} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {s.description}
                  </p>
                </li>
              </Reveal>
            );
          })}
        </ul>

        {/* Salida clara de la sección */}
        <Reveal>
          <p className="mt-10 text-sm text-muted">
            ¿No sabés por cuál empezar?{" "}
            <a
              href="#contacto"
              className="link-accent inline-flex items-center gap-1 font-medium text-accent"
            >
              Contanos tu problema y lo definimos juntos <ArrowRightIcon width={16} height={16} />
            </a>
          </p>
        </Reveal>
      </div>

      {/* Respiro orgánico entre bloques de datos: loto lineal decorativo */}
      <LotusDivider />
    </section>
  );
}
