export type StudioPractice = {
  index: string;
  title: string;
  description: string;
  capabilities: readonly string[];
};

export const team: readonly StudioPractice[] = [
  {
    index: "01",
    title: "Product & Interface",
    description:
      "Turn business requirements into clear web and mobile experiences that people can operate without fighting the software.",
    capabilities: ["Web platforms", "Mobile apps", "UX architecture", "Design systems"],
  },
  {
    index: "02",
    title: "Business Systems",
    description:
      "Map the operation, shape the records and permissions, then configure or extend the system around the real workflow.",
    capabilities: ["Odoo", "ERPNext", "Data migration", "Operational workflows"],
  },
  {
    index: "03",
    title: "Engineering & Integration",
    description:
      "Build the pieces that connect everything: APIs, automation, local stations, integrations, synchronization, and the infrastructure underneath.",
    capabilities: ["APIs", "Automation", "Offline-first", "Deployment"],
  },
];

export const teamNote =
  "Small by design. The studio stays close to the problem, the code, and the people who will use the result.";

export const teamSectionCopy = {
  eyebrow: "THE STUDIO",
  eyebrowSub: "SMALL TEAM · DIRECT ACCESS",
  title: ["THREE PRACTICES.", "ONE SYSTEM MINDSET."],
  description:
    "We do not need a large org chart to do complex work. Product, systems, and engineering stay in the same conversation.",
};
