"use client";

import Image from "next/image";
import { useRef } from "react";
import { projects, projectStats, type Project } from "@/data/projects";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { lotusDataUri } from "@/lib/motion/lotus-paths";
import { useCountUp } from "@/lib/motion/use-count-up";
import { useReveal } from "@/lib/motion/use-reveal";

const placeholderSrc = lotusDataUri();

/**
 * Tarjeta de proyecto lista para recibir imágenes reales:
 * si `project.image` está definida usa next/image con lazy loading;
 * si no, muestra un loto placeholder hasta que suban la captura.
 */
function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card-hover glass-card flex h-full flex-col overflow-hidden rounded-2xl">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-raised">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.alt ?? `Captura del proyecto: ${project.title}`}
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div
            role="img"
            aria-label={`Próximamente: captura de ${project.title}`}
            className="flex h-full w-full items-center justify-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={placeholderSrc} width={44} height={44} alt="" aria-hidden className="opacity-90" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="w-fit rounded-full border border-line px-3 py-1 text-xs font-medium tracking-wide text-accent">
          {project.category}
        </span>
        <h3 className="mt-4 text-base font-semibold text-ink">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.description}</p>
      </div>
    </article>
  );
}

/** Estadística real destacada — el número anima de 0 a 3 al entrar en viewport. */
function StatBanner() {
  const countRef = useCountUp(Number(projectStats.value));
  return (
    <div className="glass-card flex flex-col items-start gap-4 rounded-2xl p-8 sm:flex-row sm:items-center sm:gap-8">
      <span ref={countRef} className="text-6xl leading-none font-semibold text-accent tabular-nums">
        {projectStats.value}
      </span>
      <p className="max-w-md text-lg leading-snug text-ink">{projectStats.label}.</p>
    </div>
  );
}

export function Projects() {
  const rootRef = useRef<HTMLElement>(null);
  useReveal(rootRef, { staggerSelector: "[data-stagger]", start: "top 78%" });

  const erps = projects.filter((p) => p.category === "ERP");
  const others = projects.filter((p) => p.category !== "ERP");

  return (
    <section ref={rootRef} id="proyectos" aria-labelledby="proyectos-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            index="03"
            eyebrow="Proyectos"
            title={<span id="proyectos-title">Cosas reales, funcionando hoy</span>}
            description="Una muestra de lo que construimos. Los nombres de clientes se muestran solo con su autorización."
          />
        </Reveal>

        <Reveal>
          <div className="mt-12">
            <StatBanner />
          </div>
        </Reveal>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[...erps, ...others].map((p) => (
            <Reveal key={p.id} group className="h-full">
              <div data-stagger className="h-full">
                <ProjectCard project={p} />
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <p className="mt-10 text-sm text-muted">
            ¿Querés ver un sistema funcionando de cerca?{" "}
            <a href="#contacto" className="link-accent font-medium text-accent">
              Te lo mostramos en una demo breve →
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
