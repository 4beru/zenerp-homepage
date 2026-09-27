export type Step = {
  title: string;
  description: string;
};

/**
 * Proceso de trabajo (sección numerada). 3 o 4 pasos.
 */
export const steps: Step[] = [
  {
    title: "Diagnóstico",
    description:
      "Charlamos con vos para entender cómo funciona tu negocio hoy y dónde se traba. Sin tecnicismos: nos contás tu problema, nosotros lo traducimos a un plan.",
  },
  {
    title: "Propuesta",
    description:
      "Te dejamos por escrito qué vamos a construir, en cuánto tiempo y con qué alcance. Precio cerrado y sin sorpresas después.",
  },
  {
    title: "Desarrollo",
    description:
      "Construimos por etapas y te mostramos avances reales para que pruebes el sistema mientras se desarrolla. Ajustamos sobre la marcha.",
  },
  {
    title: "Entrega y soporte",
    description:
      "Capacitamos a tu equipo, ponemos todo en producción y quedamos cerca para dar soporte. No desaparecemos después de la entrega.",
  },
];
