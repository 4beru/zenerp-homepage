export type Stat = {
  value: string;
  unit: string;
  label: string;
  detail: string;
};

export const stats: Stat[] = [
  {
    value: "06",
    unit: "capabilities",
    label: "Services",
    detail: "Digital products, business systems, and custom engineering.",
  },
  {
    value: "04",
    unit: "stages",
    label: "Approach",
    detail: "From diagnosis and scope through build, launch, and support.",
  },
  {
    value: "03",
    unit: "anchors",
    label: "Primary navigation",
    detail: "Services, Approach, and Contact keep the public story focused.",
  },
  {
    value: "01",
    unit: "intake",
    label: "Direct project brief",
    detail: "The site can move from exploration to a concrete project request.",
  },
];

export const statsSectionCopy = {
  eyebrow: "AT A GLANCE",
  eyebrowSub: "THE SYSTEM IS DELIBERATELY SMALL",
  title: ["A FEW FACTS", "ABOUT THE SYSTEM."],
  description:
    "No performance theater. Just a compact architecture for explaining what Zen ERP does, how it works, and how a project starts.",
};
