/**
 * Módulos para "Armá tu sistema" (sección 09): catálogo de capacidades
 * típicas de un ERP. La complejidad es RELATIVA (cuánto suele pesar cada
 * módulo dentro de una implementación), no una promesa de tiempo ni precio:
 * el diagnóstico gratuito es el que define etapas y presupuesto.
 */

export type ModuleComplexity = 1 | 2 | 3;

export type ModuleArea = {
  id: string;
  label: string;
  /** Palabra corta que resume el área (chip del resumen). */
  short: string;
};

export type ErpModule = {
  id: string;
  area: string;
  name: string;
  /** Qué te resuelve, en una línea honesta. */
  note: string;
  /** Peso relativo dentro de una implementación (1 liviano · 3 pesado). */
  complexity: ModuleComplexity;
};

export const moduleAreas: ModuleArea[] = [
  { id: "ventas", label: "Ventas y clientes", short: "Ventas" },
  { id: "finanzas", label: "Finanzas", short: "Finanzas" },
  { id: "operaciones", label: "Operaciones", short: "Operaciones" },
  { id: "equipo", label: "Equipo y datos", short: "Equipo" },
];

export const erpModules: ErpModule[] = [
  // — Ventas y clientes —
  {
    id: "crm",
    area: "ventas",
    name: "CRM y seguimiento",
    note: "Pipeline de clientes con recordatorios: nada queda sin respuesta.",
    complexity: 1,
  },
  {
    id: "cotizaciones",
    area: "ventas",
    name: "Cotizaciones y pedidos",
    note: "Del presupuesto a la venta sin volver a cargar nada a mano.",
    complexity: 1,
  },
  {
    id: "facturacion",
    area: "ventas",
    name: "Facturación electrónica",
    note: "Comprobantes fiscales (AFIP/ARCA) desde el mismo sistema.",
    complexity: 2,
  },
  {
    id: "ecommerce",
    area: "ventas",
    name: "Tienda online",
    note: "Vendé y descontá stock en el mismo lugar, sin dobles cargas.",
    complexity: 3,
  },
  // — Finanzas —
  {
    id: "contabilidad",
    area: "finanzas",
    name: "Contabilidad",
    note: "Asientos que se arman solos desde ventas y compras.",
    complexity: 2,
  },
  {
    id: "tesoreria",
    area: "finanzas",
    name: "Cobros y pagos",
    note: "Vencimientos, cheques y conciliación sin planillas paralelas.",
    complexity: 1,
  },
  // — Operaciones —
  {
    id: "inventario",
    area: "operaciones",
    name: "Inventario y depósitos",
    note: "Stock en tiempo real, por sucursal o por lote.",
    complexity: 2,
  },
  {
    id: "compras",
    area: "operaciones",
    name: "Compras y proveedores",
    note: "Reposición basada en lo que realmente vendés, no en corazonadas.",
    complexity: 1,
  },
  {
    id: "produccion",
    area: "operaciones",
    name: "Producción",
    note: "Órdenes, listas de materiales y trazabilidad de cada lote.",
    complexity: 3,
  },
  {
    id: "logistica",
    area: "operaciones",
    name: "Logística y repartos",
    note: "Hojas de ruta y cobranza en el camino, incluso sin señal.",
    complexity: 3,
  },
  // — Equipo y datos —
  {
    id: "rrhh",
    area: "equipo",
    name: "RRHH básico",
    note: "Legajos, ausencias y fichaje del equipo en un solo lugar.",
    complexity: 1,
  },
  {
    id: "reportes",
    area: "equipo",
    name: "Tableros y reportes",
    note: "Indicadores vivos, no exportaciones a fin de mes.",
    complexity: 2,
  },
  {
    id: "integraciones",
    area: "equipo",
    name: "Integraciones",
    note: "MercadoPago, el correo, tu contador: todos conversando.",
    complexity: 2,
  },
];

/** Mapa rápido id → módulo (para el resumen). */
export const modulesById: Record<string, ErpModule> = Object.fromEntries(
  erpModules.map((m) => [m.id, m])
);

/**
 * Tramos de alcance relativo. Los cortes son deliberadamente amplios:
 * sirven como idioma común para arrancar la conversación, no como cotización.
 */
export type ScopeTier = {
  id: "sencillo" | "intermedio" | "ambicioso";
  label: string;
  /** Suma de complejidad que activa el tramo. */
  upTo: number;
  blurb: string;
};

export const scopeTiers: ScopeTier[] = [
  {
    id: "sencillo",
    label: "Sencillo",
    upTo: 3,
    blurb:
      "Un arranque ordenado: pocos módulos, primera etapa corta y visible.",
  },
  {
    id: "intermedio",
    label: "Intermedio",
    upTo: 7,
    blurb:
      "Integración por etapas: cada área entra a su ritmo, sin gran salto.",
  },
  {
    id: "ambicioso",
    label: "Ambicioso",
    upTo: Infinity,
    blurb:
      "Transformación integral: conviene combinar caminos y planificar bien.",
  },
];

/** Devuelve el tramo para una suma de complejidad dada. */
export function tierForScore(score: number): ScopeTier {
  return scopeTiers.find((t) => score <= t.upTo) ?? scopeTiers[scopeTiers.length - 1];
}
