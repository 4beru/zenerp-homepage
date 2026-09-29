/**
 * Rate limiting en memoria (ventana deslizante) para rutas públicas de
 * bajo volumen. Suficiente para un landing con un solo proceso Node; si
 * algún día hay múltiples instancias, mover a un store compartido (Redis).
 */
const hits = new Map<string, number[]>();

/**
 * Devuelve ok=false cuando `key` superó `limit` hits en los últimos
 * `windowMs` milisegundos. `retryAfter` viene en segundos (para el
 * header estándar Retry-After).
 */
export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 60_000
): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const window = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

  if (window.length >= limit) {
    hits.set(key, window);
    // Mantenimiento ocasional: el mapa no crece sin límite.
    if (hits.size > 500) prune(now, windowMs);
    return {
      ok: false,
      retryAfter: Math.max(1, Math.ceil((window[0] + windowMs - now) / 1000)),
    };
  }

  window.push(now);
  hits.set(key, window);
  return { ok: true, retryAfter: 0 };
}

function prune(now: number, windowMs: number) {
  for (const [key, times] of hits) {
    const alive = times.filter((t) => now - t < windowMs);
    if (alive.length === 0) hits.delete(key);
    else hits.set(key, alive);
  }
}
