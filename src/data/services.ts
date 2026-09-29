import type { serviceIcons } from "@/components/zen/icons";

export type Service = {
  id: string;
  /** Nombre del ícono — debe existir en serviceIcons. */
  icon: keyof typeof serviceIcons;
  title: string;
  description: string;
  /** Palabra corta para el chip "de qué se trata". */
  tag: string;
};

/**
 * Servicios ofrecidos. Editá libremente: se renderizan como grid en la home.
 */
export const services: Service[] = [
  {
    id: "desarrollo-web",
    icon: "web",
    tag: "Navegador",
    title: "Desarrollo Web",
    description:
      "Sitios y plataformas que tus clientes y tu equipo usan desde el navegador, sin instalar nada.",
  },
  {
    id: "apps-mobile",
    icon: "mobile",
    tag: "iOS · Android",
    title: "Apps Mobile",
    description:
      "Aplicaciones para celular pensadas para el día a día de tu negocio, en tu bolsillo.",
  },
  {
    id: "apps-desktop",
    icon: "desktop",
    tag: "Offline",
    title: "Apps Desktop",
    description:
      "Programas para PC que funcionan incluso sin conexión, ideales para depósitos, mostradores o fábricas.",
  },
  {
    id: "implementacion-odoo",
    icon: "odoo",
    tag: "ERP todo-en-uno",
    title: "Implementación de Odoo",
    description:
      "Odoo es un sistema todo-en-uno para administrar ventas, stock, facturación y más. Lo configuramos a tu medida.",
  },
  {
    id: "implementacion-erpnext",
    icon: "erpnext",
    tag: "Sin licencias",
    title: "Implementación de ERPNext",
    description:
      "ERPNext es un sistema de gestión flexible y sin costos de licencia. Lo adaptamos a tus procesos reales.",
  },
  {
    id: "desarrollos-a-medida",
    icon: "puzzle",
    tag: "A medida",
    title: "Desarrollos a medida",
    description:
      "¿Nada del mercado encaja con lo que necesitás? Diseñamos y construimos exactamente lo que tu operación pide.",
  },
];
