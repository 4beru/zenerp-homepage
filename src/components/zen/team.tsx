"use client";

import { team, teamNote } from "@/data/team";
import { LotusIcon } from "@/components/zen/icons";
import { SectionHeading } from "@/components/zen/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/zen/reveal";

/**
 * Equipo: quiénes están del otro lado — grid de tres perfiles con avatar
 * de iniciales (sin fotos: honesto, en línea con los testimonios) y chips
 * de especialidades. Cierra con la nota diferencial del estudio.
 */
export function Team() {
  return (
    <section
      id="equipo"
      aria-labelledby="equipo-title"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      {/* Glow superior tenue, alternando con secciones vecinas */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(42% 28% at 78% 18%, rgba(255,171,145,0.05), transparent 72%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            index="06"
            eyebrow="Equipo"
            title={
              <span id="equipo-title">
                Pocas personas, <span className="text-zen-accent">cero intermediarios.</span>
              </span>
            }
            description="Somos un estudio chico a propósito: quien escucha tu problema, estima el trabajo y escribe el código es la misma persona — de la primera llamada al día del lanzamiento."
          />
        </Reveal>

        <RevealGroup
          stagger={0.1}
          className="mt-12 grid gap-5 sm:mt-14 md:grid-cols-3 lg:gap-6"
        >
          {team.map((m) => (
            <RevealItem
              key={m.initials}
              className="glass-card team-card flex flex-col rounded-2xl p-6 sm:p-7"
            >
              <div className="flex flex-col items-center text-center">
                <span
                  aria-hidden
                  className="team-avatar flex h-16 w-16 items-center justify-center rounded-full border border-zen-accent/25 bg-gradient-to-br from-zen-accent-soft to-transparent font-mono text-lg font-semibold text-zen-accent"
                >
                  {m.initials}
                </span>
                <p className="mt-4 text-base font-semibold text-zen-ink">
                  {m.name}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-zen-muted">
                  {m.role}
                </p>
              </div>

              <span
                aria-hidden
                className="mt-5 block h-px w-10 bg-zen-accent/30"
              />

              <p className="mt-4 flex-1 text-sm leading-relaxed text-pretty text-zen-muted">
                {m.bio}
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-1.5">
                {m.specialties.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-zen-line bg-zen-surface/40 px-2.5 py-0.5 font-mono text-[11px] text-zen-muted/80"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.2}>
          <div className="mx-auto mt-10 flex max-w-2xl items-start gap-4 rounded-2xl border border-zen-line/70 bg-zen-surface/30 px-6 py-5 sm:mt-12">
            <LotusIcon
              aria-hidden
              className="mt-0.5 shrink-0 text-zen-accent/70"
              width={20}
              height={20}
            />
            <p className="text-sm leading-relaxed text-pretty text-zen-muted">
              {teamNote}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
