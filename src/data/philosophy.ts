import type { philosophyIcons } from "@/components/zen/icons";

export type Principle = {
  title: string;
  /** Nombre del ícono — debe existir en philosophyIcons. */
  icon: keyof typeof philosophyIcons;
  description: string;
};

/** Frase manifiesto que encabeza la sección. */
export const philosophyQuote = "El mejor software es el que no se nota.";

/**
 * Filosofía de trabajo (sección 05): los principios detrás de "software en calma".
 */
export const principles: Principle[] = [
  {
    title: "Simpleza",
    icon: "leaf",
    description:
      "Menos pantallas, más claridad. Si el software necesita un manual para usarse, algo está mal diseñado.",
  },
  {
    title: "Transparencia",
    icon: "eye",
    description:
      "Precio cerrado por escrito, avances que podés probar con tus manos y decisiones explicadas en criollo.",
  },
  {
    title: "Cercanía",
    icon: "users",
    description:
      "Hablás directo con quien escribe el código. Nada de intermediarios ni tickets que nadie lee.",
  },
  {
    title: "Calma",
    icon: "moon",
    description:
      "Sistemas que trabajan en silencio: cuando todo funciona bien, el software desaparece de tu día.",
  },
];
