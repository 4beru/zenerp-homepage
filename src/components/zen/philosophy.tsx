import {
  philosophyQuote,
  principles,
  philosophySectionCopy,
} from "@/data/philosophy";
import { SectionHeader } from "@/components/zen/section-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/zen/reveal";

export function Philosophy() {
  return (
    <section
      id="principles"
      aria-labelledby="principles-heading"
      className="relative w-full overflow-hidden bg-zen-bg-to px-0 pb-24 pt-20 text-zen-ink sm:pb-28 sm:pt-24 lg:pb-36 lg:pt-28"
    >
      <div className="mx-auto w-full max-w-[1480px] px-5 sm:px-10 xl:px-16">
        <SectionHeader
          index="07"
          eyebrow={philosophySectionCopy.eyebrow}
          eyebrowSub={philosophySectionCopy.eyebrowSub}
          title={
            <>
              <span className="block">SOFTWARE SHOULD FIT</span>
              <span className="block">THE WAY PEOPLE WORK.</span>
            </>
          }
          titleId="principles-heading"
          description={philosophySectionCopy.description}
        />

        <div className="mt-12 grid gap-0 border-t border-l border-zen-line lg:grid-cols-[0.82fr_1.18fr] sm:mt-14">
          <Reveal className="border-b border-r border-zen-line p-6 sm:p-8 lg:p-10">
            <figure className="flex min-h-72 flex-col justify-between lg:min-h-[34rem]">
              <div>
                <span className="block h-px w-14 bg-zen-accent" aria-hidden="true" />
                <blockquote className="mt-8 max-w-xl font-display text-3xl font-medium leading-[1.05] tracking-[-0.03em] text-balance text-zen-ink sm:text-4xl lg:text-[3.25rem]">
                  &ldquo;{philosophyQuote}&rdquo;
                </blockquote>
              </div>
              <figcaption className="max-w-md border-t border-zen-line pt-5 text-sm leading-relaxed text-zen-muted sm:text-base">
                The goal is not to make software disappear from the product
                story. It is to make unnecessary friction disappear from the
                work.
              </figcaption>
            </figure>
          </Reveal>

          <RevealGroup as="ul" className="grid" stagger={0.08}>
            {principles.map((principle) => (
              <RevealItem as="li" key={principle.index} className="border-b border-r border-zen-line p-6 sm:p-8 lg:p-10 last:border-b-0">
                <div className="flex h-full gap-5 sm:gap-7">
                  <span className="mt-1 font-mono text-[10px] tracking-[0.16em] text-zen-muted/60">
                    {principle.index}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold uppercase tracking-tight text-zen-ink sm:text-2xl">
                      {principle.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-zen-muted sm:text-base">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
