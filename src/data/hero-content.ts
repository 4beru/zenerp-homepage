/**
 * Zen ERP — Creative Software Studio
 * Externalized, data-driven copy for the Hero section.
 * Supports primary English creative statement and Spanish translation.
 */

export interface HeroLocaleContent {
  studioLabel: string;
  studioRole: string;
  headline: string[];
  description: string;
  primaryCta: {
    label: string;
    action: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  signature: {
    brand: string;
    tagline: string;
    coordinates: string;
  };
  contextualLabels: {
    arch: string;
    eng: string;
    systems: string;
  };
  fieldNotice: {
    title: string;
    status: string;
  };
  scrollCue: string;
}

export const heroContent: Record<"en" | "es", HeroLocaleContent> = {
  en: {
    studioLabel: "Creative Software Studio",
    studioRole: "Digital Product Architecture & Engineering",
    headline: [
      "WE DESIGN.",
      "WE ENGINEER.",
      "WE TRANSFORM.",
    ],
    description:
      "We design and engineer custom digital products and bespoke management platforms for businesses that want software built around the way they actually work.",
    primaryCta: {
      label: "Start a project",
      action: "contact",
    },
    secondaryCta: {
      label: "Explore our work",
      href: "#proyectos",
    },
    signature: {
      brand: "ZEN ERP",
      tagline: "Creative Software Studio",
      coordinates: "34° 36' S · 58° 22' W // BUENOS AIRES · GLOBAL",
    },
    contextualLabels: {
      arch: "01 / Architecture",
      eng: "02 / Engineering",
      systems: "03 / Digital Systems",
    },
    fieldNotice: {
      title: "PARTICLE LOGO FIELD",
      status: "RESERVED SPATIAL FIELD",
    },
    scrollCue: "/// Scroll to explore",
  },
  es: {
    studioLabel: "Estudio Creativo de Software",
    studioRole: "Arquitectura e Ingeniería de Productos Digitales",
    headline: [
      "DISEÑAMOS.",
      "CONSTRUIMOS.",
      "TRANSFORMAMOS.",
    ],
    description:
      "Diseñamos y desarrollamos productos digitales a medida y sistemas de gestión para empresas que buscan software concebido alrededor de su forma real de operar.",
    primaryCta: {
      label: "Iniciar un proyecto",
      action: "contact",
    },
    secondaryCta: {
      label: "Ver nuestros proyectos",
      href: "#proyectos",
    },
    signature: {
      brand: "ZEN ERP",
      tagline: "Estudio Creativo de Software",
      coordinates: "34° 36' S · 58° 22' O // BUENOS AIRES · GLOBAL",
    },
    contextualLabels: {
      arch: "01 / Arquitectura",
      eng: "02 / Ingeniería",
      systems: "03 / Sistemas Digitales",
    },
    fieldNotice: {
      title: "CAMPO DE PARTÍCULAS",
      status: "ZONA ESPACIAL RESERVADA",
    },
    scrollCue: "/// Deslizá para explorar",
  },
};
