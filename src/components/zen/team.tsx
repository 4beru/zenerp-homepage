"use client";

import Image from "next/image";
import { team, teamNote, teamSectionCopy } from "@/data/team";
import { Reveal, RevealGroup, RevealItem } from "@/components/zen/reveal";

export function Team() {
  return (
    <section
      id="studio"
      aria-labelledby="studio-heading"
      className="relative w-full overflow-hidden bg-[#050505] px-0 pb-24 pt-20 text-[#EEE8D5] sm:pb-28 sm:pt-24 lg:pb-36 lg:pt-28"
    >
      <div className="relative mx-auto w-full max-w-[1480px] px-5 sm:px-10 xl:px-16">
        <header className="border-b border-[#EEE8D5]/[0.08] pb-10 sm:pb-14">
          <Reveal>
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <span className="h-1.5 w-1.5 bg-[#CB4B16]" aria-hidden="true" />
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#839496] sm:text-xs">
                {teamSectionCopy.eyebrow}
              </p>
              <span
                className="hidden font-mono text-xs text-[#839496]/40 sm:inline"
                aria-hidden="true"
              >
                ·
              </span>
              <span className="hidden font-mono text-xs tracking-wider text-[#839496]/70 sm:inline">
                {teamSectionCopy.eyebrowSub}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              id="studio-heading"
              className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-[#EEE8D5] text-balance"
            >
              {teamSectionCopy.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#839496] sm:text-lg">
              {teamSectionCopy.description}
            </p>
          </Reveal>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:mt-14 lg:grid-cols-12 lg:gap-6">
          <Reveal delay={0.15} className="lg:col-span-7">
            <div className="relative overflow-hidden">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#151C1E]">
                <Image
                  src={team[0].portrait}
                  alt={`Portrait of ${team[0].name}`}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover grayscale"
                  style={{ objectPosition: "center top" }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(5,5,5,0.8) 0%, rgba(5,5,5,0.2) 40%, transparent 70%)",
                  }}
                  aria-hidden="true"
                />
              </div>

              <div className="mt-6 flex flex-col gap-4">
                <div>
                  <h3 className="font-display text-2xl font-bold tracking-tight text-[#EEE8D5] sm:text-3xl">
                    {team[0].name}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-[#CB4B16]">
                    {team[0].role}
                  </p>
                </div>

                <p className="max-w-lg text-base leading-relaxed text-[#839496]">
                  {team[0].bio}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {team[0].specialties.map((s) => (
                    <span
                      key={s}
                      className="border border-[#EEE8D5]/[0.08] px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-[#839496]/70"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <RevealGroup
            as="div"
            stagger={0.1}
            className="flex flex-col gap-8 lg:col-span-5 lg:gap-10"
          >
            {team.slice(1).map((member, i) => (
              <RevealItem key={member.initials}>
                <div
                  className={`flex flex-col gap-6 ${
                    i === 0 ? "lg:pt-8" : "lg:pt-4"
                  }`}
                >
                  <div className="relative aspect-[3/2] w-full overflow-hidden bg-[#151C1E]">
                    <Image
                      src={member.portrait}
                      alt={`Portrait of ${member.name}`}
                      fill
                      sizes="(min-width: 1024px) 35vw, 100vw"
                      className="object-cover grayscale"
                      style={{ objectPosition: "center top" }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(5,5,5,0.6) 0%, transparent 50%)",
                      }}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <div>
                      <h3 className="text-xl font-semibold text-[#EEE8D5]">
                        {member.name}
                      </h3>
                      <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[#CB4B16]">
                        {member.role}
                      </p>
                    </div>

                    <p className="text-sm leading-relaxed text-[#839496]">
                      {member.bio}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {member.specialties.map((s) => (
                        <span
                          key={s}
                          className="border border-[#EEE8D5]/[0.08] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#839496]/70"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal delay={0.25}>
          <div className="mt-14 border-t border-[#EEE8D5]/[0.08] pt-8 sm:mt-16">
            <div className="flex items-start gap-4">
              <span
                className="mt-1 block h-px w-8 shrink-0 bg-[#CB4B16]"
                aria-hidden="true"
              />
              <p className="text-sm leading-relaxed text-[#839496] sm:text-base">
                {teamNote}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
