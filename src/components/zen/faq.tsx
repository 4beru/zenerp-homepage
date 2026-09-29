"use client";

import { faqs } from "@/data/faq";
import { siteConfig } from "@/lib/site-config";
import { useLeadDialog } from "@/lib/store/lead-dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/zen/section-heading";
import { Reveal } from "@/components/zen/reveal";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/zen/icons";

/**
 * FAQ: acordeón con las dudas previas a un proyecto. A la izquierda el
 * encabezado + tarjeta de ayuda (sticky en desktop), a la derecha las
 * preguntas. La respuesta abierta gana borde coral (ver .faq-item en CSS).
 */
export function Faq() {
  const openDialog = useLeadDialog((s) => s.openDialog);

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      {/* Glow superior tenue, alternando con las secciones vecinas */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 26% at 50% 0%, rgba(255,171,145,0.06), transparent 72%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="lg:grid lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Columna izquierda: encabezado + tarjeta de ayuda (sticky) */}
          <div>
            <Reveal>
              <SectionHeading
                index="06"
                eyebrow="FAQ"
                title={
                  <span id="faq-title">
                    Lo que siempre <span className="text-zen-accent">nos preguntan</span>
                  </span>
                }
                description="Respuestas cortas y sin vueltas. Si tu duda no está acá, nos escribís y la respondemos en el día."
              />
            </Reveal>

            <Reveal delay={0.15} className="lg:sticky lg:top-28 lg:mt-8">
              <div className="glass-card mt-10 rounded-2xl p-6 lg:mt-0">
                <p className="text-base font-semibold text-zen-ink">
                  ¿No encontrás tu respuesta?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-zen-muted">
                  Contanos tu caso y te respondemos con una opinión honesta —
                  aunque la respuesta sea que no necesitás nada de lo que
                  vendemos.
                </p>
                <div className="mt-5 flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => openDialog("faq")}
                    className="btn-primary group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-zen-accent px-5 py-2.5 text-sm font-semibold text-[#1a1210]"
                  >
                    Hacenos la pregunta
                    <ArrowRightIcon
                      className="transition-transform duration-300 group-hover:translate-x-1"
                      width={16}
                      height={16}
                    />
                  </button>
                  {siteConfig.whatsapp ? (
                    <a
                      href={siteConfig.whatsapp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary inline-flex items-center justify-center gap-2.5 rounded-full border border-zen-line bg-zen-surface/60 px-5 py-2.5 text-sm font-medium text-zen-ink"
                    >
                      <WhatsAppIcon className="text-zen-accent" width={16} height={16} />
                      Escribir por WhatsApp
                    </a>
                  ) : null}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Columna derecha: acordeón de preguntas (reveal escalonado por delay) */}
          <Accordion
            type="single"
            collapsible
            className="mt-12 flex flex-col gap-3 lg:mt-0"
          >
            {faqs.map((f, i) => (
              <Reveal key={f.question} delay={0.05 * i}>
                <AccordionItem
                  value={`faq-${i}`}
                  className="faq-item rounded-2xl border-b-0 px-5 sm:px-6"
                >
                  <AccordionTrigger className="hover:no-underline py-5 text-base font-medium text-zen-ink [&>svg]:h-4.5 [&>svg]:w-4.5">
                    <span className="flex items-baseline gap-4 text-left">
                      <span
                        aria-hidden
                        className="font-mono text-xs text-zen-accent/70"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {f.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-zen-muted">
                    <span className="block border-l border-zen-accent/25 pl-4 sm:pl-5">
                      {f.answer}
                    </span>
                  </AccordionContent>
                </AccordionItem>
              </Reveal>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
