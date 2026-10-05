import type { serviceIcons } from "@/components/zen/icons";

export type ServiceCategory = "all" | "products" | "systems" | "bespoke";

export interface Service {
  id: string;
  index: string;
  category: Exclude<ServiceCategory, "all">;
  icon: keyof typeof serviceIcons;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  categoryLabel: string;
  image: string;
  imageAlt: string;
  deliverables: string[];
  operationalScope: string;
}

export interface ServicesSectionCopy {
  eyebrow: string;
  eyebrowSub: string;
  catalogCode: string;
  headline: string[];
  description: string;
  filterLabels: Record<ServiceCategory, string>;
  deliverablesHeading: string;
  ctaAction: string;
}

export const servicesSectionCopy: ServicesSectionCopy = {
  eyebrow: "02 / SERVICES",
  eyebrowSub: "DIGITAL PRODUCTS · BUSINESS SYSTEMS · CUSTOM ENGINES",
  catalogCode: "DSGN/06",
  headline: [
    "SOFTWARE BUILT",
    "FOR HOW YOUR BUSINESS",
    "ACTUALLY OPERATES.",
  ],
  description:
    "We engineer digital platforms and enterprise systems around real workflows, operational constraints, and human teams—eliminating friction, bloat, and manual workarounds.",
  filterLabels: {
    all: "All disciplines",
    products: "Digital products",
    systems: "Business systems",
    bespoke: "Custom engineering",
  },
  deliverablesHeading: "Core deliverables",
  ctaAction: "Explore scope ↗",
};

export const services: Service[] = [
  {
    id: "desarrollo-web",
    index: "01",
    category: "products",
    icon: "web",
    title: "WEB PLATFORMS",
    subtitle: "Browser-native digital products",
    description:
      "Client portals, operational consoles, and customer-facing web platforms engineered with intuitive flow, high throughput, and quiet stability.",
    tag: "Browser-Native · Cloud Architecture",
    categoryLabel: "Digital Products",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Modern web architecture workstation with digital code display",
    deliverables: [
      "Frontend & backend architecture",
      "Secure client and admin portals",
      "REST & GraphQL high-speed APIs",
      "Continuous deployment & cloud observability",
    ],
    operationalScope:
      "Designed for clear team onboarding, maintainable codebases, and dependable access across distributed organizations.",
  },
  {
    id: "apps-mobile",
    index: "02",
    category: "products",
    icon: "mobile",
    title: "MOBILE OPERATIONS",
    subtitle: "Field & offline-first apps",
    description:
      "Mobile workflows for logistics, dispatch, field technicians, and direct customer interactions that remain resilient under unstable connections.",
    tag: "iOS & Android · Offline-First",
    categoryLabel: "Digital Products",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Tactile mobile interface in hands with clean typography",
    deliverables: [
      "Cross-platform iOS and Android apps",
      "Local-first storage & background sync",
      "Camera, barcode scanner & GPS telemetry",
      "Real-time notifications & field dispatch",
    ],
    operationalScope:
      "Built for demanding physical environments where responsiveness, battery conservation, and zero data loss matter.",
  },
  {
    id: "apps-desktop",
    index: "03",
    category: "products",
    icon: "desktop",
    title: "DESKTOP & STATIONS",
    subtitle: "Workstations & local hardware",
    description:
      "Dedicated desktop applications for fixed workstations, point-of-sale setups, warehouses, and industrial peripherals.",
    tag: "macOS · Windows · Linux · Local Core",
    categoryLabel: "Digital Products",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "High-precision physical workstation with dual displays and peripherals",
    deliverables: [
      "Standalone native desktop software",
      "Direct USB, serial & printer integrations",
      "Local transactional database & crash recovery",
      "Asynchronous synchronization with cloud ERP",
    ],
    operationalScope:
      "Guarantees operational continuity on the physical floor when local speed and zero-latency hardware execution are required.",
  },
  {
    id: "implementacion-odoo",
    index: "04",
    category: "systems",
    icon: "odoo",
    title: "ODOO ENTERPRISE",
    subtitle: "Unified business management",
    description:
      "End-to-end implementation and customization of Odoo across inventory, billing, manufacturing, sales pipelines, and financial ledger.",
    tag: "Open ERP Core · Tailored Modules",
    categoryLabel: "Business Systems",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Architectural automated warehouse with amber illumination and inventory grids",
    deliverables: [
      "Operational workflow mapping & data cleanup",
      "Fiscal localization & electronic invoicing",
      "Custom Python modules & automated triggers",
      "Zero-downtime migration, testing & rollout",
    ],
    operationalScope:
      "Creates a unified single source of truth across warehouse, procurement, accounting, and leadership.",
  },
  {
    id: "implementacion-erpnext",
    index: "05",
    category: "systems",
    icon: "erpnext",
    title: "ERPNEXT SYSTEMS",
    subtitle: "Open enterprise infrastructure",
    description:
      "Flexible Frappe-based business engines tailored to strict internal permissions, custom records, automated workflows, and full data sovereignty.",
    tag: "Open Source · Zero License Fees",
    categoryLabel: "Business Systems",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Monolithic geometric steel and glass skyscraper rising into calm sky",
    deliverables: [
      "Production-grade server infrastructure",
      "Custom DocTypes, scripting & business rules",
      "Payment gateway & external API links",
      "Automated backups & system monitoring",
    ],
    operationalScope:
      "Ideal for forward-thinking organizations that demand complete code ownership and control over their enterprise data.",
  },
  {
    id: "desarrollos-a-medida",
    index: "06",
    category: "bespoke",
    icon: "puzzle",
    title: "BESPOKE ENGINES",
    subtitle: "Proprietary software engines",
    description:
      "Specialized calculation logic, pricing formulas, legacy database bridges, and custom micro-services that off-the-shelf software cannot solve.",
    tag: "Proprietary Logic · Custom Computation",
    categoryLabel: "Custom Engineering",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Precision silicon circuitry and macro computational traces",
    deliverables: [
      "Domain-specific computational engines",
      "High-throughput webhook pipelines",
      "Legacy system adapters & database ETL",
      "Complete architectural documentation & handover",
    ],
    operationalScope:
      "Transforms your proprietary operational advantage into robust, secure, maintainable software asset that you own forever.",
  },
];
