import { LoadingScreen } from "@/components/zen/loading-screen";
import { Header } from "@/components/zen/header";
import { Hero } from "@/components/hero/Hero";
import { Services } from "@/components/zen/services";
import { SelectedWorks } from "@/components/zen/selected-works";
import { Marquee } from "@/components/zen/marquee";
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

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col">
      <LoadingScreen />
      <ScrollProgress />
      <Header />
      <main className="flex flex-1 flex-col">
        {/* Scene 1: Dark Cinematic Hero */}
        <Hero />
        {/* Scene 2: Dark Technical Capabilities */}
        <Services />
        {/* Scene 3: Selected Work Horizontal Pin & Image Gallery */}
        <SelectedWorks />
        {/* Transitional restrained marquee */}
        <Marquee />
        {/* Scene 4: Light Editorial World — Approach with dynamic step-image syncing */}
        <Process />
        {/* Supporting proof & team */}
        <Stats />
        <Testimonials />
        <Team />
        <Philosophy />
        <Faq />
        <ScopeBuilder />
        {/* Scene 5: Return to Dark — Contact with warm tactile artifact */}
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
      <ContactDialog />
    </div>
  );
}
