export type Service = {
  id: string;
  /** Nombre del ícono — debe existir en src/components/icons.tsx */
  icon: "web" | "mobile" | "desktop" | "odoo" | "erpnext" | "puzzle";
  title: string;
  description: string;
};

/**
 * Servicios ofrecidos. Editá libremente: se renderizan como grid en la home.
 */
export const services: Service[] = [
  {
    id: "desarrollo-web",
    icon: "web",
    title: "Desarrollo Web",
    description:
      "Sitios y plataformas que tus clientes y tu equipo usan desde el navegador, sin instalar nada.",
  },
  {
    id: "apps-mobile",
    icon: "mobile",
    title: "Apps Mobile",
    description:
      "Aplicaciones para celular (Android y iPhone) pensadas para el día a día de tu negocio.",
  },
  {
    id: "apps-desktop",
    icon: "desktop",
    title: "Apps Desktop",
    description:
      "Programas para PC que funcionan incluso sin conexión, ideales para depósitos, mostradores o fábricas.",
  },
  {
    id: "implementacion-odoo",
    icon: "odoo",
    title: "Implementación de Odoo",
    description:
      "Odoo es un sistema todo-en-uno para administrar ventas, stock, facturación y más. Lo configuramos a tu medida.",
  },
  {
    id: "implementacion-erpnext",
    icon: "erpnext",
    title: "Implementación de ERPNext",
    description:
      "ERPNext es un sistema de gestión flexible y sin costos de licencia. Lo adaptamos a tus procesos reales.",
  },
  {
    id: "desarrollos-a-medida",
    icon: "puzzle",
    title: "Desarrollos a medida",
    description:
      "¿Nada del mercado encaja con lo que necesitás? Diseñamos y construimos exactamente lo que tu operación pide.",
  },
];
