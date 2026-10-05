/**
 * Zen ERP — Centralized Media Repository.
 *
 * All imagery metadata is curated and documented here.
 * Never hardcode remote URLs across component JSX.
 *
 * Each image follows deliberate architectural, material, or editorial criteria:
 * strong composition, negative space, tactile craftsmanship, raking light.
 */

export interface MediaAsset {
  id: string;
  src: string;
  alt: string;
  aspectRatio: "16:9" | "4:3" | "3:2" | "3:4" | "1:1";
  objectPosition?: string;
  credit: string;
  source: string;
  title: string;
  category: "work" | "approach" | "contact" | "editorial";
  fallbackColor: string;
}

export const mediaAssets: Record<string, MediaAsset> = {
  // Works Gallery (Services & Capabilities In Production)
  workEnterprise: {
    id: "work-enterprise",
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    alt: "Monolithic architectural facade of steel and glass framing the sky with structured geometric lines",
    aspectRatio: "16:9",
    objectPosition: "center 40%",
    credit: "Photo by Sean Pollock on Unsplash",
    source: "Unsplash",
    title: "Global Enterprise Architecture",
    category: "work",
    fallbackColor: "#111719",
  },
  workErpLogistics: {
    id: "work-erp-logistics",
    src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80",
    alt: "High-precision automated warehouse supply facility with geometric modular shelving and warm amber lighting",
    aspectRatio: "16:9",
    objectPosition: "center center",
    credit: "Photo by Petar Petkovski on Unsplash",
    source: "Unsplash",
    title: "Supply Chain & Odoo ERP Integration",
    category: "work",
    fallbackColor: "#13191c",
  },
  workMobileOperations: {
    id: "work-mobile-operations",
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    alt: "Minimalist concrete architectural structure with clean geometrical stone planes and quiet atmospheric light",
    aspectRatio: "16:9",
    objectPosition: "center 55%",
    credit: "Photo by R Architecture on Unsplash",
    source: "Unsplash",
    title: "Executive Field Operations Suite",
    category: "work",
    fallbackColor: "#0f1517",
  },
  workCloudFinancial: {
    id: "work-cloud-financial",
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80",
    alt: "Precision high-density server rack infrastructure in dark environment with calm LED status markers",
    aspectRatio: "16:9",
    objectPosition: "center 30%",
    credit: "Photo by Thomas Jensen on Unsplash",
    source: "Unsplash",
    title: "Financial Ledger & Real-Time Sync",
    category: "work",
    fallbackColor: "#101618",
  },

  // Approach Section (The 4 Process Phases)
  approachDiagnosis: {
    id: "approach-diagnosis",
    src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    alt: "Architectural drawings and precision drafting compass on raw paper under soft natural window light",
    aspectRatio: "4:3",
    objectPosition: "center center",
    credit: "Photo by Daniel McCullough on Unsplash",
    source: "Unsplash",
    title: "Phase 01: Problem Mapping & Diagnosis",
    category: "approach",
    fallbackColor: "#ded7d0",
  },
  approachScope: {
    id: "approach-scope",
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    alt: "Calm architectural studio space with clean lines, textured surfaces, and warm natural illumination",
    aspectRatio: "4:3",
    objectPosition: "center center",
    credit: "Photo by Breather on Unsplash",
    source: "Unsplash",
    title: "Phase 02: Clear Architecture & Scope",
    category: "approach",
    fallbackColor: "#e5ded7",
  },
  approachBuild: {
    id: "approach-build",
    src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    alt: "Close-up of precise industrial engineering components and mechanical assembly with fine tolerances",
    aspectRatio: "4:3",
    objectPosition: "center center",
    credit: "Photo by Science in HD on Unsplash",
    source: "Unsplash",
    title: "Phase 03: Agile Iterative Construction",
    category: "approach",
    fallbackColor: "#d8d1ca",
  },
  approachLaunch: {
    id: "approach-launch",
    src: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&w=1200&q=80",
    alt: "Striking sculptural concrete pavilion opening upward to the calm morning horizon",
    aspectRatio: "4:3",
    objectPosition: "center 40%",
    credit: "Photo by Simone Hutsch on Unsplash",
    source: "Unsplash",
    title: "Phase 04: Production Deployment & Support",
    category: "approach",
    fallbackColor: "#ded7d0",
  },

  // Contact Section (Tactile Contrast)
  contactTactile: {
    id: "contact-tactile",
    src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    alt: "Tactile architectural composition with textured stone, warm wood surfaces, and deep quiet natural shadows",
    aspectRatio: "3:4",
    objectPosition: "center center",
    credit: "Photo by Spacejoy on Unsplash",
    source: "Unsplash",
    title: "Architectural Materiality",
    category: "contact",
    fallbackColor: "#151c1e",
  },
};
