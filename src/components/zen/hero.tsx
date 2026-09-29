"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { stack } from "@/lib/site-config";
import { useLeadDialog } from "@/lib/store/lead-dialog";
import { useCountUp } from "@/hooks/use-count-up";
import { useHydrated } from "@/hooks/use-hydrated";
import { LotusMark } from "@/components/zen/lotus-mark";
import { ArrowRightIcon, LotusIcon } from "@/components/zen/icons";

// El JS pesado (canvas de motas) llega tras el primer paint: el texto del
// hero es estático en el HTML y no compite con el LCP.
const AmbientBg = lazy(() =>
  import("@/components/zen/ambient-bg").then((m) => ({ default: m.AmbientBg }))
);

function AfterPaint({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);
  if (!ready) return null;
  return <Suspense fallback={null}>{children}</Suspense>;
}

/** Hero: titular corto (ángulo zen) + subtítulo + dos CTAs + loto oficial. */
export function Hero() {
  const reduced = useReducedMotion();
  const hydrated = useHydrated();
  const openDialog = useLeadDialog((s) => s.openDialog);
  const { value: erpCount } = useCountUp(3, { duration: 1400 });

  // Parallax leve: el contenido sube más rápido que el loto (profundidad).
  // Se aplica recién tras la hidratación: el transform depende del scroll
  // real de window y no debe participar en el render del servidor.
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 600], [0, -56]);
  const logoY = useTransform(scrollY, [0, 600], [0, 36]);
  const parallaxContent = hydrated && !reduced ? { y: contentY } : undefined;
  const parallaxLogo = hydrated && !reduced ? { y: logoY } : undefined;

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      id="inicio"
      aria-label="Presentación"
      className="relative flex min-h-svh flex-col overflow-hidden pt-28 sm:pt-36"
    >
      <AfterPaint>
        <AmbientBg />
      </AfterPaint>

      <div className="relative mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        <motion.div
          style={parallaxContent}
          variants={container}
          initial={reduced ? false : "hidden"}
          animate="show"
        >
          <motion.p
            variants={item}
            className="flex items-center gap-2 text-sm text-zen-muted"
          >
            <LotusIcon className="text-zen-accent" width={18} height={18} />
            Desarrollo a medida · Odoo · ERPNext
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-6 max-w-3xl text-4xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-6xl"
          >
            Software en calma,
            <br />
            <span className="text-glow-accent text-zen-accent">
              hecho a tu medida.
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-zen-muted"
          >
            Construimos aplicaciones web, mobile y desktop e implementamos
            sistemas de gestión —un ERP es el software que ordena ventas, stock,
            facturación y administración en un solo lugar— adaptados a cómo
            funciona tu negocio, no al revés.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              type="button"
              onClick={() => openDialog("hero-primary")}
              className="btn-primary group inline-flex cursor-pointer items-center gap-2 rounded-full bg-zen-accent px-7 py-3.5 text-base font-semibold text-[#1a1210]"
            >
              Hablemos de tu proyecto
              <ArrowRightIcon
                className="transition-transform duration-300 group-hover:translate-x-1"
                width={18}
                height={18}
              />
            </button>
            <a
              href="#proyectos"
              className="btn-secondary rounded-full border border-zen-line bg-zen-surface/60 px-7 py-3.5 text-base font-medium text-zen-ink"
            >
              Ver proyectos
            </a>
          </motion.div>

          {/* Dato real destacado, sin hype */}
          <motion.p
            variants={item}
            className="mt-14 flex max-w-xl items-baseline gap-3 text-sm text-zen-muted"
          >
            <span
              className="text-3xl font-semibold text-zen-accent"
              aria-label="3 sistemas ERP en producción"
            >
              {erpCount}
            </span>
            sistemas ERP que construimos hoy están en producción, todos los
            días, en negocios reales.
          </motion.p>
        </motion.div>

        {/* Loto oficial — protagonista visual del hero */}
        <motion.div
          style={parallaxLogo}
          variants={item}
          initial={reduced ? false : "hidden"}
          animate="show"
          className="hidden justify-center lg:flex"
        >
          <LotusMark className="w-full max-w-[440px]" />
        </motion.div>
      </div>

      {/* Loto en mobile (versión compacta, bajo el contenido) */}
      <motion.div
        style={parallaxLogo}
        className="relative mx-auto mb-10 w-56 px-5 sm:w-64 lg:hidden"
      >
        <LotusMark />
      </motion.div>

      {/* Tira de stack con marquee sutil */}
      <div className="marquee-mask relative border-t border-zen-line/70 bg-[#0a0f10]/40 py-5 backdrop-blur-[2px]">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0a0f10] to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0a0f10] to-transparent sm:w-28" />
        <div className="overflow-hidden">
          <div className="marquee-track flex w-max items-center gap-10 pr-10">
            {[...stack, ...stack].map((s, i) => (
              <span
                key={`${s.name}-${i}`}
                className="flex items-center gap-3 whitespace-nowrap text-sm text-zen-muted"
              >
                <LotusIcon
                  className="text-zen-accent/60"
                  width={13}
                  height={13}
                />
                <span className="font-medium text-zen-ink/80">{s.name}</span>
                <span className="hidden text-zen-muted/60 sm:inline">
                  {s.note}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Indicador de scroll (desktop) */}
      <a
        href="#servicios"
        aria-label="Desplazarse a servicios"
        className="group absolute right-8 bottom-24 hidden items-center gap-2 text-xs tracking-wide text-zen-muted/70 transition-colors hover:text-zen-accent xl:flex"
      >
        <span className="relative flex h-8 w-5 items-start justify-center rounded-full border border-zen-muted/40 pt-1.5 group-hover:border-zen-accent/60">
          <span
            className="h-1.5 w-1.5 rounded-full bg-zen-accent/80"
            style={{
              animation: reduced ? "none" : "scroll-dot 1.8s ease-in-out infinite",
            }}
          />
        </span>
        Deslizá
      </a>
    </section>
  );
}
