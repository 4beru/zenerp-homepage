import { HeroBackgroundMedia } from "./HeroBackgroundMedia";
import { heroPosterSrc, heroVideoSrc } from "@/lib/assets";

/**
 * HeroBackground — capa visual completa del Hero (media + overlays).
 * Server Component: el HTML del video y los overlays llega con la respuesta
 * inicial (sin esperar hidratación); solo `VideoLayer` aporta JS mínimo.
 *
 * Stacking explícito dentro de su propio contexto (`isolate`):
 *   z-0  → video / poster        (HeroBackgroundMedia → VideoLayer)
 *   z-10 → gradientes + grain    (legibilidad sobre cualquier frame del video)
 *   z-20 → rejilla arquitectónica
 * El contenido semántico vive en `HeroContent` (z-10/z-20 respecto del
 * <section>, fuera de este nodo), y los elementos interactivos se protegen
 * con z-index propios.
 *
 * Conoce únicamente media/overlays: nada de copy, CTAs ni navegación.
 */
export function HeroBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 isolate select-none"
      aria-hidden="true"
    >
      {/* Fallback estático bajo el video: si el asset falla o no puede
          reproducirse, el fondo conserva la estética oscura del sitio. */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Capa de media (video nativo; punto de extensión para WebGL futuro) */}
      <HeroBackgroundMedia videoSrc={heroVideoSrc} posterSrc={heroPosterSrc} />

      {/* Overlays de legibilidad — configurables, desacoplados del video */}
      <div className="absolute inset-0 z-10">
        {/* Fade lateral izquierdo: titular editorial + descripción */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-[#050505]/50 to-transparent lg:via-[#050505]/35" />
        {/* Transiciones superior/inferior hacia el fondo de la página */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#050505] to-transparent opacity-80" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
        {/* Grain fino + vignette (coste nulo: dos gradientes CSS puros) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(5,5,5,0.55)_100%)]" />
        <div className="hero-grain absolute inset-0 opacity-[0.05]" />
      </div>

      {/* Rejilla arquitectónica tenue (heredada del diseño del Hero) */}
      <div className="absolute inset-0 z-20 opacity-40">
        <div className="absolute top-0 right-[35%] bottom-0 hidden w-px bg-gradient-to-b from-transparent via-[#EEE8D5]/[0.04] to-transparent lg:block" />
        <div className="absolute top-[28%] right-0 left-0 h-px bg-gradient-to-r from-transparent via-[#EEE8D5]/[0.035] to-transparent" />
        <div className="absolute right-0 bottom-[14%] left-0 h-px bg-gradient-to-r from-transparent via-[#EEE8D5]/[0.035] to-transparent" />
      </div>
    </div>
  );
}
