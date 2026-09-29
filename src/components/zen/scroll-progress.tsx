"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useHydrated } from "@/hooks/use-hydrated";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Barra de progreso de scroll: línea coral fina (2px) fija arriba de todo.
 * Se aplica tras hidratar (gate con useHydrated) para no mismatchear el SSR
 * si la página se hidrata con scroll intermedio (refresh a mitad de página).
 */
export function ScrollProgress() {
  const reduced = usePrefersReducedMotion();
  const hydrated = useHydrated();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  if (reduced || !hydrated) return null;

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left print:hidden"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, rgba(255,171,145,0.5), #ffab91, #ff8a65)",
      }}
    />
  );
}
