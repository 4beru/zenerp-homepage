"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Contador que sube de 0 a `target` al montarse (o al entrar en viewport
 * si se pasa `startOnView`). Respeta prefers-reduced-motion (salta directo).
 * Los setState viven en callbacks async (rAF/observer), nunca síncronos.
 */
export function useCountUp(
  target: number,
  {
    duration = 1200,
    startOnView = false,
  }: { duration?: number; startOnView?: boolean } = {}
) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    let raf = 0;
    let started = false;
    const run = () => {
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / duration);
        // easeOutCubic: arranca vivo, aterriza suave
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(eased * target));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    if (!startOnView || !ref.current) {
      run();
      return () => cancelAnimationFrame(raf);
    }

    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !started) {
          started = true;
          run();
          io.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration, startOnView, reduced]);

  return { value: reduced ? target : value, ref };
}
