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
      "Interfaces should make the next action obvious. Complexity belongs in the system, not in the user's head.",
  },
  {
    index: "02",
    title: "Ownership",
    description:
      "We document decisions, keep architecture legible, and avoid unnecessary dependence on a single platform.",
  },
  {
    index: "03",
    title: "Direct access",
    description:
      "The people close to the problem stay close to the implementation. Questions should move through the same channel as the work.",
  },
  {
    index: "04",
    title: "Restraint",
    description:
      "Use technology when it improves the operation. Skip the effect, dependency, or abstraction that only makes the system harder to carry.",
  },
];

export const philosophySectionCopy = {
  eyebrow: "PRINCIPLES",
  eyebrowSub: "HOW WE BUILD",
  title: ["SOFTWARE SHOULD FIT", "THE WAY PEOPLE WORK."],
  description:
    "Zen is a working standard, not a visual pose. These four principles shape what we build and what we leave out.",
};
