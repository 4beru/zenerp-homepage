"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLeadDialog } from "@/lib/store/lead-dialog";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/zen/icons";

/**
 * Asistente del FAQ ("¿No sabés por dónde arrancar?"): mini diagnóstico de
 * dos preguntas que recomienda un punto de partida y abre el dialog de
 * contacto con el tema ya encaminado (source: faq-asistente). Reemplaza la
 * tarjeta de ayuda estática; el atajo "escribir directo" se conserva en el
 * paso inicial. Con reduced-motion los cambios de paso son instantáneos.
 */

type Step = "intro" | "q1" | "q2" | "result";

const Q1 = {
  question: "¿Cómo manejás hoy la gestión del negocio?",
  options: [
    { label: "Planillas y memoria", hint: "sin sistema" },
    { label: "Un sistema que me queda corto", hint: "hay algo, no alcanza" },
    { label: "Un mamotreto que nadie entiende", hint: "sobra complejidad" },
  ],
} as const;

const Q2 = {
  question: "¿Qué te duele primero?",
  options: [
    { label: "No veo el panorama", hint: "números claros" },
    { label: "Todo se hace a mano", hint: "horas de planilla" },
    { label: "Decido a los tumbos", hint: "sin datos confiables" },
  ],
} as const;

/** Ruta recomendada según la respuesta 1 (situación actual). */
const ROUTES = [
  {
    title: "Arrancar ordenado",
    text: "Salís de las planillas con un ERP liviano que crece con vos: lo esencial primero, módulo por módulo.",
    topic: "arrancar un ERP desde cero",
  },
  {
    title: "Mejorar lo que hay",
    text: "Auditamos tu sistema actual y lo llevamos donde necesitás: ajustes, integraciones o módulos nuevos.",
    topic: "auditar y mejorar mi sistema actual",
  },
  {
    title: "Rescate del mamotreto",
    text: "Entendemos lo que hay, rescatamos los datos y migramos gradual — sin big bang ni semanas caído.",
    topic: "rescatar y migrar mi sistema actual",
  },
] as const;

/** Primer paso concreto según la respuesta 2 (el dolor principal). */
const FIRST_STEPS = [
  { title: "Un tablero simple", text: "tus números del día, en una sola pantalla" },
  { title: "Automatizar lo repetitivo", text: "la tarea que más horas te come" },
  { title: "Reportes confiables", text: "decidir con datos, no con corazonadas" },
] as const;

const STEP_LABEL: Record<Exclude<Step, "intro" | "result">, string> = {
  q1: "Paso 1 de 2",
  q2: "Paso 2 de 2",
};

export function FaqAssistant() {
  const openDialog = useLeadDialog((s) => s.openDialog);
  const reduced = useReducedMotion();
  const [step, setStep] = useState<Step>("intro");
  const [answer1, setAnswer1] = useState<number | null>(null);
  const [answer2, setAnswer2] = useState<number | null>(null);

  const reset = () => {
    setAnswer1(null);
    setAnswer2(null);
    setStep("intro");
  };

  const transition = reduced ? { duration: 0 } : { duration: 0.32, ease: "easeOut" as const };

  return (
    <div aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        {/* ---------- Paso inicial ---------- */}
        {step === "intro" && (
          <motion.div
            key="intro"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={transition}
          >
            <p className="text-base font-semibold text-zen-ink">
              ¿No sabés por dónde arrancar?
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zen-muted">
              Dos preguntas y te decimos tu punto de partida — con una
              opinión honesta, aunque sea que no necesitás nada de lo que
              hacemos.
            </p>
            <div className="mt-5 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => setStep("q1")}
                className="btn-primary group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-zen-accent px-5 py-2.5 text-sm font-semibold text-[#1a1210]"
              >
                Empezar el diagnóstico
                <ArrowRightIcon
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  width={16}
                  height={16}
                />
              </button>
              <button
                type="button"
                onClick={() => openDialog("faq")}
                className="link-accent cursor-pointer self-center text-sm font-medium"
              >
                Prefiero escribir directo
              </button>
            </div>
          </motion.div>
        )}

        {/* ---------- Preguntas ---------- */}
        {(step === "q1" || step === "q2") && (
          <motion.div
            key={step}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={transition}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-[11px] tracking-[0.22em] text-zen-accent/80">
                {STEP_LABEL[step]}
              </p>
              <span aria-hidden className="flex items-center gap-1.5">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${step === "q1" ? "bg-zen-accent" : "bg-zen-accent"}`}
                />
                <span
                  className={`h-1.5 w-1.5 rounded-full ${step === "q2" ? "bg-zen-accent" : "bg-zen-line"}`}
                />
              </span>
            </div>
            <p className="mt-2.5 text-base font-semibold leading-snug text-zen-ink">
              {step === "q1" ? Q1.question : Q2.question}
            </p>
            <div className="mt-4 flex flex-col gap-2">
              {(step === "q1" ? Q1.options : Q2.options).map((opt, i) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => {
                    if (step === "q1") {
                      setAnswer1(i);
                      setStep("q2");
                    } else {
                      setAnswer2(i);
                      setStep("result");
                    }
                  }}
                  className="assistant-option group cursor-pointer rounded-xl border border-zen-line bg-zen-surface/60 px-4 py-3 text-left transition-colors duration-200 hover:border-zen-accent/50 hover:bg-zen-accent-soft"
                >
                  <span className="block text-sm font-medium text-zen-ink transition-colors group-hover:text-zen-accent">
                    {opt.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-zen-muted">
                    {opt.hint}
                  </span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setStep(step === "q1" ? "intro" : "q1")}
              className="mt-4 inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-zen-muted transition-colors hover:text-zen-ink"
            >
              <ArrowLeftIcon width={13} height={13} />
              Atrás
            </button>
          </motion.div>
        )}

        {/* ---------- Resultado ---------- */}
        {step === "result" && answer1 !== null && answer2 !== null && (
          <motion.div
            key="result"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={transition}
          >
            <p className="font-mono text-[11px] tracking-[0.22em] text-zen-accent/80">
              TU PUNTO DE ARRANQUE
            </p>
            <p className="mt-2 text-lg font-semibold leading-snug text-zen-ink">
              {ROUTES[answer1].title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zen-muted">
              {ROUTES[answer1].text}
            </p>

            <div className="mt-4 rounded-xl border border-zen-accent/25 bg-zen-accent-soft px-4 py-3">
              <p className="text-sm font-medium text-zen-ink">
                Primer paso: {FIRST_STEPS[answer2].title}
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-zen-muted">
                {FIRST_STEPS[answer2].text}
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => openDialog("faq-asistente", ROUTES[answer1].topic)}
                className="btn-primary group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-zen-accent px-5 py-2.5 text-sm font-semibold text-[#1a1210]"
              >
                Hablar de esto
                <ArrowRightIcon
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  width={16}
                  height={16}
                />
              </button>
              <button
                type="button"
                onClick={reset}
                className="cursor-pointer self-center text-xs font-medium text-zen-muted underline-offset-4 transition-colors hover:text-zen-ink hover:underline"
              >
                Volver a empezar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
