"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/motion/gsap";
import { usePrefersReducedMotion } from "@/lib/motion/prefers-reduced-motion";

/**
 * Contador animado: cuenta de 0 → `to` cuando el elemento entra en viewport.
 * El SSR renderiza el número final (buen SEO y fallback sin JS); la animación
 * solo ocurre en cliente y nunca con prefers-reduced-motion.
 * Usar solo sobre cifras reales.
 */
export function useCountUp(to: number, duration = 1.4) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return;
      const obj = { v: 0 };
      gsap.set(el, { innerText: "0" });
      gsap.to(obj, {
        v: to,
        duration,
        ease: "power2.out",
        snap: { v: 1 },
        onUpdate: () => {
          el.textContent = String(Math.round(obj.v));
        },
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    },
    { scope: ref, dependencies: [reduced, to, duration] }
  );

  return ref;
}
