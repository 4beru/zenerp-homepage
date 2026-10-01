import { Header } from "@/components/zen/header";
import { Hero } from "@/components/hero/Hero";
import { Services } from "@/components/zen/services";
import { Process } from "@/components/zen/process";
import { Stats } from "@/components/zen/stats";
import { Testimonials } from "@/components/zen/testimonials";
import { Team } from "@/components/zen/team";
import { Philosophy } from "@/components/zen/philosophy";
import { Faq } from "@/components/zen/faq";
import { ScopeBuilder } from "@/components/zen/scope-builder";
import { ContactSection } from "@/components/zen/contact-section";
import { Footer } from "@/components/zen/footer";
import { ContactDialog } from "@/components/zen/contact-dialog";
import { ScrollProgress } from "@/components/zen/scroll-progress";
import { BackToTop } from "@/components/zen/back-to-top";

/**
 * Zen ERP — Homepage.
 *
 * Hero → Services → Approach → Stats → Testimonials → Studio → Principles →
 * FAQ → Scope Builder → Contact.
 *
 * The primary navigation intentionally contains only:
 * Services · Approach · Contact.
 *
 * Remaining sections are discovered naturally through scrolling and internal CTAs.
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
        <Stats />
        <Testimonials />
        <Team />
        <Philosophy />
        <Faq />
        <ScopeBuilder />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
      <ContactDialog />
    </div>
  );
}
