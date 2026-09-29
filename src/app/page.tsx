import { Header } from "@/components/zen/header";
import { Hero } from "@/components/zen/hero";
import { Services } from "@/components/zen/services";
import { Process } from "@/components/zen/process";
import { Projects } from "@/components/zen/projects";
import { Stats } from "@/components/zen/stats";
import { Testimonials } from "@/components/zen/testimonials";
import { Team } from "@/components/zen/team";
import { Philosophy } from "@/components/zen/philosophy";
import { Faq } from "@/components/zen/faq";
import { ContactSection } from "@/components/zen/contact-section";
import { Footer } from "@/components/zen/footer";
import { ContactDialog } from "@/components/zen/contact-dialog";
import { ScrollProgress } from "@/components/zen/scroll-progress";
import { BackToTop } from "@/components/zen/back-to-top";
import { faqs } from "@/data/faq";

/** Datos estructurados (FAQPage) para resultados enriquecidos en buscadores. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  })),
};

/**
 * Zen ERP — Homepage.
 * Fase 01: Hero. Fase 02: Servicios. Fase 03: Proceso.
 * Fase 04: Proyectos, Filosofía y CTA final. Fase 05: FAQ.
 * Fase 06: Testimonios (carrusel sereno). Fase 07: Contacto completo.
 * Fase 08: Equipo + Privacidad + rate limiting.
 * Fase 09: banda de métricas (count-up) + asistente del FAQ.
 */
export default function Home() {
  return (
    <div className="flex min-h-svh flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ScrollProgress />
      <Header />
      <main className="flex flex-1 flex-col">
        <Hero />
        <Services />
        <Process />
        <Projects />
        <Stats />
        <Testimonials />
        <Team />
        <Philosophy />
        <Faq />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
      <ContactDialog />
    </div>
  );
}
