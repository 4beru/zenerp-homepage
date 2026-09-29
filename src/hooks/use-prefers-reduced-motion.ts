"use client";

import { useReducedMotion } from "framer-motion";

/**
 * Devuelve true si el usuario prefiere menos movimiento.
 * Delega en framer-motion (useSyncExternalStore): seguro en SSR y sin
 * setState síncrono en efectos.
 */
export function usePrefersReducedMotion(): boolean {
  return useReducedMotion() ?? false;
}
