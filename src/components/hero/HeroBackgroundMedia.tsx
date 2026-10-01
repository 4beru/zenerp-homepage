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
 * La media se delega directamente en VideoLayer (<video> nativo),
 * manteniendo el fondo aislado del contenido semántico y del layout.
 *
 * Renderiza en el servidor: el navegador pide el video directamente al
 * origen (dev server o CDN) sin esperar al JS de React.
 */
export function HeroBackgroundMedia({ videoSrc, posterSrc }: HeroBackgroundMediaProps) {
  return <VideoLayer src={videoSrc} poster={posterSrc} />;
}
