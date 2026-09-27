"use client";

import { useRef } from "react";
import { values } from "@/data/values";
import { valueIcons } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Logo } from "@/components/logo";
import { LotusMark } from "@/components/motion/lotus-mark";
import { useReveal } from "@/lib/motion/use-reveal";

/** Por qué Zen ERP: el significado del loto + 3 valores (reemplaza al "equipo"). */
export function Philosophy() {
  const rootRef = useRef<HTMLElement>(null);
  useReveal(rootRef, { staggerSelector: "[data-stagger]", start: "top 78%" });

  return (
    <section ref={rootRef} id="filosofia" aria-labelledby="filosofia-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <Reveal>
            <SectionHeading
              index="04"
              eyebrow="Por qué Zen ERP"
              title={
                <span id="filosofia-title">
                  Nuestro logo es una flor de loto, y no es decoración
                </span>
              }
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
              <p>
                El loto crece en el agua más tranquila y se adapta al espacio que
                tiene. Eso es exactamente lo que buscamos con el software que
                construimos: que sea simple, que ordene en vez de complicar, y
                que se amolde a tu negocio — nunca al revés.
              </p>
              <p>
                Somos un estudio chico, dos personas que trabajan codo a codo con
                cada cliente. Sin capas, sin intermediarios: hablás con quienes
                diseñan y escriben el sistema que vas a usar todos los días.
              </p>
            </div>
            {/* El símbolo de la marca, dibujándose en calma */}
            <div className="mt-8 flex items-center gap-5">
              <LotusMark size={92} />
              <p className="text-sm text-muted">
                Trazo fino, sin apuro: así trabajamos también.
              </p>
            </div>
            <p className="mt-8">
              <a
                href="#contacto"
                className="link-accent font-medium text-accent"
              >
                Conocernos en una charla corta →
              </a>
            </p>
          </Reveal>

          <ul className="space-y-5">
            {values.map((v) => {
              const Icon = valueIcons[v.icon];
              return (
                <Reveal key={v.title} group>
                  <li data-stagger className="card-hover glass-card flex gap-5 rounded-2xl p-6">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Icon width={22} height={22} />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-ink">{v.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">
                        {v.description}
                      </p>
                    </div>
                  </li>
                </Reveal>
              );
            })}
            <Reveal group>
              <li data-stagger className="flex items-center gap-3 px-2 pt-2 text-xs text-muted">
                <Logo size={22} />
                Simple como el loto. Sólido como un sistema en producción.
              </li>
            </Reveal>
          </ul>
        </div>
      </div>
    </section>
  );
}
