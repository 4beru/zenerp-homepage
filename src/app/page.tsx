import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Process } from "@/components/process";
import { Projects } from "@/components/projects";
import { Philosophy } from "@/components/philosophy";
import { Stack } from "@/components/stack";
import { MidCta } from "@/components/mid-cta";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

/** Link de salto accesible para navegar directo al contenido. */
function SkipLink() {
  return (
    <a
      href="#contenido"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#1a1210]"
    >
      Saltar al contenido principal
    </a>
  );
}

export default function Home() {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="contenido">
        <Hero />
        <Services />
        <Process />
        <Projects />
        <Philosophy />
        <Stack />
        <MidCta />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
