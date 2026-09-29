import type { processIcons } from "@/components/zen/icons";

export type Step = {
  title: string;
  /** Nombre del ícono — debe existir en processIcons. */
  icon: keyof typeof processIcons;
  /** Línea corta que resume el paso (se muestra como chip). */
  kicker: string;
  description: string;
};

/**
 * Proceso de trabajo (sección numerada). 4 pasos.
 */
export const steps: Step[] = [
  {
    title: "Diagnóstico",
    icon: "chat",
    kicker: "Escuchamos primero",
    description:
      "Charlamos con vos para entender cómo funciona tu negocio hoy y dónde se traba. Sin tecnicismos: nos contás tu problema, nosotros lo traducimos a un plan.",
  },
  {
    title: "Propuesta",
    icon: "note",
    kicker: "Precio cerrado",
    description:
      "Te dejamos por escrito qué vamos a construir, en cuánto tiempo y con qué alcance. Precio cerrado y sin sorpresas después.",
  },
  {
    title: "Desarrollo",
    icon: "hammer",
    kicker: "Avances reales",
    description:
      "Construimos por etapas y te mostramos avances reales para que pruebes el sistema mientras se desarrolla. Ajustamos sobre la marcha.",
  },
  {
    title: "Entrega y soporte",
    icon: "handshake",
    kicker: "No desaparecemos",
    description:
      "Capacitamos a tu equipo, ponemos todo en producción y quedamos cerca para dar soporte. No desaparecemos después de la entrega.",
  },
];
