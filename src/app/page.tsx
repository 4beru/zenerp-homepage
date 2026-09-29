import { Header } from "@/components/zen/header";
import { Hero } from "@/components/zen/hero";
import { Footer } from "@/components/zen/footer";
import { ContactDialog } from "@/components/zen/contact-dialog";

/**
 * Zen ERP — Homepage (Fase 01: Hero).
 * Header sticky + hero a pantalla completa + footer de contacto.
 */
export default function Home() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="flex flex-1 flex-col">
        <Hero />
      </main>
      <Footer />
      <ContactDialog />
    </div>
  );
}
