"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  scopeCategories,
  scopeNeeds,
  scopeSituations,
  scopeBuilderCopy,
} from "@/data/modules";
import { SectionHeader } from "@/components/zen/section-header";
import { LeadForm } from "@/components/zen/lead-form";
import { Reveal } from "@/components/zen/reveal";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from "@/components/zen/icons";

type Step = 1 | 2 | 3 | "result";

export function ScopeBuilder() {
  const reduced = usePrefersReducedMotion();
  const [step, setStep] = useState<Step>(1);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [selectedNeedIds, setSelectedNeedIds] = useState<string[]>([]);
  const [situationId, setSituationId] = useState<string | null>(null);

  const category = scopeCategories.find((item) => item.id === categoryId);
  const situation = scopeSituations.find((item) => item.id === situationId);

  const selectedNeeds = selectedNeedIds
    .map((id) => scopeNeeds.find((item) => item.id === id))
    .filter((item): item is (typeof scopeNeeds)[number] => Boolean(item));

  const summary = category
    ? [
        `Project type: ${category.label}`,
        `Needs: ${selectedNeeds.map((item) => item.label).join(", ")}`,
        `Current situation: ${situation?.label ?? "Not specified"}`,
      ].join("\n")
    : "";

  const transition = reduced
    ? { duration: 0 }
    : { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const };

  const chooseCategory = (id: string) => {
    setCategoryId(id);
    setSelectedNeedIds([]);
    setSituationId(null);
    setStep(2);
  };

  const toggleNeed = (id: string) => {
    setSelectedNeedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const reset = () => {
    setStep(1);
    setCategoryId(null);
    setSelectedNeedIds([]);
    setSituationId(null);
  };

  return (
    <section
      id="scope"
      aria-labelledby="scope-heading"
      className="relative w-full overflow-hidden bg-zen-bg-to px-0 pb-24 pt-20 text-zen-ink sm:pb-28 sm:pt-24 lg:pb-36 lg:pt-28"
    >
      <div className="mx-auto w-full max-w-[1480px] px-5 sm:px-10 xl:px-16">
        <SectionHeader
          index="09"
          eyebrow={scopeBuilderCopy.eyebrow}
          eyebrowSub={scopeBuilderCopy.eyebrowSub}
          title={
            <>
              <span className="block">WHAT ARE YOU</span>
              <span className="block">BUILDING?</span>
            </>
          }
          titleId="scope-heading"
          description={scopeBuilderCopy.description}
        />

        <Reveal delay={0.08}>
          <div className="mt-10 flex items-center gap-3 sm:mt-12" aria-label="Scope builder progress">
            {[1, 2, 3].map((item) => {
              const active = step === "result" ? item === 3 : item === step;
              const complete =
                step === "result" || (typeof step === "number" && item < step);
              return (
                <div key={item} className="flex min-w-0 items-center gap-3">
                  <span
                    aria-current={active ? "step" : undefined}
                    className={`flex h-8 min-w-8 items-center justify-center border px-2 font-mono text-[10px] tracking-[0.12em] transition-colors duration-300 ${
                      active
                        ? "border-zen-accent bg-zen-accent text-zen-bg"
                        : complete
                          ? "border-zen-accent/40 text-zen-accent"
                          : "border-zen-line text-zen-muted/60"
                    }`}
                  >
                    {String(item).padStart(2, "0")}
                  </span>
                  <span
                    className={`hidden text-xs ${active || complete ? "text-zen-ink" : "text-zen-muted/50"} sm:inline`}
                  >
                    {scopeBuilderCopy.steps[item - 1]}
                  </span>
                  {item < 3 ? (
                    <span className={`hidden h-px w-8 sm:inline ${complete ? "bg-zen-accent/40" : "bg-zen-line"}`} aria-hidden="true" />
                  ) : null}
                </div>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-10 sm:mt-12">
          <AnimatePresence mode="wait" initial={false}>
            {step === 1 ? (
              <motion.div
                key="category"
                initial={reduced ? false : { opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduced ? undefined : { opacity: 0, x: -18 }}
                transition={transition}
                className="grid gap-0 border-t border-l border-zen-line sm:grid-cols-2"
                role="radiogroup"
                aria-label="Project type"
              >
                {scopeCategories.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    role="radio"
                    aria-checked={categoryId === item.id}
                    onClick={() => chooseCategory(item.id)}
                    className={`group min-h-52 cursor-pointer border-b border-r border-zen-line p-6 text-left transition-colors hover:bg-zen-surface focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-zen-accent sm:p-8 ${categoryId === item.id ? "bg-zen-accent-soft" : ""}`}
                  >
                    <div className="flex items-start justify-between gap-5">
                      <span className="font-mono text-[10px] tracking-[0.16em] text-zen-muted/60">
                        {item.id.split("-").join(" ").toUpperCase()}
                      </span>
                      <span
                        className={`h-7 w-7 border ${categoryId === item.id ? "border-zen-accent bg-zen-accent text-zen-bg" : "border-zen-line text-transparent"} flex items-center justify-center`}
                        aria-hidden="true"
                      >
                        <CheckIcon width={14} height={14} />
                      </span>
                    </div>
                    <h3 className="mt-12 font-display text-2xl font-semibold uppercase tracking-tight text-zen-ink sm:text-3xl">
                      {item.label}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-zen-muted">
                      {item.description}
                    </p>
                    <span className="mt-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-zen-accent">
                      Select <ArrowRightIcon width={13} height={13} />
                    </span>
                  </button>
                ))}
              </motion.div>
            ) : null}

            {step === 2 && category ? (
              <motion.div
                key="needs"
                initial={reduced ? false : { opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduced ? undefined : { opacity: 0, x: -18 }}
                transition={transition}
              >
                <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[0.42fr_0.58fr] lg:gap-14">
                  <div>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex cursor-pointer items-center gap-1.5 text-sm text-zen-muted transition-colors hover:text-zen-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zen-accent"
                    >
                      <ArrowLeftIcon width={14} height={14} /> Back
                    </button>
                    <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.16em] text-zen-accent">
                      {category.label}
                    </p>
                    <h3 className="mt-4 font-display text-3xl font-semibold uppercase tracking-tight text-zen-ink sm:text-4xl">
                      What should it handle?
                    </h3>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-zen-muted sm:text-base">
                      Choose the parts of the operation that matter most right now.
                    </p>
                  </div>

                  <div className="grid gap-0 border-t border-l border-zen-line sm:grid-cols-2">
                    {scopeNeeds
                      .filter((item) => item.categoryId === category.id)
                      .map((item) => {
                        const selected = selectedNeedIds.includes(item.id);
                        return (
                          <button
                            key={item.id}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => toggleNeed(item.id)}
                            className={`group flex cursor-pointer items-center justify-between gap-4 border-b border-r border-zen-line p-5 text-left transition-colors hover:bg-zen-surface focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-zen-accent ${selected ? "bg-zen-accent-soft" : ""}`}
                          >
                            <span className={`text-sm font-medium ${selected ? "text-zen-ink" : "text-zen-muted group-hover:text-zen-ink"}`}>
                              {item.label}
                            </span>
                            <span className={`flex h-5 w-5 shrink-0 items-center justify-center border ${selected ? "border-zen-accent bg-zen-accent text-zen-bg" : "border-zen-line text-transparent"}`}>
                              <CheckIcon width={12} height={12} />
                            </span>
                          </button>
                        );
                      })}
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-4 border-t border-zen-line pt-5">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    disabled={selectedNeedIds.length === 0}
                    className="group inline-flex cursor-pointer items-center gap-2 border border-zen-accent bg-zen-accent px-5 py-3 text-sm font-semibold text-zen-bg transition-colors hover:bg-zen-accent-strong disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zen-accent"
                  >
                    Continue <ArrowRightIcon width={14} height={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-zen-muted/60">
                    {selectedNeedIds.length} selected
                  </span>
                </div>
              </motion.div>
            ) : null}

            {step === 3 ? (
              <motion.div
                key="situation"
                initial={reduced ? false : { opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduced ? undefined : { opacity: 0, x: -18 }}
                transition={transition}
              >
                <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[0.42fr_0.58fr] lg:gap-14">
                  <div>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="inline-flex cursor-pointer items-center gap-1.5 text-sm text-zen-muted transition-colors hover:text-zen-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zen-accent"
                    >
                      <ArrowLeftIcon width={14} height={14} /> Back
                    </button>
                    <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.16em] text-zen-accent">
                      {category?.label}
                    </p>
                    <h3 className="mt-4 font-display text-3xl font-semibold uppercase tracking-tight text-zen-ink sm:text-4xl">
                      Where are you starting?
                    </h3>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-zen-muted sm:text-base">
                      This helps us understand the constraint before the solution.
                    </p>
                  </div>

                  <div className="grid gap-0 border-t border-l border-zen-line sm:grid-cols-2">
                    {scopeSituations.map((item) => {
                      const selected = situationId === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => {
                            setSituationId(item.id);
                            setStep("result");
                          }}
                          className={`group flex min-h-36 cursor-pointer flex-col justify-between gap-4 border-b border-r border-zen-line p-5 text-left transition-colors hover:bg-zen-surface focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-zen-accent ${selected ? "bg-zen-accent-soft" : ""}`}
                        >
                          <span className={`text-sm font-medium ${selected ? "text-zen-ink" : "text-zen-muted group-hover:text-zen-ink"}`}>
                            {item.label}
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-zen-muted/60">
                            {item.hint}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ) : null}

            {step === "result" && category ? (
              <motion.div
                key="result"
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -10 }}
                transition={transition}
                className="grid gap-0 border-t border-l border-zen-line lg:grid-cols-[0.9fr_1.1fr]"
              >
                <div className="border-b border-r border-zen-line p-6 sm:p-8 lg:p-10">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zen-accent">
                    {scopeBuilderCopy.resultHeading}
                  </p>
                  <h3 className="mt-5 font-display text-3xl font-semibold uppercase tracking-tight text-zen-ink sm:text-4xl">
                    {category.label}
                  </h3>

                  <div className="mt-10 space-y-7">
                    <div className="border-t border-zen-line pt-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zen-muted">
                        NEEDS
                      </p>
                      <div className="mt-3 space-y-2">
                        {selectedNeeds.map((item) => (
                          <p key={item.id} className="flex items-start gap-2 text-sm text-zen-ink/90">
                            <span className="mt-2 h-1 w-1 shrink-0 bg-zen-accent" aria-hidden="true" />
                            {item.label}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-zen-line pt-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zen-muted">
                        CURRENT SITUATION
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-zen-ink/90">
                        {situation?.label}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={reset}
                    className="mt-10 inline-flex cursor-pointer items-center gap-2 text-sm text-zen-muted transition-colors hover:text-zen-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zen-accent"
                  >
                    {scopeBuilderCopy.resetLabel}
                  </button>
                </div>

                <div className="border-b border-r border-zen-line p-6 sm:p-8 lg:p-10">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zen-muted">
                    {scopeBuilderCopy.formHeading}
                  </p>
                  <h3 className="mt-5 font-display text-2xl font-semibold uppercase tracking-tight text-zen-ink sm:text-3xl">
                    Send the context with the scope.
                  </h3>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-zen-muted">
                    The selections are already in the message. Add your contact details and any extra context before sending.
                  </p>

                  <LeadForm
                    key={category.id}
                    source={`scope-builder-${category.id}`}
                    initialMessage={summary}
                    submitLabel="Send project brief"
                    className="mt-8"
                  />
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
