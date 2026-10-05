/**
 * Site configuration for Zen ERP: branding, contact channels, and navigation.
 */
export const siteConfig = {
  name: "Zen ERP",
  tagline: "Calm software, built to your measure.",
  description:
    "We develop web, mobile, and desktop applications and implement management systems (ERP) like Odoo and ERPNext, tailored to your business operations. Calm, precise, reliable.",
  url: "https://zenerp.com",

  /** Inbound lead mailbox. */
  email: "contacto@zenerp.com",

  /** Direct WhatsApp channel. Set to null to hide. */
  whatsapp: {
    displayNumber: "+54 9 11 0000-0000",
    link: "https://wa.me/5491100000000?text=Hello%2C%20I%20would%20like%20to%20discuss%20a%20project",
  } as { displayNumber: string; link: string } | null,
} as const;

/**
 * Primary navigation links.
 */
export type NavLink = {
  href: string;
  label: string;
  ready: boolean;
  footerOnly?: boolean;
};

export const navLinks: readonly NavLink[] = [
  { href: "#servicios", label: "Services", ready: true },
  { href: "#works", label: "Works", ready: true },
  { href: "#proceso", label: "Approach", ready: true },
  { href: "#contacto", label: "Contact", ready: true },
];

/** Technology stack ticker for hero and capabilities. */
export const stack = [
  { name: "Odoo", note: "All-in-one open source ERP" },
  { name: "ERPNext", note: "Flexible open enterprise core" },
  { name: "React", note: "Modern responsive web interfaces" },
  { name: "Next.js", note: "Fast scalable server-driven web" },
  { name: "Node.js", note: "High-throughput APIs & backends" },
  { name: "Flutter", note: "Cross-platform iOS and Android apps" },
  { name: "PostgreSQL", note: "Mission-critical relational data" },
  { name: "Python", note: "Automation workflows & business logic" },
] as const;
