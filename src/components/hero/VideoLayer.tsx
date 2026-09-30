"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export interface VideoLayerProps {
  src: string;
  poster: string;
}

/**
 * VideoLayer — fondo animado del Hero con `<video>` nativo (sin WebGL).
 *
 * - Decorativo: todo el subtree queda fuera del árbol de accesibilidad.
 * - Progressive enhancement / fallback: el `poster` y el fondo del propio
 *   `<section>` garantizan que, si el video no carga o no puede
 *   reproducirse, el Hero siga siendo visualmente válido.
 * - Autoplay: atributos nativos `autoPlay muted loop playsInline`; además,
 *   si la política del navegador bloquea el autoplay, se reintenta una única
 *   vez sobre el primer gesto del usuario (pointerdown, once + passive).
 * - prefers-reduced-motion: no se inicia la reproducción; queda el poster
 *   estático. El gate usa `usePrefersReducedMotion` (hydration-safe: false
 *   durante la hidratación, igual que el render del servidor).
 * - El asset nunca se importa por JS ni se convierte a blob: el navegador lo
 *   solicita directo a la URL estática (dev local / CDN R2).
 */
export function VideoLayer({ src, poster }: VideoLayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced) return;

    // Garantiza muted antes de intentar reproducir (política de autoplay).
    video.muted = true;

    const attemptPlay = () => {
      video.play().catch(() => {
        // Bloqueado por la política del navegador: reintentar con el primer gesto.
        window.addEventListener("pointerdown", () => void video.play().catch(() => {}), {
          once: true,
          passive: true,
        });
      });
    };

    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      attemptPlay();
    } else {
      video.addEventListener("canplay", attemptPlay, { once: true });
    }

    return () => {
      video.removeEventListener("canplay", attemptPlay);
    };
  }, [reduced]);

  return (
    <video
      ref={videoRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 h-full w-full object-cover object-center"
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      tabIndex={-1}
    >
      <source src={src} type="video/webm" />
    </video>
  );
}
