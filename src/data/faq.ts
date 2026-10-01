export type FaqItem = {
  question: string;
  answer: string;
};

export const faqs: FaqItem[] = [
  {
    question: "Do you only work with Odoo and ERPNext?",
    answer:
      "No. They are useful starting points when the operation fits them. We also build web products, mobile applications, desktop tools, integrations, and focused custom software.",
  },
  {
    question: "How do we decide what should be built?",
    answer:
      "We start from the workflow: what happens today, where information is duplicated or lost, who touches each step, and what needs to change. The technical solution follows that map.",
  },
  {
    question: "Can you work with our existing system?",
    answer:
      "Yes. An existing system can be extended, integrated, migrated from, or gradually replaced. The first goal is to understand what is already stable before changing it.",
  },
  {
    question: "What does delivery look like?",
    answer:
      "Work is divided into understandable stages. You see the scope, the current state of the build, and the next decisions instead of waiting for a single reveal at the end.",
  },
  {
    question: "Can you build mobile and desktop software too?",
    answer:
      "Yes. Mobile field applications, local workstations, POS-style software, and connected desktop systems are part of the same engineering practice.",
  },
  {
    question: "What do you need from us to start?",
    answer:
      "A clear description of the problem is enough. The Scope Builder can help structure it, or you can send the situation exactly as it is and we will help turn it into a first technical direction.",
  },
];

export const faqSectionCopy = {
  eyebrow: "FREQUENT QUESTIONS",
  eyebrowSub: "BEFORE THE FIRST CONVERSATION",
  title: ["WHAT PEOPLE", "ASK BEFORE", "STARTING."],
  description:
    "The practical questions first. No sales script, no inflated guarantees, and no assumption that every problem needs a new platform.",
};
