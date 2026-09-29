"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * MotionConfig global para todo el árbol de framer-motion.
 *
 * reducedMotion "always" cuando el dispositivo prefiere menos movimiento:
 * framer desactiva las animaciones de transform/layout (x, y, scale…) y
 * deja solo los fades de opacidad — el contenido aparece sin movimiento,
 * cumpliendo WCAG sin duplicar gating manual en cada componente.
 *
 * Hidratación-segura: el valor se gatea con usePrefersReducedMotion
 * (false durante la hidratación → "never", igual al render del servidor).
 * Si se pasara "user" estático, framer resolvería el estado inicial de
 * cada motion element con la preferencia real del dispositivo durante la
 * hidratación y mismatchearía los style del HTML del servidor.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  return (
    <MotionConfig reducedMotion={"never"}>
      {children}
    </MotionConfig>
  );
}
