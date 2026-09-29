"use client";

import { philosophyQuote, principles } from "@/data/philosophy";
import { philosophyIcons, LotusIcon } from "@/components/zen/icons";
import { SectionHeading } from "@/components/zen/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/zen/reveal";

/**
 * Filosofía: layout editorial a dos columnas — a la izquierda el manifiesto
 * (quote grande, sticky en desktop), a la derecha los principios en lista con
 * divisores finos. Distinto del grid de cards: más texto, más aire.
 */
export function Philosophy() {
  return (
    <section
      id="filosofia"
      aria-labelledby="filosofia-title"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      {/* Glow inferior tenue, distinto de las demás secciones */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(46% 30% at 50% 100%, rgba(255,171,145,0.05), transparent 72%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            index="06"
            eyebrow="Filosofía"
            title={
              <span id="filosofia-title">
                Menos ruido, <span className="text-zen-accent">más software.</span>
              </span>
            }
            description="Zen no es una pose: es la forma en que construimos. Cuatro principios que sostenemos en cada decisión."
          />
        </Reveal>

        <div className="mt-14 lg:mt-20 lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* Manifiesto: quote grande */}
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <figure className="relative rounded-2xl">
              <LotusIcon
                aria-hidden
                className="text-zen-accent/50"
                width={26}
                height={26}
              />
              <blockquote className="mt-5 text-3xl leading-snug font-medium tracking-tight text-balance text-zen-ink sm:text-4xl">
                “{philosophyQuote}”
              </blockquote>
              <figcaption className="mt-5 text-sm leading-relaxed text-zen-muted">
                Ese es el estándar: cuando un sistema funciona de verdad, la
                gente deja de pensar en él. El stock cierra, las facturas
                salen, los repartos llegan — y vos te dedicás a tu negocio.
              </figcaption>
            </figure>
          </Reveal>

          {/* Principios: lista editorial con divisores */}
          <RevealGroup as="ul" className="mt-12 lg:mt-0" stagger={0.12}>
            {principles.map((p, i) => {
              const Icon = philosophyIcons[p.icon];
              return (
                <RevealItem as="li" key={p.title}>
                  <div className="group flex gap-5 border-t border-zen-line/70 py-7 transition-colors duration-300 first:border-t-0 first:pt-0 hover:border-zen-accent/25 sm:gap-6 lg:first:pt-0 lg:first:border-t-0">
                    {/* Índice + ícono */}
                    <div className="flex flex-col items-center gap-3">
                      <span
                        aria-hidden
                        className="font-mono text-xs text-zen-muted/50"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-zen-accent/20 bg-zen-accent-soft text-zen-accent transition-all duration-300 group-hover:scale-105 group-hover:border-zen-accent/40">
                        <Icon width={20} height={20} />
                      </span>
                    </div>
                    {/* Texto */}
                    <div className="pt-4">
                      <h3 className="text-lg font-semibold text-zen-ink">
                        {p.title}
                      </h3>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-zen-muted">
                        {p.description}
                      </p>
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
