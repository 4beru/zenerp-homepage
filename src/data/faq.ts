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
