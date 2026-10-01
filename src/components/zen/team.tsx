import { team, teamNote, teamSectionCopy } from "@/data/team";
import { SectionHeader } from "@/components/zen/section-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/zen/reveal";

export function Team() {
  return (
    <section
      id="studio"
      aria-labelledby="studio-heading"
      className="relative w-full overflow-hidden bg-zen-bg px-0 pb-24 pt-20 text-zen-ink sm:pb-28 sm:pt-24 lg:pb-36 lg:pt-28"
    >
      <div className="mx-auto w-full max-w-[1480px] px-5 sm:px-10 xl:px-16">
        <SectionHeader
          index="06"
          eyebrow={teamSectionCopy.eyebrow}
          eyebrowSub={teamSectionCopy.eyebrowSub}
          title={
            <>
              <span className="block">THREE PRACTICES.</span>
              <span className="block">ONE SYSTEM MINDSET.</span>
            </>
          }
          titleId="studio-heading"
          description={teamSectionCopy.description}
        />

        <div className="mt-12 grid gap-0 border-t border-l border-zen-line lg:grid-cols-[0.75fr_1.25fr] sm:mt-14">
          <Reveal className="border-b border-r border-zen-line p-6 sm:p-8 lg:p-10">
            <div className="flex h-full min-h-72 flex-col justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zen-muted">
                  WORKING MODEL
                </p>
                <div className="mt-10 text-[8rem] font-display font-bold leading-none tracking-[-0.08em] text-zen-ink/10 sm:text-[10rem]">
                  Z
                </div>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-zen-muted">
                One conversation from the first problem statement to the last deployment detail. No handoff between a sales story and an engineering reality.
              </p>
            </div>
          </Reveal>

          <RevealGroup as="div" className="grid sm:grid-cols-3" stagger={0.09}>
            {team.map((practice) => (
              <RevealItem key={practice.index} className="border-b border-r border-zen-line p-6 sm:min-h-72 sm:p-8 last:border-r-0">
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.16em] text-zen-muted/60">
                      {practice.index}
                    </span>
                    <span className="h-1.5 w-1.5 bg-zen-accent" aria-hidden="true" />
                  </div>
                  <h3 className="mt-10 font-display text-xl font-semibold uppercase tracking-tight text-zen-ink">
                    {practice.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-zen-muted">
                    {practice.description}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-x-3 gap-y-2 pt-8">
                    {practice.capabilities.map((item) => (
                      <span key={item} className="border-b border-zen-line pb-1 font-mono text-[10px] uppercase tracking-[0.12em] text-zen-muted/75">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal delay={0.18}>
          <p className="mt-8 max-w-3xl border-l-2 border-zen-accent pl-5 text-sm leading-relaxed text-zen-muted sm:text-base">
            {teamNote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
