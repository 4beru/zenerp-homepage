/**
 * Team / Studio — the people behind the software.
 */

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  initials: string;
  specialties: readonly string[];
  portrait: string;
};

export const team: readonly TeamMember[] = [
  {
    name: "Matías Z.",
    role: "Founder · ERP Implementation",
    bio:
      "Fifteen years inside factories and shops watching where money disappears: stock that doesn't close, spreadsheets that crash. Today he leads every Odoo and ERPNext implementation—and writes a good part of the code.",
    initials: "MZ",
    specialties: ["Odoo", "ERPNext", "Python", "PostgreSQL"],
    portrait:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=750&fit=crop&crop=faces&q=80",
  },
  {
    name: "Camila R.",
    role: "Full-stack Developer",
    bio:
      "Turns business processes into screens people use without a manual. B2B portals, custom dashboards, odd integrations nobody wants to inherit—and she leaves them clean.",
    initials: "CR",
    specialties: ["Next.js", "React", "Node.js", "APIs"],
    portrait:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=750&fit=crop&crop=faces&q=80",
  },
  {
    name: "Joaquín P.",
    role: "Mobile & Automation",
    bio:
      "Delivery apps that last a full day without signal and drivers who adopt them without training. If a process can be automated, he's already thinking how.",
    initials: "JP",
    specialties: ["Flutter", "Offline-first", "Sync", "Firebase"],
    portrait:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=750&fit=crop&crop=faces&q=80",
  },
];

export const teamNote =
  "Small team by design: the person who estimates your project is the one who codes it. No management layers, no account managers, no hold music.";

export const teamSectionCopy = {
  eyebrow: "06 / THE STUDIO",
  eyebrowSub: "SMALL TEAM · DIRECT ACCESS",
  title: ["THE PEOPLE BEHIND", "THE SOFTWARE."],
  description:
    "A small studio on purpose. Whoever listens to your problem, scopes the work, and writes the code is the same person—from first call to launch.",
};
