/**
 * Equipo de Zen ERP: estudio chico a propósito (placeholder — reemplazar
 * con los datos reales cuando estén definidos, como el email/WhatsApp).
 * Iniciales para el avatar, en línea con los testimonios: honesto y sobrio.
 */
export type TeamMember = {
  name: string;
  role: string;
  /** Presentación breve, primera persona, tono criollo y directo. */
  bio: string;
  initials: string;
  /** Especialidades mostradas como chips mono. */
  specialties: readonly string[];
};

export const team: readonly TeamMember[] = [
  {
    name: "Matías Z.",
    role: "Fundador · Implementaciones ERP",
    bio: "Quince años dentro de fábricas y comercios viendo dónde se pierde la plata: stock que no cierra, planillas que se pisan. Hoy dirige cada implementación de Odoo y ERPNext — y escribe buena parte del código.",
    initials: "MZ",
    specialties: ["Odoo", "ERPNext", "Python", "PostgreSQL"],
  },
  {
    name: "Camila R.",
    role: "Desarrolladora full-stack",
    bio: "Convierte procesos de negocio en pantallas que la gente usa sin manual. Portales B2B, tableros a medida, integraciones raras que nadie quiere heredar — y las deja prolijas.",
    initials: "CR",
    specialties: ["Next.js", "React", "Node.js", "APIs"],
  },
  {
    name: "Joaquín P.",
    role: "Mobile & automatización",
    bio: "Apps de reparto que aguantan un día entero sin señal y choferes que las adoptan sin curso de capacitación. Si un proceso se puede automatizar, ya está pensando cómo.",
    initials: "JP",
    specialties: ["Flutter", "Offline-first", "Sync", "Firebase"],
  },
];

/** Mensaje diferencial del estudio: sin intermediarios. */
export const teamNote =
  "Equipo chico a propósito: quien estima tu proyecto es quien lo programa. Sin capas de gestión, sin gerentes de cuenta, sin teléfonos con música en espera.";
