"use client";

import { useReducedMotion } from "framer-motion";
import { useHydrated } from "@/hooks/use-hydrated";

/**
 * Devuelve true si el usuario prefiere menos movimiento.
 *
 * Hidratación-segura: framer-motion resuelve useReducedMotion con un
 * useState(matchMedia(...)) que ya vale `true` en el primer render del
 * cliente, mientras el servidor renderizó con `false` → mismatch de
 * atributos (style/initial de motion) y de texto (count-ups) para usuarios
 * con reduced-motion activo.
 *
 * Acá lo gateamos con useHydrated: durante la hidratación devolvemos false
 * (idéntico al render del servidor) y recién tras el mount reflejamos la
 * preferencia real del dispositivo. El flip posterior es un re-render
 * normal de React, sin mismatch.
 */
export function usePrefersReducedMotion(): boolean {
  const reduced = useReducedMotion() ?? false;
  const hydrated = useHydrated();
  return hydrated ? reduced : false;
}
