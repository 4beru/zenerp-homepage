import { HeroBackground } from "./HeroBackground";
import { HeroContent } from "./HeroContent";

/**
 * Zen ERP — Hero Section (capa de composición).
 *
 * Arquitectura por capas, deliberadamente desacoplada:
 *
 *   Hero
 *    ├── HeroBackground      (Server Component)
 *    │    ├── BackgroundMedia → VideoLayer (<video> nativo)
 *    │    └── VisualOverlay   (gradientes + grain + vignette, CSS puro)
 *    │
 *    └── HeroContent         (Client Component: GSAP entrance + parallax)
 *         ├── Eyebrow / Heading / Description / CTAs
 *         └── Signature + barra de contexto (scroll cue)
 *
 * El <section> define su propia geometría (el video nunca determina la
 * altura): min-h-svh con fallback min-h-screen para navegadores viejos.
 * isolate crea un único stacking context para todo el Hero:
 *   z-0  fondo (media + overlays) · z-10 contenido · z-20 interactivos.
 *
 * SEO/a11y: el contenido semántico (h1, párrafos, CTAs) es independiente del
 * asset visual; el video es decorativo y vive fuera del árbol de accesibilidad.
 */
export function Hero() {
  return (
    <section
      id="inicio"
      aria-label="Zen ERP Opening Scene"
      className="relative flex min-h-screen min-h-svh w-full flex-col justify-between overflow-hidden bg-[#050505] pt-24 pb-6 isolate sm:pt-28 md:pt-32"
    >
      {/* Capa visual: media + overlays (decorativa, aria-hidden) */}
      <HeroBackground />

      {/* Capa semántica e interactiva */}
      <HeroContent />
    </section>
  );
}

export default Hero;
