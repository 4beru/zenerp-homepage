import { VideoLayer } from "./VideoLayer";

export interface HeroBackgroundMediaProps {
  /** Src del video (local en dev, CDN en prod). Resuelto en el servidor. */
  videoSrc: string;
  /** Poster/fallback estático decorativo. */
  posterSrc: string;
}

/**
 * Capa de media del Hero — Server Component.
 *
 * Punto de extensión para la futura capa WebGL: hoy delega en `VideoLayer`
 * (`<video>` nativo); mañana podrá conmutarse a un `WebGLLayer` que tome el
 * mismo HTMLVideoElement como textura, sin tocar `HeroContent`, layout, SEO
 * ni la estructura responsive.
 *
 * Renderiza en el servidor: el navegador pide el video directamente al
 * origen (dev server o CDN) sin esperar al JS de React.
 */
export function HeroBackgroundMedia({ videoSrc, posterSrc }: HeroBackgroundMediaProps) {
  return <VideoLayer src={videoSrc} poster={posterSrc} />;
}
