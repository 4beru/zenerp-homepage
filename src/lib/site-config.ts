/**
 * Configuración del sitio: marca, medios de contacto y datos editables.
 * Cambiá acá el email / WhatsApp reales cuando los definas.
 */
export const siteConfig = {
  name: "Zen ERP",
  tagline: "Software simple, hecho a tu medida.",
  description:
    "Desarrollamos aplicaciones web, mobile y desktop e implementamos sistemas de gestión (ERP) como Odoo y ERPNext, adaptados a tu negocio. Simple, sin complicaciones.",
  url: "https://zenerp.com",

  /** Email donde llegan los leads (configurar también RESEND_TO_EMAIL en Vercel). */
  email: "contacto@zenerp.com",

  /** WhatsApp para contacto directo. Dejá null para ocultar el botón. */
  whatsapp: {
    displayNumber: "+54 9 11 0000-0000",
    link: "https://wa.me/5491100000000?text=Hola%2C%20quiero%20hablar%20sobre%20un%20proyecto",
  } as { displayNumber: string; link: string } | null,
} as const;
