#!/bin/bash
# ============================================================
# Zen ERP - Homepage Expansion Generator
# ============================================================
# Ejecuta este script desde la raíz de tu repo (4beru/zenerp-homepage)
# Uso: bash generate-zen-expansion.sh
# ============================================================

set -e

echo '🚀 Zen ERP — Homepage Expansion'
echo '================================'
echo ''

if [ ! -f 'package.json' ] || [ ! -d 'src' ]; then
    echo '❌ Error: Ejecuta desde la raíz del repo (donde está package.json)'
    exit 1
fi

mkdir -p src/data
mkdir -p src/components/zen
mkdir -p src/app

cat > src/data/stats.ts << 'ZEN_EOF_SRC_DATA_STATS_TS'
/**
 * Stats / Proof — editorial metric field.
 */

export type Stat = {
  value: number;
  suffix: string;
  full: string;
  label: string;
  detail: string;
};

export const stats: Stat[] = [
  {
    value: 15,
    suffix: "min",
    full: "15 minutes",
    label: "First conversation",
    detail: "No charge, no commitment",
  },
  {
    value: 3,
    suffix: "paths",
    full: "3 possible paths",
    label: "For every project",
    detail: "Odoo, ERPNext, or custom engineering",
  },
  {
    value: 24,
    suffix: "h",
    full: "24 hours maximum",
    label: "Response time",
    detail: "On business days",
  },
  {
    value: 100,
    suffix: "%",
    full: "100 percent yours",
    label: "Your code and your data",
    detail: "Always yours, no hostages",
  },
];

export const statsSectionCopy = {
  eyebrow: "04 / PROOF",
  eyebrowSub: "VERIFIABLE STUDIO CLAIMS",
  title: ["WHAT THE WORK", "PRODUCES."],
  description:
    "Numbers that describe how we operate—not how we wish we did. Each metric reflects a real commitment we keep.",
};
ZEN_EOF_SRC_DATA_STATS_TS
echo '✓ src/data/stats.ts'

cat > src/data/testimonials.ts << 'ZEN_EOF_SRC_DATA_TESTIMONIALS_TS'
/**
 * Testimonials — client voices from real engagements.
 */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  industry: string;
  result: string;
  index: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "We came from spreadsheets and three systems that couldn't talk to each other. Today, stock closes on its own and the factory works off a single screen. What I value most: they always explained things in plain language.",
    name: "Martín G.",
    role: "Factory owner",
    industry: "Manufacturing · Odoo",
    result: "Real-time inventory",
    index: "01",
  },
  {
    quote:
      "We had three branches and three different versions of the same company. With ERPNext we unified everything without paying per-branch licenses. The migration was gradual—we never stopped selling.",
    name: "Carolina R.",
    role: "Operations manager",
    industry: "Multi-branch retail · ERPNext",
    result: "3 branches, one system",
    index: "02",
  },
  {
    quote:
      "Our drivers work with the app even where there's no signal: it marks the order offline and syncs when they return. The drivers adopted it in two days—and they hate changing apps.",
    name: "Diego S.",
    role: "Logistics coordinator",
    industry: "Distribution · Flutter app",
    result: "Offline deliveries, zero paper",
    index: "03",
  },
  {
    quote:
      "Our B2B clients now order themselves through the portal, check balances, and download invoices. The sales team stopped answering repetitive emails and went back to selling.",
    name: "Lucía T.",
    role: "Commercial lead",
    industry: "B2B portal · Next.js",
    result: "Self-service orders 24/7",
    index: "04",
  },
];

export const testimonialsSectionCopy = {
  eyebrow: "05 / CLIENT VOICES",
  eyebrowSub: "REAL ENGAGEMENTS · ABBREVIATED FOR CONFIDENTIALITY",
  title: ["WHAT THE PEOPLE", "WE WORK WITH SAY."],
  description:
    "Clients from different industries, at different stages. Names abbreviated for confidentiality—full case studies shared when they let us.",
};
ZEN_EOF_SRC_DATA_TESTIMONIALS_TS
echo '✓ src/data/testimonials.ts'

cat > src/data/team.ts << 'ZEN_EOF_SRC_DATA_TEAM_TS'
/**
 * Team / Studio — the people behind the software.
 */

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  initials: string;
  specialties: readonly string[];
  portrait: string;
};

export const team: readonly TeamMember[] = [
  {
    name: "Matías Z.",
    role: "Founder · ERP Implementation",
    bio:
      "Fifteen years inside factories and shops watching where money disappears: stock that doesn't close, spreadsheets that crash. Today he leads every Odoo and ERPNext implementation—and writes a good part of the code.",
    initials: "MZ",
    specialties: ["Odoo", "ERPNext", "Python", "PostgreSQL"],
    portrait:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=750&fit=crop&crop=faces&q=80",
  },
  {
    name: "Camila R.",
    role: "Full-stack Developer",
    bio:
      "Turns business processes into screens people use without a manual. B2B portals, custom dashboards, odd integrations nobody wants to inherit—and she leaves them clean.",
    initials: "CR",
    specialties: ["Next.js", "React", "Node.js", "APIs"],
    portrait:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=750&fit=crop&crop=faces&q=80",
  },
  {
    name: "Joaquín P.",
    role: "Mobile & Automation",
    bio:
      "Delivery apps that last a full day without signal and drivers who adopt them without training. If a process can be automated, he's already thinking how.",
    initials: "JP",
    specialties: ["Flutter", "Offline-first", "Sync", "Firebase"],
    portrait:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=750&fit=crop&crop=faces&q=80",
  },
];

export const teamNote =
  "Small team by design: the person who estimates your project is the one who codes it. No management layers, no account managers, no hold music.";

export const teamSectionCopy = {
  eyebrow: "06 / THE STUDIO",
  eyebrowSub: "SMALL TEAM · DIRECT ACCESS",
  title: ["THE PEOPLE BEHIND", "THE SOFTWARE."],
  description:
    "A small studio on purpose. Whoever listens to your problem, scopes the work, and writes the code is the same person—from first call to launch.",
};
ZEN_EOF_SRC_DATA_TEAM_TS
echo '✓ src/data/team.ts'
cat > src/data/philosophy.ts << 'ZEN_EOF_SRC_DATA_PHILOSOPHY_TS'
/**
 * Philosophy / Principles — the operating principles behind calm software.
 */

export type Principle = {
  index: string;
  title: string;
  description: string;
};

export const philosophyQuote =
  "The best software is the kind you stop noticing.";

export const principles: Principle[] = [
  {
    index: "01",
    title: "Clarity",
    description:
      "Fewer screens, more legibility. If software needs a manual to operate, something is wrong with the design.",
  },
  {
    index: "02",
    title: "Ownership",
    description:
      "Fixed price in writing, progress you can test with your hands, and decisions explained in plain language.",
  },
  {
    index: "03",
    title: "Direct access",
    description:
      "You talk to the person writing the code. No intermediaries, no tickets that nobody reads, no call centers.",
  },
  {
    index: "04",
    title: "Restraint",
    description:
      "Systems that work in silence. When everything functions properly, the software disappears from your day.",
  },
];

export const philosophySectionCopy = {
  eyebrow: "07 / PRINCIPLES",
  eyebrowSub: "HOW WE BUILD",
  title: ["WE BELIEVE SOFTWARE", "SHOULD DISAPPEAR INTO", "THE WAY PEOPLE WORK."],
  description:
    "Zen is not a pose—it's the way we build. Four principles we hold in every decision.",
};
ZEN_EOF_SRC_DATA_PHILOSOPHY_TS
echo '✓ src/data/philosophy.ts'

cat > src/data/faq.ts << 'ZEN_EOF_SRC_DATA_FAQ_TS'
/**
 * FAQ — structured knowledge interface.
 */

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqs: FaqItem[] = [
  {
    question: "How much does a project cost?",
    answer:
      "It depends on scope, which is why we don't throw out a number in the air. After the free initial diagnostic, we build a proposal with fixed pricing per stage: you know how much each step costs before committing. Odoo or ERPNext implementations generally start more accessible than 100% custom development.",
  },
  {
    question: "How long until I see something working?",
    answer:
      "A standard ERP implementation (sales, purchasing, stock, invoicing) is typically operational in 6 to 10 weeks. Custom development shows its first usable version in 3 to 5 weeks. We work in short stages with real progress: you watch the system grow sprint by sprint, not a black box opened at the end.",
  },
  {
    question: "What happens to my data and current system?",
    answer:
      "You migrate with us. We import products, customers, suppliers, and stock balances from spreadsheets or your previous system, and validate everything against your numbers before switching over. Go-live is gradual: first it coexists with the old system, then replaces it.",
  },
  {
    question: "Should I choose Odoo or ERPNext?",
    answer:
      "Both are excellent and open source; the difference lies in your operation. Odoo shines if you want an all-in-one ecosystem with pre-built apps (CRM, e-commerce, accounting). ERPNext is more flexible and lightweight for unusual workflows or multi-company setups, without per-module licenses. In the diagnostic we'll tell you which fits better—even if the answer is 'neither.'",
  },
  {
    question: "What happens after delivery?",
    answer:
      "We don't disappear. Every project includes an accompaniment period with adjustments included, and afterward you can keep a monthly support plan (updates, backups, improvements) or simply manage it yourself. No eternal contracts: the system is yours.",
  },
  {
    question: "Who owns the code?",
    answer:
      "You do. In custom development you receive the complete source code and documentation so any other team can continue. In Odoo/ERPNext, being open source, there's no vendor lock-in: your investment stays in your business, not tied to a license.",
  },
];

export const faqSectionCopy = {
  eyebrow: "08 / FREQUENT QUESTIONS",
  eyebrowSub: "WHAT PEOPLE NEED TO KNOW",
  title: ["WHAT PEOPLE", "ASK US BEFORE", "STARTING."],
  description:
    "Short, honest answers. If your question isn't here, write us and we'll respond the same day.",
};
ZEN_EOF_SRC_DATA_FAQ_TS
echo '✓ src/data/faq.ts'

cat > src/data/modules.ts << 'ZEN_EOF_SRC_DATA_MODULES_TS'
/**
 * Scope Builder — define the problem before the project.
 */

export type ScopeCategory = {
  id: string;
  label: string;
  description: string;
  image: string;
};

export type ScopeNeed = {
  id: string;
  categoryId: string;
  label: string;
};

export type ScopeSituation = {
  id: string;
  label: string;
  hint: string;
};

export const scopeCategories: ScopeCategory[] = [
  {
    id: "digital-product",
    label: "Digital Product",
    description: "A web or mobile application for customers or internal teams.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&q=80",
  },
  {
    id: "business-system",
    label: "Business System",
    description: "An operational system to run your business: ERP, CRM, inventory.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop&q=80",
  },
  {
    id: "mobile-app",
    label: "Mobile Application",
    description: "A field, logistics, or customer-facing mobile app.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&q=80",
  },
  {
    id: "custom-engineering",
    label: "Custom Engineering",
    description: "A specialized tool, integration, or internal platform.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop&q=80",
  },
];

export const scopeNeeds: ScopeNeed[] = [
  { id: "crm", categoryId: "business-system", label: "CRM & sales pipeline" },
  { id: "inventory", categoryId: "business-system", label: "Inventory & stock" },
  { id: "invoicing", categoryId: "business-system", label: "Invoicing & accounting" },
  { id: "ecommerce", categoryId: "digital-product", label: "E-commerce storefront" },
  { id: "portal", categoryId: "digital-product", label: "Client portal" },
  { id: "delivery", categoryId: "mobile-app", label: "Delivery & logistics" },
  { id: "field", categoryId: "mobile-app", label: "Field operations" },
  { id: "integration", categoryId: "custom-engineering", label: "API integrations" },
  { id: "automation", categoryId: "custom-engineering", label: "Process automation" },
  { id: "reporting", categoryId: "custom-engineering", label: "Dashboards & reporting" },
];

export const scopeSituations: ScopeSituation[] = [
  {
    id: "spreadsheets",
    label: "Spreadsheets and memory",
    hint: "No system yet",
  },
  {
    id: "outgrown",
    label: "A system that no longer fits",
    hint: "Something exists, but it's not enough",
  },
  {
    id: "complex",
    label: "A complex system nobody understands",
    hint: "Too much complexity",
  },
  {
    id: "none",
    label: "Starting from scratch",
    hint: "Clean slate",
  },
];

export const scopeBuilderCopy = {
  eyebrow: "09 / DEFINE THE SCOPE",
  eyebrowSub: "LET'S SHAPE THE PROBLEM TOGETHER",
  title: ["WHAT ARE YOU", "BUILDING?"],
  description:
    "Three questions to define a starting point. Not a budget—an honest first opinion about where to begin.",
  steps: [
    "What type of project?",
    "What does it need to do?",
    "What's the current situation?",
  ],
  resultHeading: "SUGGESTED STARTING POINT",
  ctaLabel: "Continue to contact",
  resetLabel: "Start over",
};
ZEN_EOF_SRC_DATA_MODULES_TS
echo '✓ src/data/modules.ts'

cat > src/components/zen/stats.tsx << 'ZEN_EOF_SRC_COMPONENTS_ZEN_STATS_TSX'
"use client";

import { useCountUp } from "@/hooks/use-count-up";
import { stats, statsSectionCopy } from "@/data/stats";
import { Reveal, RevealGroup, RevealItem } from "@/components/zen/reveal";

function StatCell({
  stat,
  index,
}: {
  stat: (typeof stats)[number];
  index: number;
}) {
  const { ref, value } = useCountUp(stat.value, {
    duration: 1400,
    delay: 140 * index,
    startOnView: true,
  });

  return (
    <RevealItem className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
      <dl className="flex flex-col border-t border-[#EEE8D5]/[0.08] pt-6 first:border-t-0 first:pt-0 lg:border-t-0 lg:border-l lg:border-l-[#EEE8D5]/[0.08] lg:pt-0 lg:pl-8 lg:first:border-l-0 lg:first:pl-0">
        <dt className="order-2 mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[#839496]">
          {stat.label}
        </dt>
        <dd className="order-1 flex items-baseline gap-2">
          <span className="sr-only">{stat.full}. </span>
          <span aria-hidden="true" className="flex items-baseline gap-2">
            <span
              ref={ref}
              className="font-display text-5xl font-bold tracking-tight text-[#EEE8D5] tabular-nums sm:text-6xl lg:text-7xl"
            >
              {value}
            </span>
            <span className="font-mono text-base text-[#CB4B16] sm:text-lg">
              {stat.suffix}
            </span>
          </span>
        </dd>
        <p className="order-3 mt-2 text-sm leading-relaxed text-[#839496]/80">
          {stat.detail}
        </p>
      </dl>
    </RevealItem>
  );
}

export function Stats() {
  return (
    <section
      id="stats"
      aria-labelledby="stats-heading"
      className="relative w-full overflow-hidden bg-[#050505] px-0 pb-24 pt-20 text-[#EEE8D5] sm:pb-28 sm:pt-24 lg:pb-36 lg:pt-28"
    >
      <div className="relative mx-auto w-full max-w-[1480px] px-5 sm:px-10 xl:px-16">
        <header className="border-b border-[#EEE8D5]/[0.08] pb-10 sm:pb-14">
          <Reveal>
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <span className="h-1.5 w-1.5 bg-[#CB4B16]" aria-hidden="true" />
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#839496] sm:text-xs">
                {statsSectionCopy.eyebrow}
              </p>
              <span
                className="hidden font-mono text-xs text-[#839496]/40 sm:inline"
                aria-hidden="true"
              >
                ·
              </span>
              <span className="hidden font-mono text-xs tracking-wider text-[#839496]/70 sm:inline">
                {statsSectionCopy.eyebrowSub}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              id="stats-heading"
              className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-[#EEE8D5] text-balance"
            >
              {statsSectionCopy.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#839496] sm:text-lg">
              {statsSectionCopy.description}
            </p>
          </Reveal>
        </header>

        <RevealGroup
          as="div"
          stagger={0.12}
          className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-0 sm:mt-14"
        >
          {stats.map((stat, i) => (
            <StatCell key={stat.label} stat={stat} index={i} />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
ZEN_EOF_SRC_COMPONENTS_ZEN_STATS_TSX
echo '✓ src/components/zen/stats.tsx'
cat > src/components/zen/testimonials.tsx << 'ZEN_EOF_SRC_COMPONENTS_ZEN_TESTIMONIALS_TSX'
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials, testimonialsSectionCopy } from "@/data/testimonials";
import { Reveal } from "@/components/zen/reveal";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/zen/icons";

export function Testimonials() {
  const total = testimonials.length;
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(
    () => typeof IntersectionObserver === "undefined"
  );
  const regionRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + total) % total),
    [total]
  );

  useEffect(() => {
    const el = regionRef.current;
    if (!el || visible) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  useEffect(() => {
    if (!visible || paused || reduced) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, 8000);
    return () => window.clearInterval(id);
  }, [index, visible, paused, reduced, total]);

  useEffect(() => {
    const onVisibility = () => {
      const el = regionRef.current;
      if (document.hidden) {
        setPaused(true);
      } else if (el) {
        const stillEngaged =
          el.matches(":hover") || el.matches(":focus-within");
        setPaused(stillEngaged);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () =>
      document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start === null) return;
    const delta = (e.changedTouches[0]?.clientX ?? 0) - start;
    if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
  };

  const t = testimonials[index];

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative w-full overflow-hidden bg-[#0C1011] px-0 pb-24 pt-20 text-[#EEE8D5] sm:pb-28 sm:pt-24 lg:pb-36 lg:pt-28"
    >
      <div className="relative mx-auto w-full max-w-[1480px] px-5 sm:px-10 xl:px-16">
        <header className="border-b border-[#EEE8D5]/[0.08] pb-10 sm:pb-14">
          <Reveal>
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <span className="h-1.5 w-1.5 bg-[#CB4B16]" aria-hidden="true" />
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#839496] sm:text-xs">
                {testimonialsSectionCopy.eyebrow}
              </p>
              <span
                className="hidden font-mono text-xs text-[#839496]/40 sm:inline"
                aria-hidden="true"
              >
                ·
              </span>
              <span className="hidden font-mono text-xs tracking-wider text-[#839496]/70 sm:inline">
                {testimonialsSectionCopy.eyebrowSub}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              id="testimonials-heading"
              className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-[#EEE8D5] text-balance"
            >
              {testimonialsSectionCopy.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#839496] sm:text-lg">
              {testimonialsSectionCopy.description}
            </p>
          </Reveal>
        </header>

        <Reveal delay={0.2}>
          <div
            ref={regionRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Client testimonials"
            tabIndex={0}
            className="relative mt-12 outline-none focus-visible:ring-2 focus-visible:ring-[#CB4B16]/50 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0C1011] sm:mt-14"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setPaused(false);
              }
            }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onKeyDown={onKeyDown}
          >
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -top-2 -left-1 select-none font-display text-8xl leading-none text-[#CB4B16]/15 lg:text-9xl"
                >
                  &ldquo;
                </span>

                <div
                  aria-live="polite"
                  className="relative min-h-[200px] pl-8 sm:min-h-[180px] lg:pl-12"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.blockquote
                      key={index}
                      initial={reduced ? false : { opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduced ? undefined : { opacity: 0, y: -14 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="text-xl leading-relaxed text-pretty text-[#EEE8D5]/90 sm:text-2xl lg:text-[1.75rem]"
                    >
                      {t.quote}
                    </motion.blockquote>
                  </AnimatePresence>
                </div>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={index}
                    initial={reduced ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: -10 }}
                    transition={{
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.1,
                    }}
                    className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#EEE8D5]/[0.08] pt-6 pl-8 lg:pl-12"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#839496]">
                      {t.industry}
                    </span>
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 rounded-full bg-[#839496]/40"
                    />
                    <span className="text-sm font-medium text-[#EEE8D5]">
                      {t.name}
                    </span>
                    <span className="text-sm text-[#839496]">· {t.role}</span>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex flex-row items-end justify-between gap-6 lg:flex-col lg:items-end lg:justify-between lg:gap-8">
                <div className="flex flex-col items-end gap-4 text-right lg:items-end">
                  <span className="font-mono text-xs tracking-[0.14em] text-[#839496]">
                    {t.index}
                    <span className="text-[#839496]/40">/{String(total).padStart(2, "0")}</span>
                  </span>
                  <span className="inline-flex items-center rounded-sm border border-[#CB4B16]/30 bg-[#CB4B16]/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-[#CB4B16]">
                    {t.result}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Previous testimonial"
                    onClick={() => go(-1)}
                    className="inline-flex h-11 w-11 cursor-pointer items-center justify-center border border-[#EEE8D5]/[0.08] text-[#839496] transition-colors duration-200 hover:border-[#CB4B16]/40 hover:text-[#EEE8D5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CB4B16]"
                  >
                    <ArrowLeftIcon width={18} height={18} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next testimonial"
                    onClick={() => go(1)}
                    className="inline-flex h-11 w-11 cursor-pointer items-center justify-center border border-[#EEE8D5]/[0.08] text-[#839496] transition-colors duration-200 hover:border-[#CB4B16]/40 hover:text-[#EEE8D5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CB4B16]"
                  >
                    <ArrowRightIcon width={18} height={18} />
                  </button>
                </div>
              </div>
            </div>

            <div
              role="tablist"
              aria-label="Testimonial indicators"
              className="mt-10 flex items-center gap-3"
            >
              {testimonials.map((item, i) => (
                <span
                  key={item.index}
                  className={`h-px transition-all duration-500 ${
                    i === index
                      ? "w-10 bg-[#CB4B16]"
                      : "w-6 bg-[#EEE8D5]/[0.15]"
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
ZEN_EOF_SRC_COMPONENTS_ZEN_TESTIMONIALS_TSX
echo '✓ src/components/zen/testimonials.tsx'

cat > src/components/zen/team.tsx << 'ZEN_EOF_SRC_COMPONENTS_ZEN_TEAM_TSX'
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
ZEN_EOF_SRC_COMPONENTS_ZEN_TEAM_TSX
echo '✓ src/components/zen/team.tsx'
cat > src/components/zen/philosophy.tsx << 'ZEN_EOF_SRC_COMPONENTS_ZEN_PHILOSOPHY_TSX'
"use client";

import {
  philosophyQuote,
  principles,
  philosophySectionCopy,
} from "@/data/philosophy";
import { Reveal, RevealGroup, RevealItem } from "@/components/zen/reveal";

export function Philosophy() {
  return (
    <section
      id="principles"
      aria-labelledby="principles-heading"
      className="relative w-full overflow-hidden bg-[#0C1011] px-0 pb-24 pt-20 text-[#EEE8D5] sm:pb-28 sm:pt-24 lg:pb-36 lg:pt-28"
    >
      <div className="relative mx-auto w-full max-w-[1480px] px-5 sm:px-10 xl:px-16">
        <header className="border-b border-[#EEE8D5]/[0.08] pb-10 sm:pb-14">
          <Reveal>
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <span className="h-1.5 w-1.5 bg-[#CB4B16]" aria-hidden="true" />
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#839496] sm:text-xs">
                {philosophySectionCopy.eyebrow}
              </p>
              <span
                className="hidden font-mono text-xs text-[#839496]/40 sm:inline"
                aria-hidden="true"
              >
                ·
              </span>
              <span className="hidden font-mono text-xs tracking-wider text-[#839496]/70 sm:inline">
                {philosophySectionCopy.eyebrowSub}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              id="principles-heading"
              className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-[#EEE8D5] text-balance"
            >
              {philosophySectionCopy.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#839496] sm:text-lg">
              {philosophySectionCopy.description}
            </p>
          </Reveal>
        </header>

        <div className="mt-14 lg:mt-20 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <figure className="relative">
              <span
                aria-hidden="true"
                className="block h-px w-16 bg-[#CB4B16]"
              />
              <blockquote className="mt-8 text-3xl font-medium leading-snug tracking-tight text-balance text-[#EEE8D5] sm:text-4xl lg:text-[2.75rem]">
                &ldquo;{philosophyQuote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 max-w-md text-sm leading-relaxed text-[#839496]">
                That is the standard: when a system actually works, people
                stop thinking about it. Stock closes, invoices go out,
                deliveries arrive—and you get back to running your business.
              </figcaption>
            </figure>
          </Reveal>

          <RevealGroup as="ul" className="mt-14 lg:mt-0" stagger={0.08}>
            {principles.map((p) => (
              <RevealItem as="li" key={p.title}>
                <div className="group border-t border-[#EEE8D5]/[0.08] py-8 transition-colors duration-300 first:border-t-0 first:pt-0 hover:border-[#CB4B16]/20 sm:py-10">
                  <div className="flex gap-6 sm:gap-8">
                    <span
                      aria-hidden="true"
                      className="mt-1 font-mono text-xs tracking-[0.14em] text-[#839496]/50"
                    >
                      {p.index}
                    </span>

                    <div className="flex-1">
                      <h3 className="font-display text-xl font-semibold tracking-tight text-[#EEE8D5] sm:text-2xl">
                        {p.title}
                      </h3>
                      <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#839496] sm:text-base">
                        {p.description}
                      </p>
                    </div>
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
ZEN_EOF_SRC_COMPONENTS_ZEN_PHILOSOPHY_TSX
echo '✓ src/components/zen/philosophy.tsx'

cat > src/components/zen/faq.tsx << 'ZEN_EOF_SRC_COMPONENTS_ZEN_FAQ_TSX'
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faqs, faqSectionCopy } from "@/data/faq";
import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/zen/reveal";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { ArrowRightIcon, MailIcon } from "@/components/zen/icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Faq() {
  const reduced = usePrefersReducedMotion();
  const [openItems, setOpenItems] = useState<string[]>([]);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative w-full overflow-hidden bg-[#050505] px-0 pb-24 pt-20 text-[#EEE8D5] sm:pb-28 sm:pt-24 lg:pb-36 lg:pt-28"
    >
      <div className="relative mx-auto w-full max-w-[1480px] px-5 sm:px-10 xl:px-16">
        <div className="lg:grid lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <header className="border-b border-[#EEE8D5]/[0.08] pb-10 sm:pb-14 lg:border-b-0 lg:pb-0">
              <Reveal>
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <span className="h-1.5 w-1.5 bg-[#CB4B16]" aria-hidden="true" />
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#839496] sm:text-xs">
                    {faqSectionCopy.eyebrow}
                  </p>
                  <span
                    className="hidden font-mono text-xs text-[#839496]/40 sm:inline"
                    aria-hidden="true"
                  >
                    ·
                  </span>
                  <span className="hidden font-mono text-xs tracking-wider text-[#839496]/70 sm:inline">
                    {faqSectionCopy.eyebrowSub}
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <h2
                  id="faq-heading"
                  className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-[#EEE8D5] text-balance"
                >
                  {faqSectionCopy.title.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h2>
              </Reveal>

              <Reveal delay={0.14}>
                <p className="mt-5 max-w-md text-base leading-relaxed text-[#839496] sm:text-lg">
                  {faqSectionCopy.description}
                </p>
              </Reveal>
            </header>

            <Reveal delay={0.2} className="lg:sticky lg:top-32 lg:mt-10">
              <div className="mt-10 border border-[#EEE8D5]/[0.08] bg-[#0E1315] p-6 lg:mt-0">
                <p className="text-base font-semibold text-[#EEE8D5]">
                  Still have questions?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#839496]">
                  If your question isn&apos;t here, write us and we&apos;ll
                  respond within one business day.
                </p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group mt-5 inline-flex items-center gap-2.5 border border-[#CB4B16]/40 bg-[#CB4B16]/10 px-4 py-2.5 text-sm font-medium text-[#CB4B16] transition-colors duration-200 hover:bg-[#CB4B16]/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CB4B16]"
                >
                  <MailIcon width={16} height={16} />
                  {siteConfig.email}
                  <ArrowRightIcon
                    width={14}
                    height={14}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="mt-12 lg:mt-0">
            <Accordion
              type="multiple"
              value={openItems}
              onValueChange={setOpenItems}
              className="flex flex-col"
            >
              {faqs.map((f, i) => (
                <AccordionItem
                  key={`faq-${i}`}
                  value={`faq-${i}`}
                  className="border-b border-[#EEE8D5]/[0.08] last:border-b-0"
                >
                  <AccordionTrigger className="group py-7 text-left hover:no-underline [&>svg]:h-4 [&>svg]:w-4">
                    <span className="flex items-baseline gap-5 text-left">
                      <span
                        aria-hidden="true"
                        className="font-mono text-xs tracking-[0.14em] text-[#CB4B16]/70"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-base font-medium text-[#EEE8D5] transition-colors duration-200 group-hover:text-[#CB4B16] sm:text-lg">
                        {f.question}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-7">
                    <AnimatePresence initial={false}>
                      <motion.div
                        initial={reduced ? false : { opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduced ? undefined : { opacity: 0, y: -8 }}
                        transition={{
                          duration: reduced ? 0 : 0.3,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <p className="max-w-xl border-l border-[#CB4B16]/25 pl-5 text-sm leading-relaxed text-[#839496] sm:pl-7 sm:text-base">
                          {f.answer}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
ZEN_EOF_SRC_COMPONENTS_ZEN_FAQ_TSX
echo '✓ src/components/zen/faq.tsx'

cat > src/components/zen/scope-builder.tsx << 'ZEN_EOF_SRC_COMPONENTS_ZEN_SCOPE_BUILDER_TSX'
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
ZEN_EOF_SRC_COMPONENTS_ZEN_SCOPE_BUILDER_TSX
echo '✓ src/components/zen/scope-builder.tsx'
cat > src/app/page.tsx << 'ZEN_EOF_SRC_APP_PAGE_TSX'
import { Header } from "@/components/zen/header";
import { Hero } from "@/components/hero/Hero";
import { Services } from "@/components/zen/services";
import { Process } from "@/components/zen/process";
import { Stats } from "@/components/zen/stats";
import { Testimonials } from "@/components/zen/testimonials";
import { Team } from "@/components/zen/team";
import { Philosophy } from "@/components/zen/philosophy";
import { Faq } from "@/components/zen/faq";
import { ScopeBuilder } from "@/components/zen/scope-builder";
import { ContactSection } from "@/components/zen/contact-section";
import { Footer } from "@/components/zen/footer";
import { ContactDialog } from "@/components/zen/contact-dialog";
import { ScrollProgress } from "@/components/zen/scroll-progress";
import { BackToTop } from "@/components/zen/back-to-top";

/**
 * Zen ERP — Homepage.
 *
 * Hero → Services → Approach → Stats → Testimonials → Studio → Principles →
 * FAQ → Scope Builder → Contact.
 *
 * The primary navigation intentionally contains only:
 * Services · Approach · Contact.
 *
 * Remaining sections are discovered naturally through scrolling and internal CTAs.
 */
export default function Home() {
  return (
    <div className="flex min-h-svh flex-col">
      <ScrollProgress />
      <Header />
      <main className="flex flex-1 flex-col">
        <Hero />
        <Services />
        <Process />
        <Stats />
        <Testimonials />
        <Team />
        <Philosophy />
        <Faq />
        <ScopeBuilder />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
      <ContactDialog />
    </div>
  );
}
ZEN_EOF_SRC_APP_PAGE_TSX
echo '✓ src/app/page.tsx'

echo ''
echo '================================'
echo '✅ Todos los archivos generados.'
echo ''
echo 'Archivos creados/actualizados (13):'
echo '  src/data/stats.ts'
echo '  src/data/testimonials.ts'
echo '  src/data/team.ts'
echo '  src/data/philosophy.ts'
echo '  src/data/faq.ts'
echo '  src/data/modules.ts'
echo '  src/components/zen/stats.tsx'
echo '  src/components/zen/testimonials.tsx'
echo '  src/components/zen/team.tsx'
echo '  src/components/zen/philosophy.tsx'
echo '  src/components/zen/faq.tsx'
echo '  src/components/zen/scope-builder.tsx'
echo '  src/app/page.tsx'
echo ''
echo 'Próximos pasos:'
echo '  1. Revisa los cambios:  git status'
echo '  2. Verifica compilación: bun run build'
echo '  3. Prueba en desarrollo: bun dev'
echo '================================'
