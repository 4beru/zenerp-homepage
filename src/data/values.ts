export type Value = {
  icon: "feather" | "lotus" | "handshake";
  title: string;
  description: string;
};

/**
 * Valores de "Por qué Zen ERP". El logo es una flor de loto zen:
 * simple, sin complicaciones, y se adapta a lo que cada cliente necesita.
 */
export const values: Value[] = [
  {
    icon: "feather",
    title: "Simple de usar",
    description:
      "Si tu equipo necesita un manual de 50 páginas, algo está mal. Diseñamos sistemas que se aprenden en minutos.",
  },
  {
    icon: "lotus",
    title: "Se adapta a tu negocio",
    description:
      "Como el loto, el software debe amoldarse a su entorno. No te hacemos cambiar tus procesos para entrar en un producto genérico.",
  },
  {
    icon: "handshake",
    title: "Soporte real, no un ticket perdido",
    description:
      "Hablás directo con quienes construyeron el sistema. Dos personas, nombres y apellidos, siempre del otro lado.",
  },
];
