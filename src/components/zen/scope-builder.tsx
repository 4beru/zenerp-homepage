"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  scopeCategories,
  scopeNeeds,
  scopeSituations,
  scopeBuilderCopy,
} from "@/data/modules";
import { Reveal } from "@/components/zen/reveal";
import { useLeadDialog } from "@/lib/store/lead-dialog";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
} from "@/components/zen/icons";

type Step = 1 | 2 | 3 | "result";

export function ScopeBuilder() {
  const reduced = usePrefersReducedMotion();
  const openDialog = useLeadDialog((s) => s.openDialog);

  const [step, setStep] = useState<Step>(1);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [selectedNeedIds, setSelectedNeedIds] = useState<string[]>([]);
  const [situationId, setSituationId] = useState<string | null>(null);

  const category = scopeCategories.find((c) => c.id === categoryId);
  const situation = scopeSituations.find((s) => s.id === situationId);

  const transition = reduced
    ? { duration: 0 }
    : { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const };

  const toggleNeed = (id: string) => {
    setSelectedNeedIds((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
  };

  const handleContinueToContact = () => {
    if (!category) return;
    const needsList = selectedNeedIds
      .map((id) => {
        const need = scopeNeeds.find((n) => n.id === id);
        return need ? `- ${need.label}` : "";
      })
      .filter(Boolean)
      .join("\n");

    const summary = `Project: ${category.label}\nNeeds:\n${needsList}\nSituation: ${situation?.label ?? "Not specified"}`;

    openDialog(
      "scope-builder",
      `Scope: ${category.label}`,
      `Hi, I came from the scope builder. Here's what I'm looking at:\n\n${summary}\n\nCan we talk about how to approach this?`
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
      className="relative w-full overflow-hidden bg-[#0C1011] px-0 pb-24 pt-20 text-[#EEE8D5] sm:pb-28 sm:pt-24 lg:pb-36 lg:pt-28"
    >
      <div className="relative mx-auto w-full max-w-[1480px] px-5 sm:px-10 xl:px-16">
        <header className="border-b border-[#EEE8D5]/[0.08] pb-10 sm:pb-14">
          <Reveal>
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <span className="h-1.5 w-1.5 bg-[#CB4B16]" aria-hidden="true" />
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#839496] sm:text-xs">
                {scopeBuilderCopy.eyebrow}
              </p>
              <span
                className="hidden font-mono text-xs text-[#839496]/40 sm:inline"
                aria-hidden="true"
              >
                ·
              </span>
              <span className="hidden font-mono text-xs tracking-wider text-[#839496]/70 sm:inline">
                {scopeBuilderCopy.eyebrowSub}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              id="scope-heading"
              className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-[#EEE8D5] text-balance"
            >
              {scopeBuilderCopy.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#839496] sm:text-lg">
              {scopeBuilderCopy.description}
            </p>
          </Reveal>
        </header>

        <Reveal delay={0.18}>
          <div className="mt-10 flex items-center gap-4 sm:mt-12">
            {([1, 2, 3] as const).map((s) => {
              const isActive = step === s || (step === "result" && s === 3);
              const isPast =
                (typeof step === "number" && s < step) || step === "result";
              return (
                <div key={s} className="flex items-center gap-2.5">
                  <span
                    className={`flex h-8 w-8 items-center justify-center font-mono text-xs transition-colors duration-300 ${
                      isActive
                        ? "bg-[#CB4B16] text-[#050505]"
                        : isPast
                          ? "bg-[#CB4B16]/20 text-[#CB4B16]"
                          : "bg-[#EEE8D5]/[0.05] text-[#839496]/50"
                    }`}
                  >
                    {String(s).padStart(2, "0")}
                  </span>
                  <span
                    className={`hidden text-xs font-medium sm:inline ${
                      isActive || isPast
                        ? "text-[#EEE8D5]"
                        : "text-[#839496]/50"
                    }`}
                  >
                    {scopeBuilderCopy.steps[s - 1]}
                  </span>
                  {s < 3 && (
                    <span
                      className={`hidden h-px w-8 sm:inline ${
                        isPast ? "bg-[#CB4B16]/40" : "bg-[#EEE8D5]/[0.08]"
                      }`}
                      aria-hidden="true"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-10 min-h-[400px] sm:mt-12">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={reduced ? false : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduced ? undefined : { opacity: 0, x: -20 }}
                transition={transition}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                role="radiogroup"
                aria-label="Project type selection"
              >
                {scopeCategories.map((cat) => {
                  const isSelected = categoryId === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => {
                        setCategoryId(cat.id);
                        setStep(2);
                      }}
                      className={`group relative flex cursor-pointer flex-col overflow-hidden border p-0 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CB4B16] ${
                        isSelected
                          ? "border-[#CB4B16] bg-[#151C1E]"
                          : "border-[#EEE8D5]/[0.08] bg-[#0E1315] hover:border-[#EEE8D5]/20"
                      }`}
                    >
                      <div className="relative aspect-[16/9] w-full overflow-hidden">
                        <Image
                          src={cat.image}
                          alt=""
                          fill
                          sizes="(min-width: 640px) 50vw, 100vw"
                          className="object-cover grayscale transition-transform duration-500 group-hover:scale-105"
                        />
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(to top, rgba(5,5,5,0.7) 0%, rgba(5,5,5,0.2) 50%, transparent 100%)",
                          }}
                          aria-hidden="true"
                        />
                        {isSelected && (
                          <span className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center bg-[#CB4B16] text-[#050505]">
                            <CheckIcon width={14} height={14} />
                          </span>
                        )}
                      </div>
                      <div className="flex-1 p-5">
                        <h3 className="font-display text-lg font-semibold text-[#EEE8D5] transition-colors group-hover:text-[#CB4B16]">
                          {cat.label}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-[#839496]">
                          {cat.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </motion.div>
            )}

            {step === 2 && categoryId && (
              <motion.div
                key="step-2"
                initial={reduced ? false : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduced ? undefined : { opacity: 0, x: -20 }}
                transition={transition}
              >
                <div className="mb-6 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-[#839496] transition-colors hover:text-[#EEE8D5]"
                  >
                    <ArrowLeftIcon width={14} height={14} />
                    Back
                  </button>
                  <span className="font-mono text-xs tracking-[0.14em] text-[#839496]/60">
                    {category.label}
                  </span>
                </div>

                <p className="mb-6 text-base text-[#EEE8D5]">
                  What does it need to do? Select all that apply.
                </p>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {scopeNeeds
                    .filter((n) => n.categoryId === categoryId)
                    .map((need) => {
                      const isSelected = selectedNeedIds.includes(need.id);
                      return (
                        <button
                          key={need.id}
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() => toggleNeed(need.id)}
                          className={`group flex cursor-pointer items-center gap-3.5 border px-4 py-3.5 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CB4B16] ${
                            isSelected
                              ? "border-[#CB4B16] bg-[#CB4B16]/10"
                              : "border-[#EEE8D5]/[0.08] bg-[#0E1315] hover:border-[#EEE8D5]/20"
                          }`}
                        >
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center border transition-all duration-200 ${
                              isSelected
                                ? "border-[#CB4B16] bg-[#CB4B16] text-[#050505]"
                                : "border-[#EEE8D5]/[0.2] text-transparent"
                            }`}
                          >
                            <CheckIcon width={12} height={12} />
                          </span>
                          <span
                            className={`text-sm font-medium transition-colors ${
                              isSelected
                                ? "text-[#EEE8D5]"
                                : "text-[#839496] group-hover:text-[#EEE8D5]"
                            }`}
                          >
                            {need.label}
                          </span>
                        </button>
                      );
                    })}
                </div>

                <div className="mt-8 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    disabled={selectedNeedIds.length === 0}
                    className="inline-flex cursor-pointer items-center gap-2 border border-[#CB4B16] bg-[#CB4B16] px-5 py-2.5 text-sm font-semibold text-[#050505] transition-colors duration-200 hover:bg-[#D9531E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CB4B16] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Continue
                    <ArrowRightIcon width={14} height={14} />
                  </button>
                  <span className="font-mono text-xs text-[#839496]/60">
                    {selectedNeedIds.length} selected
                  </span>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step-3"
                initial={reduced ? false : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduced ? undefined : { opacity: 0, x: -20 }}
                transition={transition}
              >
                <div className="mb-6 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-[#839496] transition-colors hover:text-[#EEE8D5]"
                  >
                    <ArrowLeftIcon width={14} height={14} />
                    Back
                  </button>
                  <span className="font-mono text-xs tracking-[0.14em] text-[#839496]/60">
                    {category?.label}
                  </span>
                </div>

                <p className="mb-6 text-base text-[#EEE8D5]">
                  What&apos;s the current situation?
                </p>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {scopeSituations.map((sit) => {
                    const isSelected = situationId === sit.id;
                    return (
                      <button
                        key={sit.id}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => {
                          setSituationId(sit.id);
                          setStep("result");
                        }}
                        className={`group flex cursor-pointer flex-col gap-1 border px-5 py-4 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CB4B16] ${
                          isSelected
                            ? "border-[#CB4B16] bg-[#CB4B16]/10"
                            : "border-[#EEE8D5]/[0.08] bg-[#0E1315] hover:border-[#EEE8D5]/20"
                        }`}
                      >
                        <span
                          className={`text-sm font-medium transition-colors ${
                            isSelected
                              ? "text-[#EEE8D5]"
                              : "text-[#839496] group-hover:text-[#EEE8D5]"
                          }`}
                        >
                          {sit.label}
                        </span>
                        <span className="text-xs text-[#839496]/70">
                          {sit.hint}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === "result" && category && (
              <motion.div
                key="result"
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -10 }}
                transition={transition}
              >
                <div className="border border-[#EEE8D5]/[0.08] bg-[#0E1315] p-6 sm:p-8">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#CB4B16]">
                    {scopeBuilderCopy.resultHeading}
                  </p>

                  <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-[#EEE8D5] sm:text-3xl">
                    {category.label}
                  </h3>

                  <div className="mt-6 border-t border-[#EEE8D5]/[0.08] pt-6">
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#839496]">
                      CAPABILITIES
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {selectedNeedIds.map((id) => {
                        const need = scopeNeeds.find((n) => n.id === id);
                        return need ? (
                          <li
                            key={id}
                            className="border border-[#CB4B16]/30 bg-[#CB4B16]/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-[#CB4B16]"
                          >
                            {need.label}
                          </li>
                        ) : null;
                      })}
                    </ul>
                  </div>

                  {situation && (
                    <div className="mt-5 border-t border-[#EEE8D5]/[0.08] pt-5">
                      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#839496]">
                        CURRENT SITUATION
                      </p>
                      <p className="mt-2 text-sm text-[#EEE8D5]">
                        {situation.label}
                      </p>
                    </div>
                  )}

                  <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-[#EEE8D5]/[0.08] pt-6">
                    <button
                      type="button"
                      onClick={handleContinueToContact}
                      className="group inline-flex cursor-pointer items-center gap-2.5 bg-[#CB4B16] px-5 py-3 text-sm font-semibold text-[#050505] transition-colors duration-200 hover:bg-[#D9531E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CB4B16]"
                    >
                      {scopeBuilderCopy.ctaLabel}
                      <ArrowRightIcon
                        width={14}
                        height={14}
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={reset}
                      className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-[#839496] transition-colors hover:text-[#EEE8D5]"
                    >
                      {scopeBuilderCopy.resetLabel}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
