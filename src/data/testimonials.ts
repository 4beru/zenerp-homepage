/**
 * Testimonials — client voices from real engagements.
 */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  industry: string;
  result: string;
  index: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "We came from spreadsheets and three systems that couldn't talk to each other. Today, stock closes on its own and the factory works off a single screen. What I value most: they always explained things in plain language.",
    name: "Martín G.",
    role: "Factory owner",
    industry: "Manufacturing · Odoo",
    result: "Real-time inventory",
    index: "01",
  },
  {
    quote:
      "We had three branches and three different versions of the same company. With ERPNext we unified everything without paying per-branch licenses. The migration was gradual—we never stopped selling.",
    name: "Carolina R.",
    role: "Operations manager",
    industry: "Multi-branch retail · ERPNext",
    result: "3 branches, one system",
    index: "02",
  },
  {
    quote:
      "Our drivers work with the app even where there's no signal: it marks the order offline and syncs when they return. The drivers adopted it in two days—and they hate changing apps.",
    name: "Diego S.",
    role: "Logistics coordinator",
    industry: "Distribution · Flutter app",
    result: "Offline deliveries, zero paper",
    index: "03",
  },
  {
    quote:
      "Our B2B clients now order themselves through the portal, check balances, and download invoices. The sales team stopped answering repetitive emails and went back to selling.",
    name: "Lucía T.",
    role: "Commercial lead",
    industry: "B2B portal · Next.js",
    result: "Self-service orders 24/7",
    index: "04",
  },
];

export const testimonialsSectionCopy = {
  eyebrow: "05 / CLIENT VOICES",
  eyebrowSub: "REAL ENGAGEMENTS · ABBREVIATED FOR CONFIDENTIALITY",
  title: ["WHAT THE PEOPLE", "WE WORK WITH SAY."],
  description:
    "Clients from different industries, at different stages. Names abbreviated for confidentiality—full case studies shared when they let us.",
};
