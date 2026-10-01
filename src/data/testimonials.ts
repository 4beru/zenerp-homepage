export type ClientPerspective = {
  index: string;
  brief: string;
  principle: string;
  response: string;
};

export const testimonials: ClientPerspective[] = [
  {
    index: "01",
    brief: "“We have sales in one place, stock in another, and the team is filling the gaps by hand.”",
    principle: "Map the workflow before replacing the tools.",
    response: "Start with the points where information changes hands. The first job is usually clarity, not software.",
  },
  {
    index: "02",
    brief: "“Our field team cannot depend on a perfect connection.”",
    principle: "Design for the environment people actually work in.",
    response: "Offline-first flows, local state, and deliberate synchronization can matter more than another dashboard.",
  },
  {
    index: "03",
    brief: "“The existing platform is useful, but one critical process does not fit it.”",
    principle: "Extend the system only where the operation needs it.",
    response: "Keep the stable core and add focused custom behavior instead of rebuilding everything.",
  },
  {
    index: "04",
    brief: "“We need customers to do more without adding more admin work.”",
    principle: "Automate the repeatable path.",
    response: "Portals, notifications, integrations, and clear self-service flows can move routine work out of the inbox.",
  },
];

export const testimonialsSectionCopy = {
  eyebrow: "CLIENT PERSPECTIVES",
  eyebrowSub: "RECURRING PROBLEM SHAPES · NOT ATTRIBUTED TESTIMONIALS",
  title: ["THE BRIEF CHANGES.", "THE PRINCIPLE DOESN'T."],
  description:
    "These are common operational briefs, written as patterns rather than invented client quotes. The response is where the engineering work begins.",
};
