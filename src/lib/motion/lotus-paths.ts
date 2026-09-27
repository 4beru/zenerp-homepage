/**
 * Trazos del loto (vista 0 0 64 64), extraídos de public/logo.svg.
 * `d` = path, `f` = relleno suave opcional (aparece al final del dibujo).
 * Componentes: LotusMark (SVG animado) y data-URI para el placeholder de proyectos.
 */
export const LOTUS_STROKES: { d: string; o?: number }[] = [
  { d: "M32 10 C 27.5 18, 27.5 27, 32 34 C 36.5 27, 36.5 18, 32 10 Z" },
  { d: "M22 17 C 20 25, 23 31, 30 35" },
  { d: "M42 17 C 44 25, 41 31, 34 35" },
  { d: "M13 27 C 15 33, 21 37, 29 38" },
  { d: "M51 27 C 49 33, 43 37, 35 38" },
  { d: "M16 47 C 22 51, 42 51, 48 47", o: 0.55 },
];

/** Lleno suave del pétalo central (se revela al terminar el trazo). */
export const LOTUS_CENTER_FILL =
  "M32 10 C 27.5 18, 27.5 27, 32 34 C 36.5 27, 36.5 18, 32 10 Z";

/** Versión estática en data-URI, para placeholders sin JS. */
export function lotusDataUri(stroke = "%23FFAB91", opacity = 0.3): string {
  const paths = LOTUS_STROKES.map(
    (s) =>
      `<path d='${s.d}' stroke='${stroke}' stroke-opacity='${opacity * (s.o ?? 1)}' stroke-width='2.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/>`
  ).join("");
  return `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>${paths}</svg>`;
}
