/**
 * Asset pesado del Hero — única fuente de verdad.
 *
 * Estrategia (inspirada en craftzdog-uses, adaptada a Next.js):
 * - Development: el archivo vive en `public/video/…` y se sirve desde el propio
 *   dev server (offline-friendly, sin consumo de CDN).
 * - Production: el asset se sirve DIRECTO desde Cloudflare R2 vía
 *   `cdn.aberu.site` (Browser → CDN → R2; Next.js nunca actúa como proxy).
 *
 * La URL base del CDN se configura con `NEXT_PUBLIC_ASSET_CDN_URL` (una URL
 * pública no es un secreto). Si la variable está definida, manda en cualquier
 * entorno; si no, production usa el default y development el asset local.
 *
 * El video NO forma parte del bundle de Next.js: el build solo conoce la URL.
 *
 * Convención de nombres (versionado por contenido): ante un cambio de video,
 * subir el nuevo archivo a R2 con un nombre nuevo (ej. `…_v2.webm`) y
 * actualizar `HERO_VIDEO_FILE`. Así la cache agresiva del CDN
 * (`Cache-Control: public, max-age=31536000, immutable`, ya configurada en
 * cdn.aberu.site) es segura: una URL inmutable jamás cambia de contenido.
 * Reemplazar el mismo archivo en R2 NO invalida automáticamente la cache del
 * CDN (requiere purge manual) — por eso se prefiere renombrar.
 */

/** Nombre del archivo dentro de `/video/` (dev) y de la raíz del bucket R2 (prod). */
const HERO_VIDEO_FILE = "15465338_1920_1080_30fps.webm";

/** CDN público (Cloudflare R2 detrás de Cloudflare). Sin trailing slash. */
const DEFAULT_ASSET_CDN_URL = "https://cdn.aberu.site";

const cdnBaseUrl = (process.env.NEXT_PUBLIC_ASSET_CDN_URL ?? DEFAULT_ASSET_CDN_URL)
  .replace(/\/+$/, "");

/**
 * Src final del video del Hero. Se resuelve en el servidor (Server Component),
 * por lo que el cliente nunca necesita detectar el entorno.
 */
export const heroVideoSrc: string = process.env.NODE_ENV === "production"
  ? `${cdnBaseUrl}/${HERO_VIDEO_FILE}`
  : `/video/${HERO_VIDEO_FILE}`;

/** Poster/fallback estático del Hero (evita flash negro / layout shift). */
export const heroPosterSrc = "/video/hero-poster.avif";
