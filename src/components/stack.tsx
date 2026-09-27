import { stack } from "@/data/stack";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export function Stack() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            index="05"
            eyebrow="Con qué trabajamos"
            title={<span id="stack-title">Herramientas probadas, sin experimentos con tu negocio</span>}
            description="Tecnologías maduras y con comunidad activa. Vos no necesitás saber qué hace cada una: solo saber que funcionan."
          />
        </Reveal>

        <Reveal>
          <ul className="mt-12 flex flex-wrap gap-3">
            {stack.map((item) => (
              <li
                key={item.name}
                title={item.note}
                className="rounded-full border border-line bg-surface/70 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent/40"
              >
                {item.name}
                <span className="ml-2 hidden text-xs font-normal text-muted sm:inline">
                  · {item.note}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
