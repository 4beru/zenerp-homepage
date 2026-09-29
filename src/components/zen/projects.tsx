"use client";

import { projects, projectsDisclaimer } from "@/data/projects";
import { projectIcons, LotusIcon, ArrowRightIcon } from "@/components/zen/icons";
import { SectionHeading } from "@/components/zen/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/zen/reveal";
import { useLeadDialog } from "@/lib/store/lead-dialog";

/**
 * Proyectos: grid 2x1 de casos reales. Cada tarjeta tiene una "tapa"
 * decorativa (gradiente + marca de agua loto, sin capturas falsas),
 * métrica de resultado y chips del stack.
 */
export function Projects() {
  const openDialog = useLeadDialog((s) => s.openDialog);

  return (
    <section
      id="proyectos"
      aria-labelledby="proyectos-title"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      {/* Glow decorativo: esta vez desde la izquierda, para alternar el ritmo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(40% 36% at 88% 20%, rgba(255,171,145,0.06), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            index="04"
            eyebrow="Proyectos"
            title={
              <span id="proyectos-title">
                Sistemas reales, <span className="text-zen-accent">trabajando hoy.</span>
              </span>
            }
            description="No mostramos mockups: cada caso de acá corre todos los días en un negocio de verdad."
          />
        </Reveal>

        <RevealGroup
          as="ul"
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:gap-6"
          stagger={0.1}
        >
          {projects.map((p) => {
            const Icon = projectIcons[p.icon];
            return (
              <RevealItem as="li" key={p.id} className="h-full">
                <article className="glass-card card-hover group relative flex h-full flex-col overflow-hidden rounded-2xl">
                  {/* Tapa decorativa: gradiente + textura + loto como marca de agua */}
                  <div className="relative h-40 overflow-hidden border-b border-zen-line/70 print:hidden sm:h-44">
                    <div
                      aria-hidden
                      className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      style={{
                        background:
                          "linear-gradient(150deg, rgba(255,171,145,0.14) 0%, rgba(27,36,38,0.4) 55%, rgba(18,24,26,0.9) 100%)",
                      }}
                    />
                    {/* Textura de puntos sutil */}
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-40"
                      style={{
                        backgroundImage:
                          "radial-gradient(rgba(245,241,237,0.07) 1px, transparent 1px)",
                        backgroundSize: "18px 18px",
                      }}
                    />
                    {/* Loto como marca de agua */}
                    <LotusIcon
                      aria-hidden
                      className="absolute -right-5 -bottom-6 text-zen-accent/15 transition-all duration-700 group-hover:text-zen-accent/25"
                      width={150}
                      height={150}
                      strokeWidth={0.9}
                    />
                    {/* Año */}
                    <span
                      aria-hidden
                      className="absolute top-4 right-4 font-mono text-xs tracking-[0.14em] text-zen-ink/50"
                    >
                      {p.year}
                    </span>
                    {/* Chip de categoría con ícono */}
                    <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-zen-accent/25 bg-[#0a0f10]/70 px-3 py-1.5 text-xs font-medium text-zen-ink/90 backdrop-blur-sm print:bg-transparent print:border-zen-line">
                      <Icon className="text-zen-accent" width={15} height={15} />
                      {p.category}
                    </span>
                  </div>

                  {/* Cuerpo */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-semibold text-zen-ink">
                      {p.title}
                    </h3>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-zen-muted">
                      {p.description}
                    </p>

                    {/* Stack */}
                    <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tecnologías">
                      {p.stack.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full border border-zen-line bg-zen-surface-raised/70 px-2.5 py-1 text-[11px] font-medium tracking-wide text-zen-muted"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>

                    {/* Métrica de resultado */}
                    <p className="mt-5 flex items-baseline gap-2.5 border-t border-zen-line/60 pt-4">
                      <span className="text-2xl font-semibold text-zen-accent">
                        {p.metric.value}
                      </span>
                      <span className="text-xs leading-snug text-zen-muted">
                        {p.metric.label}
                      </span>
                    </p>
                  </div>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* Honestidad + CTA */}
        <Reveal delay={0.08}>
          <p className="mt-8 max-w-2xl text-xs leading-relaxed text-zen-muted/70">
            {projectsDisclaimer}
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-8 flex flex-wrap items-center justify-center gap-2 text-center text-base text-zen-muted">
            ¿Tu proyecto podría ser el próximo?
            <button
              type="button"
              onClick={() => openDialog("proyectos-cta", "Un proyecto como los del portfolio")}
              className="link-accent cursor-pointer font-medium text-zen-accent"
            >
              Contanos tu idea
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
