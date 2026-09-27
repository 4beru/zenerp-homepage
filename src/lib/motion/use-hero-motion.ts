"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/motion/gsap";
import { usePrefersReducedMotion } from "@/lib/motion/prefers-reduced-motion";

/**
 * Movimiento del hero: entrada escalonada del texto + parallax leve
 * (el contenido se desplaza menos que el scroll al salir de pantalla).
 */
export function useHeroMotion(scope: React.RefObject<HTMLElement | null>) {
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      gsap.from("[data-hero-item]", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.12,
        delay: 0.15,
        clearProps: "opacity,transform",
      });
      gsap.to("[data-hero-content]", {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope, dependencies: [reduced] }
  );
}
