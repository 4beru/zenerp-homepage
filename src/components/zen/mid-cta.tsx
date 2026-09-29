"use client";

import { siteConfig } from "@/lib/site-config";
import { useLeadDialog } from "@/lib/store/lead-dialog";
import { LotusMark } from "@/components/zen/lotus-mark";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/zen/icons";
import { Reveal } from "@/components/zen/reveal";

/**
 * Mid-CTA: panel de conversión antes del footer. Un solo mensaje, dos salidas
 * (dialog de contacto o WhatsApp directo) y el loto como compañía visual.
 */
export function MidCta() {
  const openDialog = useLeadDialog((s) => s.openDialog);

  return (
    <section aria-label="Contacto directo" className="relative py-24 sm:py-28">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="glass-card relative overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-12 sm:py-16">
            {/* Glow radial interno */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(60% 70% at 50% 0%, rgba(255,171,145,0.1), transparent 70%)",
              }}
            />
            {/* Textura de puntos suave */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(245,241,237,0.05) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
                maskImage:
                  "radial-gradient(60% 70% at 50% 40%, black, transparent 80%)",
                WebkitMaskImage:
                  "radial-gradient(60% 70% at 50% 40%, black, transparent 80%)",
              }}
            />

            {/* Loto pequeño, con su halo característico */}
            <div className="relative mx-auto w-20 sm:w-24">
              <LotusMark />
            </div>

            <h2 className="relative mt-8 text-3xl font-semibold tracking-tight text-balance text-zen-ink sm:text-4xl">
              ¿Tenés un proyecto <span className="text-zen-accent">en mente?</span>
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-base leading-relaxed text-pretty text-zen-muted">
              Contanos tu idea en una charla de 15 minutos y te decimos por
              dónde empezar — sin compromiso y en criollo.
            </p>

            <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <button
                type="button"
                onClick={() => openDialog("mid-cta")}
                className="btn-primary group inline-flex cursor-pointer items-center gap-2 rounded-full bg-zen-accent px-7 py-3.5 text-base font-semibold text-[#1a1210]"
              >
                Hablemos de tu proyecto
                <ArrowRightIcon
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  width={18}
                  height={18}
                />
              </button>
              {siteConfig.whatsapp ? (
                <a
                  href={siteConfig.whatsapp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center gap-2.5 rounded-full border border-zen-line bg-zen-surface/60 px-7 py-3.5 text-base font-medium text-zen-ink"
                >
                  <WhatsAppIcon className="text-zen-accent" width={18} height={18} />
                  WhatsApp directo
                </a>
              ) : null}
            </div>

            <p className="relative mt-7 text-xs tracking-wide text-zen-muted/60">
              Respondemos en menos de 24&nbsp;h hábiles.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
