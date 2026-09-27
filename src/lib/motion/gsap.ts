/**
 * Registro central de GSAP — solo en cliente.
 * Importar `gsap` y `ScrollTrigger` ya registrados desde este módulo
 * (nunca registrar plugins durante el render del servidor).
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
