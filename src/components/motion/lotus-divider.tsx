/**
 * Separador decorativo con el loto de la marca (patrón tomado de la referencia:
 * ilustración orgánica de línea como respiro entre secciones densas).
 * Acá es un SVG estático en el HTML — sin JS, sin costo de rendimiento.
 */
export function LotusDivider({ widthPx = 260 }: { widthPx?: number }) {
  return (
    <div aria-hidden className="pointer-events-none mt-16 flex justify-center select-none">
      <svg width={widthPx} height="56" viewBox="0 0 260 56" fill="none">
        <line x1="6" y1="28" x2="96" y2="28" stroke="url(#fade-l)" strokeWidth="1" />
        <line x1="164" y1="28" x2="254" y2="28" stroke="url(#fade-r)" strokeWidth="1" />
        <g
          transform="translate(104 2) scale(0.82)"
          stroke="#FFAB91"
          strokeOpacity="0.55"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          <path d="M32 10 C 27.5 18, 27.5 27, 32 34 C 36.5 27, 36.5 18, 32 10 Z" fill="rgba(255,171,145,0.08)" />
          <path d="M22 17 C 20 25, 23 31, 30 35" />
          <path d="M42 17 C 44 25, 41 31, 34 35" />
          <path d="M13 27 C 15 33, 21 37, 29 38" />
          <path d="M51 27 C 49 33, 43 37, 35 38" />
          <path d="M16 47 C 22 51, 42 51, 48 47" opacity="0.55" />
        </g>
        <defs>
          <linearGradient id="fade-l" x1="6" y1="28" x2="96" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFAB91" stopOpacity="0" />
            <stop offset="1" stopColor="#FFAB91" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="fade-r" x1="164" y1="28" x2="254" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFAB91" stopOpacity="0.35" />
            <stop offset="1" stopColor="#FFAB91" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
