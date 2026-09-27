export type StackItem = {
  name: string;
  /** Corte de lo que es / para qué sirve, en una línea simple. */
  note: string;
};

/**
 * Stack / tecnologías con las que trabajamos (fila de badges).
 */
export const stack: StackItem[] = [
  { name: "Odoo", note: "ERP open source todo-en-uno" },
  { name: "ERPNext", note: "ERP flexible, sin licencias" },
  { name: "React", note: "Interfaces web modernas" },
  { name: "Next.js", note: "Web rápida y escalable" },
  { name: "Node.js", note: "Servidor y APIs" },
  { name: "Flutter", note: "Apps iOS y Android" },
  { name: "PostgreSQL", note: "Base de datos confiable" },
  { name: "Python", note: "Automatizaciones y reglas de negocio" },
];
