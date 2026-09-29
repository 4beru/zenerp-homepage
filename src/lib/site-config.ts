/**
 * Configuración del sitio Zen ERP: marca, contacto y navegación.
 * Cambiá acá el email / WhatsApp reales cuando los definas.
 */
export const siteConfig = {
  name: "Zen ERP",
  tagline: "Software simple, hecho a tu medida.",
  description:
    "Desarrollamos aplicaciones web, mobile y desktop e implementamos sistemas de gestión (ERP) como Odoo y ERPNext, adaptados a tu negocio. Simple, sin complicaciones.",
  url: "https://zenerp.com",

  /** Email donde llegan los leads. */
  email: "contacto@zenerp.com",

  /** WhatsApp para contacto directo. Dejá null para ocultar el botón. */
  whatsapp: {
    displayNumber: "+54 9 11 0000-0000",
    link: "https://wa.me/5491100000000?text=Hola%2C%20quiero%20hablar%20sobre%20un%20proyecto",
  } as { displayNumber: string; link: string } | null,
} as const;

/** Navegación principal. `ready: false` = sección en próximas fases. */
export const navLinks = [
  { href: "#servicios", label: "Servicios", ready: true },
  { href: "#proceso", label: "Proceso", ready: false },
  { href: "#proyectos", label: "Proyectos", ready: false },
  { href: "#contacto", label: "Contacto", ready: true },
] as const;

/** Stack para la tira del hero. */
export const stack = [
  { name: "Odoo", note: "ERP open source todo-en-uno" },
  { name: "ERPNext", note: "ERP flexible, sin licencias" },
  { name: "React", note: "Interfaces web modernas" },
  { name: "Next.js", note: "Web rápida y escalable" },
  { name: "Node.js", note: "Servidor y APIs" },
  { name: "Flutter", note: "Apps iOS y Android" },
  { name: "PostgreSQL", note: "Base de datos confiable" },
  { name: "Python", note: "Automatizaciones y reglas de negocio" },
] as const;
