import type { serviceIcons } from "@/components/zen/icons";

export type ServiceCategory = "all" | "products" | "systems" | "bespoke";

export interface Service {
  id: string;
  category: Exclude<ServiceCategory, "all">;
  /** Name of the icon in the shared service icon registry. */
  icon: keyof typeof serviceIcons;
  title: string;
  description: string;
  tag: string;
  categoryLabel: string;
  deliverables: string[];
  operationalScope: string;
}

export interface ServicesSectionCopy {
  eyebrow: string;
  eyebrowSub: string;
  headline: string[];
  description: string;
  filterLabels: Record<ServiceCategory, string>;
  deliverablesHeading: string;
  ctaAction: string;
  commitmentsHeading: string;
  commitments: Array<{
    number: string;
    title: string;
    desc: string;
  }>;
  bottomBanner: {
    tag: string;
    headline: string;
    subtext: string;
    primaryCta: string;
    secondaryCta: string;
  };
}

export const servicesSectionCopy: ServicesSectionCopy = {
  eyebrow: "02 / SERVICES",
  eyebrowSub: "DIGITAL PRODUCTS · BUSINESS SYSTEMS · CUSTOM ENGINEERING",
  headline: [
    "SOFTWARE BUILT",
    "FOR HOW YOUR BUSINESS",
    "ACTUALLY OPERATES.",
  ],
  description:
    "We design digital products and business systems around real workflows, constraints, and teams—not around the limitations of generic software.",
  filterLabels: {
    all: "All services",
    products: "Digital products",
    systems: "Business systems",
    bespoke: "Custom engineering",
  },
  deliverablesHeading: "Deliverables",
  ctaAction: "Discuss scope",
  commitmentsHeading: "ENGINEERING PRINCIPLES",
  commitments: [
    {
      number: "01",
      title: "Ownership",
      desc: "Source code, documentation, and deployment assets stay under your control.",
    },
    {
      number: "02",
      title: "Open architecture",
      desc: "Prefer portable, maintainable systems over unnecessary platform dependence.",
    },
    {
      number: "03",
      title: "Workflow-first",
      desc: "Interfaces and business rules are shaped around the way your team actually operates.",
    },
    {
      number: "04",
      title: "Operational resilience",
      desc: "Performance, observability, backups, and graceful failure are part of the build.",
    },
  ],
  bottomBanner: {
    tag: "BEYOND THE CATALOG",
    headline: "Need something outside these service lines?",
    subtext:
      "We can scope a custom system, integration, internal tool, or operational platform around the problem you need to solve.",
    primaryCta: "Start a conversation",
    secondaryCta: "Explore our process",
  },
};

export const services: Service[] = [
  {
    id: "desarrollo-web",
    category: "products",
    icon: "web",
    title: "Web Platforms & Applications",
    description:
      "Client portals, operational consoles, internal tools, and public-facing platforms built for the browser.",
    tag: "Browser-native · Cloud",
    categoryLabel: "Digital Products",
    deliverables: [
      "Frontend & backend architecture",
      "Secure client and admin portals",
      "REST & GraphQL APIs",
      "Continuous delivery & cloud deployment",
    ],
    operationalScope:
      "Designed for clear onboarding, maintainable code, and dependable access across distributed teams.",
  },
  {
    id: "apps-mobile",
    category: "products",
    icon: "mobile",
    title: "Mobile Field & Operational Apps",
    description:
      "Mobile applications for logistics, field teams, warehouse operations, and direct customer workflows.",
    tag: "iOS · Android · Offline-first",
    categoryLabel: "Digital Products",
    deliverables: [
      "Cross-platform mobile applications",
      "Offline storage & synchronization",
      "Camera, barcode & GPS integrations",
      "Push notifications & background tasks",
    ],
    operationalScope:
      "Built for fast-moving environments where connectivity, battery life, and response time matter.",
  },
  {
    id: "apps-desktop",
    category: "products",
    icon: "desktop",
    title: "Desktop Systems & Local Stations",
    description:
      "Desktop software for fixed workstations, point of sale, warehouses, production floors, and connected peripherals.",
    tag: "Windows · macOS · Linux · Local-first",
    categoryLabel: "Digital Products",
    deliverables: [
      "Standalone desktop applications",
      "USB / Serial peripheral integrations",
      "Local transactional storage",
      "Background synchronization & recovery",
    ],
    operationalScope:
      "Keeps critical work moving when local speed and network independence are more important than cloud-only workflows.",
  },
  {
    id: "implementacion-odoo",
    category: "systems",
    icon: "odoo",
    title: "Odoo Implementation",
    description:
      "Configuration, customization, integrations, and rollout of Odoo around your sales, inventory, operations, and invoicing workflows.",
    tag: "ERP · Open architecture",
    categoryLabel: "Business Systems",
    deliverables: [
      "Process mapping & data preparation",
      "Localization & electronic invoicing",
      "Custom Python modules & reports",
      "Migration, rollout & team training",
    ],
    operationalScope:
      "Creates a coherent operational system while reducing duplicate work across sales, stock, purchasing, and administration.",
  },
  {
    id: "implementacion-erpnext",
    category: "systems",
    icon: "erpnext",
    title: "ERPNext & Frappe Systems",
    description:
      "Open-source business systems tailored to workflows, permissions, records, reporting, and integrations.",
    tag: "Open source · Frappe",
    categoryLabel: "Business Systems",
    deliverables: [
      "Production infrastructure & hardening",
      "Custom DocTypes & workflows",
      "External service & payment integrations",
      "Backups, monitoring & maintenance",
    ],
    operationalScope:
      "A practical option for organizations that value control of their application and data without unnecessary licensing complexity.",
  },
  {
    id: "desarrollos-a-medida",
    category: "bespoke",
    icon: "puzzle",
    title: "Bespoke Software & Custom Engines",
    description:
      "Specialized software for business rules, calculations, pricing, integrations, and operational workflows that standard products cannot fit.",
    tag: "Custom core · Proprietary logic",
    categoryLabel: "Custom Engineering",
    deliverables: [
      "Domain-focused architecture & data models",
      "Custom calculation and rules engines",
      "APIs, webhooks & legacy integrations",
      "Technical documentation & handover",
    ],
    operationalScope:
      "Turns a specific operational requirement or competitive advantage into maintainable software you control.",
  },
];
