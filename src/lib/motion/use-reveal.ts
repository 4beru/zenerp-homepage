"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/motion/gsap";
import { usePrefersReducedMotion } from "@/lib/motion/prefers-reduced-motion";

/**
 * Scroll storytelling: fade + leve translateY al entrar en viewport,
 * con stagger entre hijos marcados con `staggerSelector`.
 * Reemplaza al antiguo Reveal por IntersectionObserver cuando GSAP está activo;
 * con prefers-reduced-motion muestra todo directo (sin animar).
 */
export function useReveal(
  scope: React.RefObject<HTMLElement | null>,
  options: {
    /** Ej. "[data-reveal]" — hijos que entran escalonados. Si no, se anima el propio scope. */
    staggerSelector?: string;
    start?: string;
    stagger?: number;
    y?: number;
    duration?: number;
  } = {}
) {
  const reduced = usePrefersReducedMotion();
  const {
    staggerSelector,
    start = "top 85%",
    stagger = 0.09,
    y = 26,
    duration = 0.7,
  } = options;

  useGSAP(
    () => {
      if (reduced) return; // el markup ya renderiza visible
      const targets = staggerSelector
        ? gsap.utils.toArray<HTMLElement>(staggerSelector)
        : undefined;
      if (staggerSelector && (!targets || targets.length === 0)) return;

      const items = targets ?? [scope.current];
      gsap.set(items, { opacity: 0, y });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration,
        ease: "power2.out",
        stagger,
        scrollTrigger: { trigger: scope.current, start, once: true },
      });
    },
    { scope, dependencies: [reduced] }
  );
}
