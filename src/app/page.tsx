import { Header } from "@/components/zen/header";
import { Hero } from "@/components/zen/hero";
import { Services } from "@/components/zen/services";
import { Process } from "@/components/zen/process";
import { Footer } from "@/components/zen/footer";
import { ContactDialog } from "@/components/zen/contact-dialog";
import { ScrollProgress } from "@/components/zen/scroll-progress";
import { BackToTop } from "@/components/zen/back-to-top";

/**
 * Zen ERP — Homepage.
 * Fase 01: Hero. Fase 02: Servicios. Fase 03: Proceso.
 */
export default function Home() {
  return (
    <div className="flex min-h-svh flex-col">
      <ScrollProgress />
      <Header />
      <main className="flex flex-1 flex-col">
        <Hero />
        <Services />
        <Process />
      </main>
      <Footer />
      <BackToTop />
      <ContactDialog />
    </div>
  );
}
