"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpIcon } from "@/components/zen/icons";

/**
 * Botón flotante "volver arriba": aparece tras scrollear ~600px,
 * con entrada/salida suave. Click → scroll top con comportamiento nativo
 * (respeta prefers-reduced-motion vía CSS scroll-behavior).
 */
export function BackToTop() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })}
      aria-label="Volver arriba"
      className="glass-card fixed right-5 bottom-5 z-50 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-zen-muted hover:text-zen-accent print:hidden sm:right-8 sm:bottom-8"
      style={{ pointerEvents: visible ? "auto" : "none" }}
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      tabIndex={visible ? 0 : -1}
    >
      <ArrowUpIcon width={18} height={18} />
    </motion.button>
  );
}
