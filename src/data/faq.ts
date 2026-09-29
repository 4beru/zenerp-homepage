/**
 * Preguntas frecuentes: las dudas reales que llegan antes de un proyecto.
 * La primera respuesta honesta es "depende" — estas son las segundas.
 */
export type FaqItem = {
  question: string;
  answer: string;
};

export const faqs: FaqItem[] = [
  {
    question: "¿Cuánto cuesta un proyecto?",
    answer:
      "Depende del alcance, y por eso no te vamos a tirar un número al aire. Tras el diagnóstico inicial (gratuito) armamos una propuesta con precio cerrado por etapas: sabés cuánto cuesta cada paso antes de comprometerte. Las implementaciones de Odoo o ERPNext arrancan generalmente más accesibles que un desarrollo 100% a medida.",
  },
  {
    question: "¿Cuánto tarda ver algo funcionando?",
    answer:
      "Una implementación estándar de ERP (ventas, compras, stock, facturación) suele estar operativa en 6 a 10 semanas. Un desarrollo a medida muestra su primera versión usable en 3 a 5 semanas. Trabajamos por etapas cortas con avances reales: ves el sistema crecer sprint a sprint, no un caja negra que se abre al final.",
  },
  {
    question: "¿Qué pasa con mis datos y mi sistema actual?",
    answer:
      "Los migrás con nosotros. Importamos artículos, clientes, proveedores y saldos de stock desde planillas o tu sistema anterior, y validamos todo contra tus números antes de cambiar de un día para el otro. La puesta en marcha es progresiva: primero convive con lo viejo, después lo reemplaza.",
  },
  {
    question: "¿Me conviene Odoo o ERPNext?",
    answer:
      "Los dos son excelentes y open source; la diferencia está en tu operación. Odoo brilla si querés un ecosistema todo-en-uno con apps ya armadas (CRM, e-commerce, contabilidad). ERPNext es más flexible y liviano para flujos raros o multi-empresa, sin licencias por módulo. En el diagnóstico te decimos cuál encaja mejor — incluso si la respuesta es «ninguno de los dos».",
  },
  {
    question: "¿Qué pasa después de la entrega?",
    answer:
      "No desaparecemos. Todo proyecto incluye un período de acompañamiento con ajustes incluidos, y después podés quedarte con un plan de soporte mensual (actualizaciones, backups, mejoras) o simplemente administrarlo vos. Sin contratos eternos: el sistema es tuyo.",
  },
  {
    question: "¿De quién es el código?",
    answer:
      "Tuyo. En desarrollos a medida recibís el código fuente completo y la documentación para que cualquier otro equipo pueda continuar. En Odoo/ERPNext, al ser open source, no hay vendor lock-in: tu inversión queda en tu negocio, no atada a una licencia.",
  },
];
