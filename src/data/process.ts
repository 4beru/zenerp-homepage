import type { processIcons } from "@/components/zen/icons";

export type Step = {
  title: string;
  icon: keyof typeof processIcons;
  kicker: string;
  description: string;
};

export const steps: Step[] = [
  {
    title: "Diagnosis",
    icon: "chat",
    kicker: "Start with the operation",
    description:
      "We map how the business works today, where information gets stuck, and what the system actually needs to change.",
  },
  {
    title: "Scope",
    icon: "note",
    kicker: "Make the work explicit",
    description:
      "The proposal defines what is included, what is not, what gets built first, and which decisions still need input.",
  },
  {
    title: "Build",
    icon: "hammer",
    kicker: "Show working software",
    description:
      "Implementation happens in understandable stages so the people who will use the result can react to real software, not abstract promises.",
  },
  {
    title: "Launch & support",
    icon: "handshake",
    kicker: "Stay close to production",
    description:
      "We prepare the release, hand over the system clearly, and keep the path open for support, maintenance, and future improvements.",
  },
];
