/**
 * Stats / Proof — editorial metric field.
 */

export type Stat = {
  value: number;
  suffix: string;
  full: string;
  label: string;
  detail: string;
};

export const stats: Stat[] = [
  {
    value: 15,
    suffix: "min",
    full: "15 minutes",
    label: "First conversation",
    detail: "No charge, no commitment",
  },
  {
    value: 3,
    suffix: "paths",
    full: "3 possible paths",
    label: "For every project",
    detail: "Odoo, ERPNext, or custom engineering",
  },
  {
    value: 24,
    suffix: "h",
    full: "24 hours maximum",
    label: "Response time",
    detail: "On business days",
  },
  {
    value: 100,
    suffix: "%",
    full: "100 percent yours",
    label: "Your code and your data",
    detail: "Always yours, no hostages",
  },
];

export const statsSectionCopy = {
  eyebrow: "04 / PROOF",
  eyebrowSub: "VERIFIABLE STUDIO CLAIMS",
  title: ["WHAT THE WORK", "PRODUCES."],
  description:
    "Numbers that describe how we operate—not how we wish we did. Each metric reflects a real commitment we keep.",
};
