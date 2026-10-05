import { mediaAssets, type MediaAsset } from "@/data/media";

export interface SelectedWork {
  id: string;
  number: string;
  title: string;
  client: string;
  descriptor: string;
  category: string;
  impactMetric: string;
  impactLabel: string;
  techStack: readonly string[];
  media: MediaAsset;
  href: string;
}

export const selectedWorks: readonly SelectedWork[] = [
  {
    id: "work-arkin-logistics",
    number: "01",
    title: "Arkin Distribution Network",
    client: "Arkin Logistics S.A.",
    descriptor:
      "Migration of fragmented legacy spreadsheets into a centralized Odoo 18 ERP core covering multi-warehouse replenishment, dispatch tracking, and automated AFIP billing.",
    category: "ERP CORE · ODOO",
    impactMetric: "-68%",
    impactLabel: "Reduction in fulfillment dispatch delays",
    techStack: ["Odoo 18", "Python", "PostgreSQL", "Docker"],
    media: mediaAssets.workErpLogistics,
    href: "#contacto",
  },
  {
    id: "work-vanguard-portal",
    number: "02",
    title: "Vanguard Commercial Platform",
    client: "Vanguard Capital Partners",
    descriptor:
      "High-throughput client self-service portal and real-time ledger reconciliation engine with sub-second portfolio valuations.",
    category: "WEB PLATFORM & LEDGER",
    impactMetric: "< 350ms",
    impactLabel: "End-to-end ledger audit execution",
    techStack: ["Next.js", "React 19", "Tailwind", "Node.js"],
    media: mediaAssets.workEnterprise,
    href: "#contacto",
  },
  {
    id: "work-caelum-manufacturing",
    number: "03",
    title: "Caelum Industrial ERPNext",
    client: "Caelum Precision Parts",
    descriptor:
      "Turnkey ERPNext deployment orchestrating shop-floor bill of materials (BOM), tooling maintenance schedules, and quality assurance gating.",
    category: "MANUFACTURING · ERPNEXT",
    impactMetric: "38 days",
    impactLabel: "From kickoff to production shop-floor rollout",
    techStack: ["ERPNext", "Frappe Framework", "MariaDB", "Python"],
    media: mediaAssets.workCloudFinancial,
    href: "#contacto",
  },
  {
    id: "work-atlas-mobile",
    number: "04",
    title: "Atlas Field Ops Suite",
    client: "Atlas Infrastructure Group",
    descriptor:
      "Offline-first mobile inspection and dispatch application for over 180 field civil engineers operating across regional sites with zero connectivity.",
    category: "OFFLINE-FIRST MOBILE",
    impactMetric: "100%",
    impactLabel: "Zero data loss across disconnected site audits",
    techStack: ["Flutter", "SQLite", "Next.js API", "TypeScript"],
    media: mediaAssets.workMobileOperations,
    href: "#contacto",
  },
];
