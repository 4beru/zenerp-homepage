"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/motion/gsap";
import { usePrefersReducedMotion } from "@/lib/motion/prefers-reduced-motion";

/**
 * Parallax leve: mueve `selector` en Y a ritmo distinto del scroll
 * (scrub suave). Solo transforma `y` — nunca propiedades que disparen layout.
 * @param speed negativo = más lento que el scroll (texto del hero), positivo = más rápido.
 */
export function useParallax(
  scope: React.RefObject<HTMLElement | null>,
  selector: string,
  distancePx: number
) {
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const el = scope.current?.querySelector<HTMLElement>(selector);
      if (!el) return;
      gsap.fromTo(
        el,
        { y: 0 },
        {
          y: distancePx,
          ease: "none",
          scrollTrigger: { trigger: scope.current, start: "top top", end: "bottom top", scrub: 1 },
        }
      );
    },
    { scope, dependencies: [reduced, selector, distancePx] }
  );
}
