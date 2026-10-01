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
