"use client";

import { services } from "@/data/services";
import { serviceIcons } from "@/components/zen/icons";
import { SectionHeading } from "@/components/zen/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/zen/reveal";
import { useLeadDialog } from "@/lib/store/lead-dialog";
import { ArrowRightIcon } from "@/components/zen/icons";

/**
 * Servicios: grid de tarjetas glass con ícono, chip de contexto y CTA
 * "Consultar" que abre el dialog de contacto con el tema precargado.
 */
export function Services() {
  const openDialog = useLeadDialog((s) => s.openDialog);

  return (
    <section
      id="servicios"
      aria-label="Servicios"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      {/* Decoración de fondo: glow terracota + textura de puntos sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(42% 38% at 85% 12%, rgba(255,171,145,0.07), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(245,241,237,0.05) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(70% 60% at 50% 30%, black, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(70% 60% at 50% 30%, black, transparent 75%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            index="02"
            eyebrow="Servicios"
            title={
              <>
                Lo que tu negocio necesita,{" "}
                <span className="text-zen-accent">sin fricción.</span>
              </>
            }
            description="Aplicaciones y sistemas de gestión que se adaptan a tu operación — no al revés. Elegí por dónde empezar:"
          />
        </Reveal>

        <RevealGroup
          as="ul"
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          stagger={0.08}
        >
          {services.map((s, i) => {
            const Icon = serviceIcons[s.icon];
            return (
              <RevealItem as="li" key={s.id} className="h-full">
                <article className="glass-card card-hover group relative flex h-full flex-col rounded-2xl p-6">
                  {/* Número de la esquina */}
                  <span
                    aria-hidden
                    className="absolute top-5 right-5 font-mono text-xs text-zen-muted/50 transition-colors duration-300 group-hover:text-zen-accent/70"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Chip de ícono */}
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-zen-accent/20 bg-zen-accent-soft text-zen-accent transition-all duration-300 group-hover:scale-105 group-hover:border-zen-accent/40"
                    style={{
                      background:
                        "linear-gradient(160deg, rgba(255,171,145,0.16), rgba(255,171,145,0.06))",
                    }}
                  >
                    <Icon width={22} height={22} />
                  </span>

                  <h3 className="mt-5 text-lg font-semibold text-zen-ink">
                    {s.title}
                  </h3>

                  {/* Chip de contexto */}
                  <p className="mt-2">
                    <span className="inline-flex items-center rounded-full border border-zen-line bg-zen-surface-raised/70 px-2.5 py-1 text-[11px] font-medium tracking-wide text-zen-muted">
                      {s.tag}
                    </span>
                  </p>

                  <p className="mt-4 flex-1 text-sm leading-relaxed text-zen-muted">
                    {s.description}
                  </p>

                  {/* CTA contextual */}
                  <div className="mt-6 border-t border-zen-line/60 pt-4">
                    <button
                      type="button"
                      onClick={() =>
                        openDialog(`servicio-${s.id}`, s.title)
                      }
                      className="link-accent group/cta inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-zen-ink/90"
                    >
                      Consultar
                      <ArrowRightIcon
                        className="text-zen-accent transition-transform duration-300 group-hover/cta:translate-x-1"
                        width={15}
                        height={15}
                      />
                    </button>
                  </div>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* Cierre de sección: salida suave hacia contacto */}
        <Reveal delay={0.1}>
          <p className="mt-14 flex flex-wrap items-center justify-center gap-2 text-center text-base text-zen-muted">
            ¿No sabés por dónde empezar?
            <button
              type="button"
              onClick={() => openDialog("servicios-cta")}
              className="link-accent cursor-pointer font-medium text-zen-accent"
            >
              Hablemos y lo descubrimos juntos
              <ArrowRightIcon
                className="ml-1 inline align-[-2px]"
                width={15}
                height={15}
              />
            </button>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
