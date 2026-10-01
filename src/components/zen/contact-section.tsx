"use client";

import { siteConfig } from "@/lib/site-config";
import { SectionHeader } from "@/components/zen/section-header";
import { LeadForm } from "@/components/zen/lead-form";
import { Reveal } from "@/components/zen/reveal";
import { ArrowRightIcon, MailIcon, LotusIcon, WhatsAppIcon } from "@/components/zen/icons";

export function ContactSection() {
  return (
    <section
      id="contacto"
      aria-labelledby="contact-heading"
      className="relative w-full overflow-hidden bg-zen-bg px-0 pb-24 pt-20 text-zen-ink sm:pb-28 sm:pt-24 lg:pb-36 lg:pt-28"
    >
      <div className="mx-auto w-full max-w-[1480px] px-5 sm:px-10 xl:px-16">
        <SectionHeader
          index="10"
          eyebrow="CONTACT"
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

        <div className="mt-12 grid gap-0 border-t border-l border-zen-line sm:mt-14 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="border-b border-r border-zen-line p-6 sm:p-8 lg:p-10">
            <div className="flex h-full min-h-[28rem] flex-col justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zen-muted">
                  DIRECT CHANNELS
                </p>

                <div className="mt-9 space-y-0">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="group flex items-center justify-between gap-4 border-t border-zen-line py-5 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-zen-accent"
                  >
                    <span>
                      <span className="block text-xs uppercase tracking-wider text-zen-muted">Email</span>
                      <span className="mt-1 block text-sm text-zen-ink transition-colors group-hover:text-zen-accent">
                        {siteConfig.email}
                      </span>
                    </span>
                    <ArrowRightIcon width={16} height={16} className="text-zen-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-zen-accent" />
                  </a>

                  {siteConfig.whatsapp ? (
                    <a
                      href={siteConfig.whatsapp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 border-t border-zen-line py-5 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-zen-accent"
                    >
                      <span>
                        <span className="block text-xs uppercase tracking-wider text-zen-muted">WhatsApp</span>
                        <span className="mt-1 block text-sm text-zen-ink transition-colors group-hover:text-zen-accent">
                          {siteConfig.whatsapp.displayNumber}
                        </span>
                      </span>
                      <WhatsAppIcon width={18} height={18} className="text-zen-muted transition-colors group-hover:text-zen-accent" />
                    </a>
                  ) : null}

                  <div className="border-y border-zen-line py-5">
                    <span className="block text-xs uppercase tracking-wider text-zen-muted">Location</span>
                    <span className="mt-1 block text-sm text-zen-ink">Buenos Aires · Remote</span>
                  </div>
                </div>
              </div>

              <div className="mt-10 border-l border-zen-accent pl-4">
                <p className="text-sm leading-relaxed text-zen-muted">
                  Prefer a direct message? Use the email or WhatsApp above, or send the full brief here and keep everything in one place.
                </p>
                <div className="mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-zen-muted/60">
                  <LotusIcon width={14} height={14} className="text-zen-accent" />
                  BUENOS AIRES · GLOBAL
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="border-b border-r border-zen-line p-6 sm:p-8 lg:p-10" delay={0.1}>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zen-muted">
              PROJECT INTAKE
            </p>
            <h3 className="mt-5 max-w-xl font-display text-2xl font-semibold uppercase tracking-tight text-zen-ink sm:text-3xl">
              Tell us what the software should make easier.
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-zen-muted sm:text-base">
              The more concrete the context, the more useful the first conversation.
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
