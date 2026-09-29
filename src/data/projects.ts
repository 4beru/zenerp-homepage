import type { projectIcons } from "@/components/zen/icons";

export type Project = {
  id: string;
  title: string;
  /** Chip de contexto: "Manufactura · Odoo". */
  category: string;
  description: string;
  /** Stack técnico que se muestra como chips. */
  stack: string[];
  /** Resultado medible del proyecto. */
  metric: { value: string; label: string };
  year: string;
  /** Nombre del ícono — debe existir en projectIcons. */
  icon: keyof typeof projectIcons;
};

/**
 * Proyectos (sección 04). Casos reales con nombres ilustrativos
 * por acuerdos de confidencialidad con cada cliente.
 */
export const projects: Project[] = [
  {
    id: "manufactura-odoo",
    title: "ERP de manufactura",
    category: "Manufactura · Odoo",
    description:
      "Producción, trazabilidad de lotes y stock en tiempo real para una fábrica de envases. Reemplazó tres planillas de Excel y un sistema heredado que nadie extraña.",
    stack: ["Odoo", "Python", "PostgreSQL"],
    metric: { value: "−70%", label: "de tiempo en la carga de órdenes" },
    year: "2024",
    icon: "factory",
  },
  {
    id: "retail-erpnext",
    title: "Gestión multi-sucursal",
    category: "Retail · ERPNext",
    description:
      "Ventas, facturación electrónica y stock unificado para una cadena de vidrierías. Cada sucursal ve precios y saldos actualizados al minuto.",
    stack: ["ERPNext", "Frappe", "PostgreSQL"],
    metric: { value: "4", label: "sucursales conectadas en tiempo real" },
    year: "2024",
    icon: "store",
  },
  {
    id: "app-repartos",
    title: "App de repartos",
    category: "Logística · App mobile",
    description:
      "Hoja de ruta, comprobantes y cobranzas offline para un distribuidor mayorista. Los repartos se sincronizan cuando vuelve la señal.",
    stack: ["Flutter", "Node.js", "PostgreSQL"],
    metric: { value: "300+", label: "repartos diarios, incluso sin señal" },
    year: "2023",
    icon: "truck",
  },
  {
    id: "portal-autoservicio",
    title: "Portal de autoservicio",
    category: "Web B2B · Next.js",
    description:
      "Portal para que los clientes de un servicio B2B consulten facturas, tickets y estados de sus pedidos sin escribir un solo email.",
    stack: ["Next.js", "React", "Node.js"],
    metric: { value: "−60%", label: "de llamadas al soporte" },
    year: "2023",
    icon: "globe",
  },
];

/** Nota de honestidad sobre los nombres de los casos. */
export const projectsDisclaimer =
  "Casos reales de producción; usamos nombres ilustrativos por acuerdos de confidencialidad con cada cliente.";

/**
 * Glosario de tecnologías para los chips del stack: una línea honesta
 * sobre qué aporta cada una (se muestra como tooltip al pasar el mouse).
 */
export const techGlossary: Record<string, string> = {
  Odoo: "ERP open source todo-en-uno: de ventas a contabilidad.",
  ERPNext: "ERP flexible y sin licencias por módulo.",
  Frappe: "El framework sobre el que corre ERPNext (y sus apps).",
  Python: "Automatizaciones y reglas de negocio a medida.",
  PostgreSQL: "Base de datos confiable y open source.",
  Flutter: "Apps iOS y Android desde una sola base de código.",
  "Node.js": "Servidor y APIs en JavaScript, rápido de extender.",
  "Next.js": "Web rápida y escalable, render híbrido con React.",
  React: "Interfaces web modernas y mantenibles.",
};
