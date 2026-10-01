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
