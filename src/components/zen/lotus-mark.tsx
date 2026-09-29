"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { ZEN_LOGO_PATH } from "@/components/zen/zen-logo-path";

/**
 * Logo oficial de Zen ERP (flor de loto con espirales, terracota).
 * Entrada: se revela con blur + escala muy suaves, como emerge del agua.
 * Después: respiración infinita apenas perceptible + halo cálido detrás.
 * Con prefers-reduced-motion: estático, sin halo animado.
 */
export function LotusMark({ className }: { className?: string }) {
  // Gated: durante la hidratación vale false (igual al server) para que
  // los estilos inline (halo/respiración) y el initial de framer coincidan.
  const reduced = usePrefersReducedMotion();

  return (
    <div className={`relative ${className ?? ""}`}>
      {/* Halo cálido que late detrás del loto */}
      <div
        aria-hidden
        className="zen-halo-el absolute inset-[8%] rounded-full"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(255,138,101,0.20), rgba(255,171,145,0.06) 55%, transparent 72%)",
          filter: "blur(28px)",
          animation: reduced ? "none" : "zen-halo 7s ease-in-out infinite",
        }}
      />

      {/* Respiración sutil del conjunto (solo transform) */}
      <div
        className="relative"
        style={
          reduced
            ? undefined
            : {
                animation:
                  "zen-breathe-logo 9s ease-in-out infinite",
              }
        }
      >
        <motion.svg
          viewBox="0 0 679 454"
          fill="none"
          role="img"
          aria-label="Logo de Zen ERP: flor de loto terracota"
          className="h-auto w-full drop-shadow-[0_18px_50px_rgba(193,97,74,0.28)]"
          initial={reduced ? false : { opacity: 0, scale: 0.94, filter: "blur(14px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
        >
          <path
            d={ZEN_LOGO_PATH}
            fill="#C1614A"
            stroke="#C1614A"
            strokeWidth={10}
            strokeLinejoin="round"
          />
        </motion.svg>
      </div>
    </div>
  );
}
