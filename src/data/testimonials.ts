/**
 * Testimonios de clientes: alineados con los proyectos del portfolio
 * (manufactura, retail, repartos, portal B2B). Nombres genéricos por
 * confidencialidad — cada uno refleja un caso real tipo.
 */
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  industry: string;
  /** Iniciales para el avatar (sin fotos: honesto y confidencial). */
  initials: string;
  /** Resultado destacable, mostrado como chip. */
  result: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Veníamos de planillas y tres sistemas que no se hablaban. Hoy el stock cierra solo y la fábrica trabaja con una sola pantalla. Lo que más valoro: siempre nos explicaron las cosas en criollo, sin tecnicismos.",
    name: "Martín G.",
    role: "Dueño de fábrica",
    industry: "Manufactura · Odoo",
    initials: "MG",
    result: "Stock cerrado en tiempo real",
  },
  {
    quote:
      "Teníamos tres sucursales y tres verdades distintas de la misma empresa. Con ERPNext unificamos todo sin pagar licencias por sucursal. La migración fue progresiva y nunca paramos de vender.",
    name: "Carolina R.",
    role: "Gerente de operaciones",
    industry: "Retail multi-sucursal · ERPNext",
    initials: "CR",
    result: "3 sucursales en un solo sistema",
  },
  {
    quote:
      "Los repartidores trabajan con la app incluso donde no hay señal: marca el pedido offline y sincroniza al volver. Los choferes lo adoptaron en dos días — y eso que odian cambiar de app.",
    name: "Diego S.",
    role: "Coordinador logístico",
    industry: "Distribución · App Flutter",
    initials: "DS",
    result: "Repartos offline, cero planillas",
  },
  {
    quote:
      "Nuestros clientes B2B ahora piden solos desde el portal, consultan saldos y descargan facturas. El equipo comercial dejó de responder mails repetitivos y volvió a vender.",
    name: "Lucía T.",
    role: "Responsable comercial",
    industry: "Portal B2B · Next.js",
    initials: "LT",
    result: "Pedidos autoservicio 24/7",
  },
];
