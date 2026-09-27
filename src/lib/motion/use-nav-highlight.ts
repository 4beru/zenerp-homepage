"use client";

import { useGSAP } from "@gsap/react";
// solo se usa useGSAP (scope + limpieza); el resaltado activo va con IntersectionObserver

/**
 * Resalta el link activo del nav según la sección visible.
 * Usa IntersectionObserver (más liviano que un ScrollTrigger por sección);
 * el underline animado es puro CSS (.nav-link::after), así funciona igual
 * con prefers-reduced-motion (sin transición).
 */
export function useNavHighlight(scope: React.RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const links = Array.from(
        scope.current?.querySelectorAll<HTMLAnchorElement>("[data-navlink]") ?? []
      );
      if (links.length === 0) return;

      const byId = new Map<string, HTMLAnchorElement>();
      links.forEach((l) => {
        const id = l.getAttribute("href")?.replace("#", "");
        if (id) byId.set(id, l);
      });

      const sections = Array.from(byId.keys())
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => !!el);

      const setActive = (id: string | null) => {
        links.forEach((l) => {
          const active = l.getAttribute("href") === `#${id}`;
          l.classList.toggle("is-active", active);
          l.classList.toggle("is-inactive", !active);
        });
      };

      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) setActive(e.target.id);
          }
        },
        // franja horizontal a la altura superior-media de la ventana
        { rootMargin: "-35% 0px -55% 0px" }
      );
      sections.forEach((s) => io.observe(s));

      return () => io.disconnect();
    },
    { scope }
  );
}
