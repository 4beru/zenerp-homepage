import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export function Contact() {
  return (
    <section id="contacto" aria-labelledby="contacto-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            index="06"
            eyebrow="Contacto"
            title={<span id="contacto-title">Contanos qué necesitás resolver</span>}
            description="Sin formularios eternos ni llamadas de venta. Nos escribís, charlamos, y si no somos el indicado te lo decimos igual."
          />
        </Reveal>
        <Reveal>
          <div className="mt-14">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
