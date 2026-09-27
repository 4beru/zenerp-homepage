"use client";

import { LotusDivider } from "@/components/motion/lotus-divider";
import { Reveal } from "@/components/reveal";

/** CTA intermedio antes del formulario. */
export function MidCta() {
  return (
    <section aria-label="Llamado a la acción" className="py-12 sm:py-16">
      <LotusDivider widthPx={200} />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="glass-card flex flex-col items-start justify-between gap-6 rounded-3xl p-8 sm:flex-row sm:items-center sm:p-10">
            <div>
              <h2 className="text-2xl font-semibold text-balance text-ink sm:text-3xl">
                ¿Tenés un proyecto en mente?
              </h2>
              <p className="mt-2 text-base text-muted">
                Charlemos 15 minutos. Te decimos con honestidad si te conviene y cuánto puede salir.
              </p>
            </div>
            <a
              href="#contacto"
              className="btn-primary shrink-0 rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-[#1a1210]"
            >
              Agendar la charla
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
