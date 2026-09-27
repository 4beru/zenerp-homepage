"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/motion/gsap";
import { usePrefersReducedMotion } from "@/lib/motion/prefers-reduced-motion";

/**
 * Scroll storytelling para "Cómo trabajamos": pinnea el bloque de pasos
 * mientras se hace scroll y resalta el paso activo con scrub.
 * En mobile (<768px) o con prefers-reduced-motion no pinea: solo resalta
 * cada paso al entrar en viewport (sin secuestrar el scroll).
 */
export function usePinnedSteps(
  scope: React.RefObject<HTMLElement | null>,
  stepSelector = "[data-step]",
  progressSelector = "[data-step-progress]"
) {
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const steps = Array.from(root.querySelectorAll<HTMLElement>(stepSelector));
      if (steps.length === 0) return;
      const bars = progressSelector
        ? Array.from(root.querySelectorAll<HTMLElement>(progressSelector))
        : [];

      const setActive = (i: number) => {
        steps.forEach((s, j) => (s.dataset.active = j === i ? "true" : "false"));
        bars.forEach((b, j) => {
          b.style.transform = `scaleY(${j <= i ? 1 : 0})`;
        });
      };
      setActive(0);

      // Fallback sin motion / mobile: reveal simple + resaltado al pasar
      if (reduced || window.innerWidth < 768) {
        steps.forEach((s, i) => {
          gsap.from(s, {
            opacity: 0,
            y: reduced ? 0 : 18,
            duration: reduced ? 0 : 0.6,
            ease: "power2.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: s,
              start: "top 88%",
              once: true,
              onEnter: () => setActive(i),
            },
          });
        });
        return;
      }

      // Desktop: pinneo del panel + scrub por paso
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top+=80",
          end: "+=" + steps.length * 55 + "%",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      steps.forEach((_, i) => {
        tl.call(() => setActive(i));
        if (i < steps.length - 1) tl.to({}, { duration: 1 }); // tramo de scroll por paso
      });
    },
    { scope, dependencies: [reduced] }
  );
}
