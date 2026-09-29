"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  erpModules,
  moduleAreas,
  modulesById,
  tierForScore,
} from "@/data/modules";
import { SectionHeading } from "@/components/zen/section-heading";
import { Reveal } from "@/components/zen/reveal";
import { useLeadDialog } from "@/lib/store/lead-dialog";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  ArrowRightIcon,
  CheckIcon,
  LotusIcon,
} from "@/components/zen/icons";

/**
 * Armá tu sistema (sección 09): selector de módulos con resumen vivo.
 * No es un presupuesto — es el punto de partida que viaja al dialog de
 * contacto (source `armador-stack`) para que el diagnóstico arranque
 * encaminado. La complejidad es relativa y honesta: el tramo sirve de
 * idioma común, no de cotización.
 */
export function ScopeBuilder() {
  const reduced = usePrefersReducedMotion();
  const openDialog = useLeadDialog((s) => s.openDialog);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const selectedModules = useMemo(
    () =>
      selectedIds
        .map((id) => modulesById[id])
        .filter((m): m is NonNullable<typeof m> => Boolean(m)),
    [selectedIds]
  );

  const score = useMemo(
    () => selectedModules.reduce((acc, m) => acc + m.complexity, 0),
    [selectedModules]
  );
  const tier = tierForScore(score);
  const areasCovered = useMemo(() => {
    const ids = new Set(selectedModules.map((m) => m.area));
    return moduleAreas.filter((a) => ids.has(a.id));
  }, [selectedModules]);
  const hasHeavyModule = selectedModules.some((m) => m.complexity === 3);

  const toggle = (id: string) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  const clear = () => setSelectedIds([]);

  const requestScope = () => {
    if (selectedModules.length === 0) return;
    const list = selectedModules.map((m) => `- ${m.name}`).join("\n");
    openDialog(
      "armador-stack",
      `Sistema ${tier.label.toLowerCase()} · ${selectedModules.length} módulos`,
      `Hola, vengo del armador de sistema. Para empezar necesitaría:\n${list}\n\n¿Me cuentan cómo lo ven?`
    );
  };

  return (
    <section
      id="tu-sistema"
      aria-labelledby="tu-sistema-title"
      className="relative py-24 sm:py-32"
    >
      {/* Glow decorativo: esta vez desde abajo a la derecha, cerrando el funnel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(44% 32% at 78% 82%, rgba(255,171,145,0.055), transparent 72%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            index="09"
            eyebrow="Tu sistema"
            title={
              <span id="tu-sistema-title">
                Armá el sistema que <span className="text-zen-accent">necesitás.</span>
              </span>
            }
            description="Tocá los módulos que te quitarían sueño. No es un presupuesto: es el punto de partida perfecto para el diagnóstico gratuito."
          />
        </Reveal>

        <div className="mt-14 lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-12">
          {/* Columna izquierda: áreas y módulos */}
          <div className="flex flex-col gap-10">
            {moduleAreas.map((area, ai) => {
              const areaModules = erpModules.filter(
                (m) => m.area === area.id
              );
              const picked = areaModules.filter((m) =>
                selectedIds.includes(m.id)
              ).length;
              return (
                <Reveal key={area.id} delay={0.07 * ai}>
                  <fieldset className="min-w-0">
                    <legend className="sr-only">{area.label}</legend>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs tracking-[0.16em] text-zen-muted/80 uppercase">
                        {area.label}
                      </span>
                      <span
                        aria-hidden
                        className="h-px flex-1 bg-zen-line/60"
                      />
                      <span
                        aria-hidden
                        className={`font-mono text-xs tabular-nums transition-colors duration-300 ${
                          picked > 0 ? "text-zen-accent" : "text-zen-muted/40"
                        }`}
                      >
                        {picked}/{areaModules.length}
                      </span>
                    </div>

                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                      {areaModules.map((m) => {
                        const pressed = selectedIds.includes(m.id);
                        return (
                          <li key={m.id}>
                            <button
                              type="button"
                              aria-pressed={pressed}
                              onClick={() => toggle(m.id)}
                              className="module-card group flex w-full cursor-pointer items-start gap-3.5 rounded-xl p-4 text-left print:hidden"
                            >
                              {/* Indicador de selección */}
                              <span
                                aria-hidden
                                className={`module-check mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                                  pressed
                                    ? "border-zen-accent bg-zen-accent text-[#1a1210]"
                                    : "border-zen-line bg-zen-surface-raised/60 text-transparent group-hover:border-zen-accent/50"
                                }`}
                              >
                                <CheckIcon width={13} height={13} />
                              </span>

                              <span className="min-w-0 flex-1">
                                <span className="flex items-start justify-between gap-2">
                                  <span className="text-sm font-medium leading-snug text-zen-ink">
                                    {m.name}
                                  </span>
                                  {/* Peso relativo (dots) */}
                                  <span className="mt-1 flex shrink-0 items-center gap-1">
                                    <span aria-hidden className="flex items-center gap-1">
                                      {[1, 2, 3].map((n) => (
                                        <span
                                          key={n}
                                          className={`h-1.5 w-1.5 rounded-full ${
                                            n <= m.complexity
                                              ? "bg-zen-accent/80"
                                              : "bg-zen-line"
                                          }`}
                                        />
                                      ))}
                                    </span>
                                    <span className="sr-only">
                                      {`Peso relativo ${m.complexity} de 3`}
                                    </span>
                                  </span>
                                </span>
                                <span className="mt-1 block text-xs leading-relaxed text-zen-muted">
                                  {m.note}
                                </span>
                              </span>
                            </button>

                            {/* Versión papel: ítem estático con estado */}
                            <p className="hidden print:flex print:items-center print:gap-2 print:text-sm print:text-zen-ink">
                              <span className="font-mono text-xs">
                                {pressed ? "☑" : "☐"}
                              </span>
                              {m.name}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  </fieldset>
                </Reveal>
              );
            })}
          </div>

          {/* Columna derecha: resumen vivo (sticky en desktop) */}
          <Reveal delay={0.1} className="lg:sticky lg:top-28 lg:mt-2">
            <div className="glass-card mt-2 rounded-2xl p-6 lg:mt-0">
              {/* Encabezado del resumen */}
              <p className="flex items-center gap-2 font-mono text-xs tracking-[0.16em] text-zen-muted/80 uppercase">
                <LotusIcon className="text-zen-accent" width={14} height={14} />
                Tu punto de partida
              </p>

              {/* Estado anunciado a lectores de pantalla (compacto,
                  para no relanzar todo el panel en cada toque) */}
              <p aria-live="polite" className="sr-only">
                {selectedModules.length === 0
                  ? "Ningún módulo seleccionado."
                  : `${selectedModules.length} módulos seleccionados, alcance relativo ${tier.label}.`}
              </p>

              <div className="mt-4">
                {selectedModules.length === 0 ? (
                  /* Estado vacío */
                  <div className="rounded-xl border border-dashed border-zen-line px-4 py-8 text-center">
                    <p className="text-sm leading-relaxed text-zen-muted">
                      Todavía no elegiste módulos.
                      <br />
                      Tocá los que necesites y este panel cobra vida.
                    </p>
                    <a
                      href="#faq"
                      className="link-accent mt-3 inline-block cursor-pointer text-xs font-medium text-zen-accent"
                    >
                      No estoy seguro: ayudadme a diagnosticar
                    </a>
                  </div>
                ) : (
                  <>
                    {/* Conteo */}
                    <p className="flex items-baseline gap-2">
                      <span className="text-4xl font-semibold tabular-nums text-zen-accent">
                        {selectedModules.length}
                      </span>
                      <span className="text-sm text-zen-muted">
                        módulo{selectedModules.length !== 1 ? "s" : ""} ·{" "}
                        {areasCovered.length}{" "}
                        área{areasCovered.length !== 1 ? "s" : ""}
                      </span>
                    </p>

                    {/* Medidor de tramo */}
                    <div className="mt-5">
                      <div className="flex gap-1.5" aria-hidden>
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                              i <= scopeTierIndex(tier.id)
                                ? "bg-zen-accent"
                                : "bg-zen-line"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="mt-2 flex justify-between">
                        {["Sencillo", "Intermedio", "Ambicioso"].map(
                          (label, i) => (
                            <span
                              key={label}
                              className={`font-mono text-[11px] tracking-wide transition-colors duration-300 ${
                                i === scopeTierIndex(tier.id)
                                  ? "text-zen-accent"
                                  : "text-zen-muted/60"
                              }`}
                            >
                              {label}
                            </span>
                          )
                        )}
                      </div>
                      <p className="sr-only">
                        {`Alcance relativo: ${tier.label}`}
                      </p>
                    </div>

                    {/* Blurb del tramo (transición suave) */}
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.p
                        key={tier.id}
                        initial={reduced ? false : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduced ? undefined : { opacity: 0, y: -6 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-4 text-sm leading-relaxed text-zen-muted"
                      >
                        {tier.blurb}
                      </motion.p>
                    </AnimatePresence>

                    {/* Recapitulación: chips con scroll propio */}
                    <div className="mt-5 border-t border-zen-line/70 pt-4">
                      <p className="font-mono text-[11px] tracking-[0.14em] text-zen-muted/60 uppercase">
                        Lo que pediste
                      </p>
                      <ul
                        className="mt-3 flex max-h-40 flex-wrap gap-1.5 overflow-y-auto pr-1"
                        aria-label="Módulos seleccionados"
                      >
                        {selectedModules.map((m) => (
                          <li
                            key={m.id}
                            className="inline-flex items-center gap-1.5 rounded-full border border-zen-accent/25 bg-zen-accent-soft px-2.5 py-1 text-[11px] font-medium text-zen-ink/90 print:max-h-none print:overflow-visible"
                          >
                            <CheckIcon
                              className="text-zen-accent"
                              width={11}
                              height={11}
                            />
                            {m.name}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {hasHeavyModule ? (
                      <p className="mt-4 rounded-lg border border-zen-line bg-zen-surface-raised/50 px-3.5 py-2.5 text-xs leading-relaxed text-zen-muted">
                        Elegiste algún módulo pesado (tienda online,
                        producción o logística): suele merecer una etapa
                        propia del proyecto.
                      </p>
                    ) : null}

                    {/* CTA + limpiar */}
                    <button
                      type="button"
                      onClick={requestScope}
                      className="btn-primary group mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-zen-accent px-6 py-3 text-sm font-semibold text-[#1a1210]"
                    >
                      Pedir diagnóstico con este alcance
                      <ArrowRightIcon
                        className="transition-transform duration-300 group-hover:translate-x-1"
                        width={16}
                        height={16}
                      />
                    </button>
                    <button
                      type="button"
                      onClick={clear}
                      className="mt-2.5 inline-flex min-h-11 w-full cursor-pointer items-center justify-center rounded-full px-4 text-xs font-medium text-zen-muted/80 transition-colors duration-300 hover:text-zen-ink"
                    >
                      Limpiar selección
                    </button>
                  </>
                )}
              </div>

              {/* Nota de honestidad, siempre visible */}
              <p className="mt-5 border-t border-zen-line/70 pt-4 text-[11px] leading-relaxed text-zen-muted/70">
                El peso de cada módulo es relativo y orientativo. Las etapas
                y el precio cerrado se definen en el diagnóstico gratuito.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Índice del tramo activo (0–2) para el medidor. */
function scopeTierIndex(id: string): number {
  return id === "sencillo" ? 0 : id === "intermedio" ? 1 : 2;
}
