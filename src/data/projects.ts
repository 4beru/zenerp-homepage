export type Project = {
  id: string;
  title: string;
  category: "Mobile" | "Desktop" | "Web" | "ERP";
  description: string;
  /** Ruta de la imagen dentro de /public (ej. "/projects/pos-desktop.png"). */
  image?: string;
  /** Texto alternativo obligatorio para accesibilidad. */
  alt?: string;
};

/**
 * Proyectos del portfolio.
 * Para agregar uno nuevo: creá la entrada acá y subí la captura a /public/projects/.
 * Si un proyecto todavía no tiene imagen, dejá `image` sin valor: la tarjeta
 * muestra un placeholder listo para reemplazar.
 */
export const projects: Project[] = [
  {
    id: "erp-retail",
    title: "Sistema de gestión para comercio retail",
    category: "ERP",
    description:
      "Punto de venta, stock y facturación en un solo sistema, hoy en producción.",
  },
  {
    id: "erp-distribucion",
    title: "ERP para negocio de distribución",
    category: "ERP",
    description:
      "Depósito, rutas de entrega y cobranzas organizadas en un único lugar.",
  },
  {
    id: "erp-servicios",
    title: "Gestión integral para empresa de servicios",
    category: "ERP",
    description:
      "Contratos, tareas y facturación mensual sin planillas dispersas.",
  },
  {
    id: "app-mobile-campo",
    title: "App mobile para fuerza de ventas",
    category: "Mobile",
    description:
      "Pedidos y visitas cargadas desde el celular, con o sin conexión.",
  },
  {
    id: "app-desktop-pos",
    title: "Aplicación desktop de punto de venta",
    category: "Desktop",
    description:
      "Caja rápida para mostrador, preparada para lector de código de barras e impresora fiscal.",
  },
];

/** Estadística real destacada de la sección (no inventar cifras). */
export const projectStats = {
  value: "3",
  label: "sistemas ERP vendidos, implementados y hoy en producción",
} as const;
