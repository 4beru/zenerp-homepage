"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/zen/section-heading";
import { Reveal } from "@/components/zen/reveal";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/zen/icons";

/**
 * Testimonios: carrusel sereno — un solo testimonio a la vez, avance lento
 * (7 s), pausa al hover/foco, flechas + dots + swipe táctil. Con
 * prefers-reduced-motion no auto-avanza ni anima (accesibilidad calma).
 */
export function Testimonials() {
  const total = testimonials.length;
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // Sin IO (navegadores viejos): arranca directo (no bloquea el avance).
  const [visible, setVisible] = useState(
    () => typeof IntersectionObserver === "undefined"
  );
  const regionRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + total) % total),
    [total]
  );
  const goTo = useCallback((i: number) => setIndex(i), []);

  // El auto-avance arranca recién cuando la sección entra al viewport
  // (si no, quien scrollea tarde se pierde los primeros testimonios).
  useEffect(() => {
    const el = regionRef.current;
    if (!el || visible) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  // Auto-avance sereno: 7 s tras ser visible, se pausa con hover/foco o
  // reduced-motion. El intervalo se reinicia en cada cambio (dep index).
  useEffect(() => {
    if (!visible || paused || reduced) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, 7000);
    return () => window.clearInterval(id);
  }, [index, visible, paused, reduced, total]);

  // Swipe táctil (mobile): umbral de 40px.
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start === null) return;
    const delta = (e.changedTouches[0]?.clientX ?? 0) - start;
    if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1);
  };

  // Teclado: ← / → cambian de testimonio cuando la región tiene foco
  // (la región es focusable para que quien navega por Tab la controle).
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
  };

  const t = testimonials[index];

  return (
    <section
      id="testimonios"
      aria-labelledby="testimonios-title"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      {/* Glow lateral tenue, alternando con secciones vecinas */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(46% 30% at 22% 34%, rgba(255,171,145,0.05), transparent 72%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            index="05"
            eyebrow="Testimonios"
            title={
              <span id="testimonios-title">
                Lo que dicen los que ya <span className="text-zen-accent">trabajan en calma</span>
              </span>
            }
            description="Clientes reales de distintos rubros, con nombres abreviados por confidencialidad. Los casos completos, cuando nos dejan contarlos."
          />
        </Reveal>

        <Reveal delay={0.15}>
          <div
            ref={regionRef}
            role="region"
            aria-roledescription="carrusel"
            aria-label="Testimonios de clientes"
            tabIndex={0}
            className="relative mx-auto mt-12 max-w-3xl outline-none focus-visible:ring-2 focus-visible:ring-zen-accent/50 focus-visible:ring-offset-4 focus-visible:ring-offset-[#050505] rounded-3xl lg:mt-14"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setPaused(false);
              }
            }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onKeyDown={onKeyDown}
          >
            <div className="glass-card relative overflow-hidden rounded-3xl px-6 py-9 sm:px-10 sm:py-11">
              {/* Glow interno superior */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(70% 46% at 50% 0%, rgba(255,171,145,0.07), transparent 72%)",
                }}
              />

              {/* Meta: rubro + resultado */}
              <div className="relative flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs tracking-[0.14em] text-zen-muted/80">
                  {t.industry}
                </span>
                <span className="rounded-full border border-zen-accent/25 bg-zen-accent-soft px-3 py-1 text-xs font-medium text-zen-accent">
                  {t.result}
                </span>
              </div>

              {/* Cita */}
              <div
                aria-live="polite"
                className="relative mt-6 min-h-[168px] sm:min-h-[144px]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-1 -left-1 select-none font-serif text-7xl leading-none text-zen-accent/25"
                >
                  “
                </span>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.blockquote
                    key={index}
                    initial={reduced ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: -14 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="pt-7 text-lg leading-relaxed text-pretty text-zen-ink/90 sm:text-xl"
                  >
                    {t.quote}
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              {/* Pie: autor + controles */}
              <div className="relative mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-zen-line/70 pt-6">
                <div className="flex items-center gap-3.5">
                  <span
                    aria-hidden
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-zen-accent/25 bg-gradient-to-br from-zen-accent-soft to-transparent font-mono text-sm font-semibold text-zen-accent"
                  >
                    {t.initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-zen-ink">{t.name}</p>
                    <p className="text-xs text-zen-muted">{t.role}</p>
                  </div>
                </div>

                {/* Dots + flechas (áreas táctiles >= 44px) */}
                <div className="group/dots flex items-center gap-4">
                  <div className="flex items-center gap-1" role="tablist" aria-label="Elegir testimonio">
                    {testimonials.map((item, i) => (
                      <button
                        key={item.initials}
                        type="button"
                        role="tab"
                        aria-selected={i === index}
                        aria-label={`Testimonio de ${item.name}`}
                        onClick={() => goTo(i)}
                        className="cursor-pointer p-1.5"
                      >
                        <span
                          className={`block h-2 rounded-full transition-all duration-300 ${
                            i === index
                              ? "w-6 bg-zen-accent"
                              : "w-2 bg-zen-line group-hover/dots:bg-zen-muted/60"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => go(-1)}
                      aria-label="Testimonio anterior"
                      className="btn-secondary flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-zen-line bg-zen-surface/60 text-zen-muted hover:text-zen-ink"
                    >
                      <ArrowLeftIcon width={16} height={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      aria-label="Testimonio siguiente"
                      className="btn-secondary flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-zen-line bg-zen-surface/60 text-zen-muted hover:text-zen-ink"
                    >
                      <ArrowRightIcon width={16} height={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Indicador de estado (desktop): auto-avance sereno */}
            <p className="mt-3 hidden text-right text-[11px] tracking-wide text-zen-muted/50 lg:block">
              {paused
                ? "Pausado"
                : `Avanza solo cada 7 s · ${index + 1} de ${total}`}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
