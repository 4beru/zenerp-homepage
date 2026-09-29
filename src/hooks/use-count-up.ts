"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Contador que sube de 0 a `target` con easing easeOutCubic (arranca vivo,
 * aterriza suave). Opciones:
 * - `startOnView` (false): arranca al montar — para números above-the-fold
 *   (hero). Con `true`: arranca cuando el elemento del `ref` entra al
 *   viewport (threshold 0.6, una sola vez) — para secciones más abajo.
 * - `delay`: corrimiento inicial en ms (para stagger entre números).
 * Respeta prefers-reduced-motion (valor final directo, SSR-safe).
 * Si el usuario imprime antes de que la sección se vea (beforeprint /
 * matchMedia('print')), muestra el valor final: en papel no hay scroll
 * que dispare el IntersectionObserver.
 * Los setState viven en callbacks async (rAF/observer/evento), nunca
 * síncronos en el cuerpo del efecto (regla set-state-in-effect).
 */
export function useCountUp(
  target: number,
  {
    duration = 1200,
    startOnView = false,
    delay = 0,
  }: { duration?: number; startOnView?: boolean; delay?: number } = {}
) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    let cancelled = false;
    let done = false;
    let rafId = 0;

    const finish = () => {
      if (cancelled || done) return;
      done = true;
      setValue(target);
    };

    const run = () => {
      const t0 = performance.now() + delay;
      const step = (now: number) => {
        if (cancelled || done) return;
        if (now < t0) {
          rafId = requestAnimationFrame(step);
          return;
        }
        const p = Math.min(1, (now - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(eased * target));
        if (p < 1) rafId = requestAnimationFrame(step);
        else done = true;
      };
      rafId = requestAnimationFrame(step);
    };

    // Papel: si imprimen antes de que la sección entre al viewport, el
    // valor final se muestra directo (cubre Chrome, Safari y Firefox).
    window.addEventListener("beforeprint", finish);
    let printMq: MediaQueryList | null = null;
    const onPrintChange = () => finish();
    if (typeof window.matchMedia === "function") {
      printMq = window.matchMedia("print");
      printMq.addEventListener?.("change", onPrintChange);
    }

    let io: IntersectionObserver | null = null;
    const el = ref.current;
    if (!startOnView || !el || typeof IntersectionObserver === "undefined") {
      // Arranque inmediato, async al próximo frame.
      rafId = requestAnimationFrame(run);
    } else {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            io?.disconnect();
            run();
          }
        },
        { threshold: 0.6 }
      );
      io.observe(el);
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener("beforeprint", finish);
      printMq?.removeEventListener?.("change", onPrintChange);
      io?.disconnect();
    };
  }, [target, duration, delay, startOnView, reduced]);

  // Con reduced-motion: valor final directo (el flag cambia post-mount,
  // así el HTML del servidor y la hidratación coinciden en 0).
  return { value: reduced ? target : value, ref };
}
