export type ScopeCategory = {
  id: string;
  label: string;
  description: string;
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
    description: "A web product, client portal, or customer-facing application.",
  },
  {
    id: "business-system",
    label: "Business System",
    description: "A system for sales, stock, purchasing, operations, or administration.",
  },
  {
    id: "mobile-app",
    label: "Mobile Application",
    description: "A field, logistics, delivery, or customer-facing mobile workflow.",
  },
  {
    id: "custom-engineering",
    label: "Custom Engineering",
    description: "A focused tool, integration, automation, or specialized platform.",
  },
];

export const scopeNeeds: ScopeNeed[] = [
  { id: "crm", categoryId: "business-system", label: "CRM & sales pipeline" },
  { id: "inventory", categoryId: "business-system", label: "Inventory & stock" },
  { id: "invoicing", categoryId: "business-system", label: "Invoicing & administration" },
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
    label: "Spreadsheets and manual work",
    hint: "No system or too much work outside one",
  },
  {
    id: "outgrown",
    label: "A system that no longer fits",
    hint: "Useful core, important gaps",
  },
  {
    id: "complex",
    label: "Too much complexity",
    hint: "The system has become hard to operate",
  },
  {
    id: "none",
    label: "Starting from scratch",
    hint: "A clean starting point",
  },
];

export const scopeBuilderCopy = {
  eyebrow: "DEFINE THE SCOPE",
  eyebrowSub: "A PRODUCTIVE STARTING POINT",
  title: ["WHAT ARE YOU", "BUILDING?"],
  description:
    "Answer three short questions, then turn the result into a real project brief. The form stays on this page so the context is not lost.",
  steps: [
    "Project type",
    "Core needs",
    "Current situation",
  ],
  resultHeading: "PROJECT BRIEF",
  formHeading: "SEND THE BRIEF",
  ctaLabel: "Build the brief",
  resetLabel: "Start over",
};
