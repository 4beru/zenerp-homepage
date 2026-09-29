"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Devuelve true recién después de la hidratación en el cliente.
 * Patrón SSR-seguro con useSyncExternalStore (sin setState en efectos):
 * durante la hidratación usa el snapshot del server (false) y luego
 * re-renderiza con el snapshot del cliente (true).
 *
 * Útil para aplicar estilos dependientes de window (scroll, layout)
 * sin mismatches de hidratación.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
