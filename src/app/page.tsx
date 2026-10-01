import { Header } from "@/components/zen/header";
import { Hero } from "@/components/hero/Hero";
import { Services } from "@/components/zen/services";
import { Process } from "@/components/zen/process";
import { ContactSection } from "@/components/zen/contact-section";
import { Footer } from "@/components/zen/footer";
import { ContactDialog } from "@/components/zen/contact-dialog";
import { ScrollProgress } from "@/components/zen/scroll-progress";
import { BackToTop } from "@/components/zen/back-to-top";

/**
 * Zen ERP — Homepage.
 * Hero → Services → Approach → Contact.
 *
 * The homepage is intentionally focused: one opening statement followed by
 * the service catalog, working approach, and final contact action.
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
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
      <ContactDialog />
    </div>
  );
}
