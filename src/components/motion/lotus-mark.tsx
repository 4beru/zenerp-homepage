"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/motion/gsap";
import { usePrefersReducedMotion } from "@/lib/motion/prefers-reduced-motion";
import { LOTUS_STROKES, LOTUS_CENTER_FILL } from "@/lib/motion/lotus-paths";

/**
 * Flor de loto que se "dibuja" sola: animación de trazo (stroke-dashoffset)
 * en el coral de marca, calmada (power2.inOut).
 * Con prefers-reduced-motion renderiza el loto completo, estático.
 */
export function LotusMark({ size = 220 }: { size?: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      const paths = ref.current.querySelectorAll<SVGPathElement>("[data-stroke]");
      const fill = ref.current.querySelector<SVGPathElement>("[data-fill]");

      // Medir longitud real de cada trazo una sola vez
      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      if (fill) gsap.set(fill, { opacity: 0 });

      const tl = gsap.timeline({ delay: 0.25 });
      tl.to(paths, {
        strokeDashoffset: 0,
        duration: 1.6,
        ease: "power2.inOut",
        stagger: 0.22,
      });
      if (fill) {
        tl.to(fill, { opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.4");
      }
      // Respiración posterior muy sutil (solo transform)
      tl.to(
        ref.current,
        {
          scale: 1.015,
          duration: 3.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          transformOrigin: "50% 55%",
        },
        ">"
      );
    },
    { scope: ref, dependencies: [reduced] }
  );

  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-label="Flor de loto de Zen ERP dibujándose"
    >
      <path data-fill d={LOTUS_CENTER_FILL} fill="rgba(255,171,145,0.14)" />
      <g stroke="#FFAB91" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        {LOTUS_STROKES.map((s, i) => (
          <path key={i} data-stroke d={s.d} opacity={s.o ?? 1} />
        ))}
      </g>
    </svg>
  );
}
