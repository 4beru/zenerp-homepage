"use client";

import { siteConfig } from "@/lib/site-config";
import { SectionHeader } from "@/components/zen/section-header";
import { LeadForm } from "@/components/zen/lead-form";
import { Reveal } from "@/components/zen/reveal";
import { ImageReveal } from "@/components/zen/image-reveal";
import { mediaAssets } from "@/data/media";
import { ArrowRightIcon, LotusIcon, WhatsAppIcon } from "@/components/zen/icons";

export function ContactSection() {
  return (
    <section
      id="contacto"
      aria-labelledby="contact-heading"
      className="relative w-full overflow-hidden bg-[#050505] px-0 pb-24 pt-20 text-[#EEE8D5] sm:pb-28 sm:pt-24 lg:pb-36 lg:pt-28"
    >
      <div className="mx-auto w-full max-w-[1480px] px-5 sm:px-10 xl:px-16">
        <SectionHeader
          index="10"
          eyebrow="CONTACT · RETURN TO DARK"
          eyebrowSub="TURN CONTEXT INTO A CONVERSATION"
          title={
            <>
              <span className="block">START WITH</span>
              <span className="block">THE PROBLEM.</span>
            </>
          }
          titleId="contact-heading"
          description="Send the situation as it is today. We will use the context to identify the sensible next step, not force a product into the conversation."
        />

        <div className="mt-12 grid gap-0 border-t border-l border-[#EEE8D5]/[0.08] sm:mt-14 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="flex flex-col justify-between border-b border-r border-[#EEE8D5]/[0.08] p-6 sm:p-8 lg:p-10">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#839496]">
                DIRECT CHANNELS
              </p>

              <div className="mt-8 space-y-0">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group flex items-center justify-between gap-4 border-t border-[#EEE8D5]/[0.08] py-4 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#CB4B16]"
                >
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-[#839496]">Email</span>
                    <span className="mt-1 block text-sm text-[#EEE8D5] transition-colors group-hover:text-[#CB4B16]">
                      {siteConfig.email}
                    </span>
                  </span>
                  <ArrowRightIcon width={16} height={16} className="text-[#839496] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#CB4B16]" />
                </a>

                {siteConfig.whatsapp ? (
                  <a
                    href={siteConfig.whatsapp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 border-t border-[#EEE8D5]/[0.08] py-4 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#CB4B16]"
                  >
                    <span>
                      <span className="block text-xs uppercase tracking-wider text-[#839496]">WhatsApp</span>
                      <span className="mt-1 block text-sm text-[#EEE8D5] transition-colors group-hover:text-[#CB4B16]">
                        {siteConfig.whatsapp.displayNumber}
                      </span>
                    </span>
                    <WhatsAppIcon width={18} height={18} className="text-[#839496] transition-colors group-hover:text-[#CB4B16]" />
                  </a>
                ) : null}

                <div className="border-y border-[#EEE8D5]/[0.08] py-4">
                  <span className="block text-xs uppercase tracking-wider text-[#839496]">Studio Location</span>
                  <span className="mt-1 block text-sm text-[#EEE8D5]">Buenos Aires · Distributed Operations</span>
                </div>
              </div>

              {/* Tactile Editorial Artifact Counterweight */}
              <div className="mt-8 overflow-hidden rounded-[2px] border border-[#EEE8D5]/[0.08]">
                <ImageReveal
                  src={mediaAssets.contactTactile.src}
                  alt={mediaAssets.contactTactile.alt}
                  aspectRatio="16:9"
                  fallbackColor={mediaAssets.contactTactile.fallbackColor}
                  title="Calm Materiality & Restraint"
                  kicker="STUDIO CRAFT"
                  sizes="(max-width: 1024px) 100vw, 480px"
                />
              </div>
            </div>

            <div className="mt-8 border-l border-[#CB4B16] pl-4">
              <p className="text-sm leading-relaxed text-[#839496]">
                Prefer a direct conversation? Use the channels above, or send your brief through the intake intake on the right.
              </p>
              <div className="mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#839496]/70">
                <LotusIcon width={14} height={14} className="text-[#CB4B16]" />
                <span>BUENOS AIRES · GLOBAL DEPLOYMENTS</span>
              </div>
            </div>
          </Reveal>

          <Reveal className="border-b border-r border-[#EEE8D5]/[0.08] p-6 sm:p-8 lg:p-10" delay={0.1}>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#839496]">
              PROJECT INTAKE
            </p>
            <h3 className="mt-4 max-w-xl font-display text-2xl font-semibold uppercase tracking-tight text-[#EEE8D5] sm:text-3xl">
              Tell us what the software should solve.
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#839496] sm:text-base">
              The more concrete the context, the more useful the first technical conversation.
            </p>

            <LeadForm
              source="contact-section"
              submitLabel="Send project brief"
              className="mt-8"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
