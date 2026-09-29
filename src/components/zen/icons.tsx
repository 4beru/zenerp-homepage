import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** Flor de loto — la marca de Zen ERP como ícono lineal. */
export function LotusIcon(p: IconProps) {
  return (
    <svg {...base} width={24} height={24} {...p}>
      <path d="M12 4c-1.9 2.6-1.9 6.4 0 9 1.9-2.6 1.9-6.4 0-9Z" />
      <path d="M7.5 6.5C7 9.6 8.4 12.4 11 13.6M16.5 6.5c.5 3.1-.9 5.9-3.5 7.1" />
      <path d="M3.5 11c1.2 2.6 3.8 4.3 7 4.5M20.5 11c-1.2 2.6-3.8 4.3-7 4.5" />
      <path d="M5 18.5c2.2 1.4 4.5 2 7 2s4.8-.6 7-2" />
    </svg>
  );
}

export function ArrowRightIcon(p: IconProps) {
  return (
    <svg {...base} width={20} height={20} {...p}>
      <path d="M4 12h16m-6-6 6 6-6 6" />
    </svg>
  );
}

export function MenuIcon(p: IconProps) {
  return (
    <svg {...base} width={24} height={24} {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(p: IconProps) {
  return (
    <svg {...base} width={24} height={24} {...p}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function MailIcon(p: IconProps) {
  return (
    <svg {...base} width={20} height={20} {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function WhatsAppIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={20} height={20} aria-hidden {...p}>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6c-.3-.1-1.5-.8-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.4-3c-.3-.4 0-.5.1-.7l.5-.6c.1-.2.1-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1 2.2-.3 3.6a11 11 0 0 0 4.6 4.4c1.9.8 2.7.9 3.6.7.6-.1 1.5-.6 1.7-1.3.2-.6.2-1.2.2-1.3-.1-.2-.3-.2-.6-.4Z" />
    </svg>
  );
}

export function CheckIcon(p: IconProps) {
  return (
    <svg {...base} width={20} height={20} {...p}>
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

export function WebIcon(p: IconProps) {
  return (
    <svg {...base} width={24} height={24} {...p}>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 8h18M7 21h10M12 18v3" />
    </svg>
  );
}

export function MobileIcon(p: IconProps) {
  return (
    <svg {...base} width={24} height={24} {...p}>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M11 18.5h2" />
    </svg>
  );
}

export function DesktopIcon(p: IconProps) {
  return (
    <svg {...base} width={24} height={24} {...p}>
      <rect x="2.5" y="4" width="19" height="12.5" rx="2" />
      <path d="M9 20.5h6M12 16.5v4" />
    </svg>
  );
}

/** Odoo: anillo característico simplificado. */
export function OdooIcon(p: IconProps) {
  return (
    <svg {...base} width={24} height={24} {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.5" />
    </svg>
  );
}

/** ERPNext: capas / engranaje simplificado. */
export function ErpNextIcon(p: IconProps) {
  return (
    <svg {...base} width={24} height={24} {...p}>
      <path d="M12 3l8 4.5-8 4.5-8-4.5L12 3Z" />
      <path d="M4 12l8 4.5 8-4.5" />
      <path d="M4 16.5L12 21l8-4.5" />
    </svg>
  );
}

export function PuzzleIcon(p: IconProps) {
  return (
    <svg {...base} width={24} height={24} {...p}>
      <path d="M10 4a2 2 0 1 1 4 0v1h3a1 1 0 0 1 1 1v3h-1a2 2 0 1 0 0 4h1v3a1 1 0 0 1-1 1h-3v-1a2 2 0 1 0-4 0v1H7a1 1 0 0 1-1-1v-3H5a2 2 0 1 1 0-4h1V6a1 1 0 0 1 1-1h3V4Z" />
    </svg>
  );
}

export function ArrowUpIcon(p: IconProps) {
  return (
    <svg {...base} width={20} height={20} {...p}>
      <path d="M12 20V4m-6 6 6-6 6 6" />
    </svg>
  );
}

export const serviceIcons = {
  web: WebIcon,
  mobile: MobileIcon,
  desktop: DesktopIcon,
  odoo: OdooIcon,
  erpnext: ErpNextIcon,
  puzzle: PuzzleIcon,
} as const;

/** Diagnóstico: conversación / diálogo. */
export function ChatIcon(p: IconProps) {
  return (
    <svg {...base} width={20} height={20} {...p}>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v7a2.5 2.5 0 0 1-2.5 2.5H9l-4.4 3.6a.5.5 0 0 1-.8-.4L3.7 15H4V5.5Z" />
      <path d="M8 8h8M8 11.5h5" />
    </svg>
  );
}

/** Propuesta: documento por escrito. */
export function NoteIcon(p: IconProps) {
  return (
    <svg {...base} width={20} height={20} {...p}>
      <path d="M6 3.5h9L19.5 8v11a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 19V5A1.5 1.5 0 0 1 6 3.5Z" />
      <path d="M14.5 3.5V8h5" />
      <path d="M8 12h8M8 15.5h5.5" />
    </svg>
  );
}

/** Entrega y soporte. */
export function HandshakeIcon(p: IconProps) {
  return (
    <svg {...base} width={20} height={20} {...p}>
      <path d="M3 11l3-3 4 1 2-1 2 1 4-1 3 3" />
      <path d="M8 13l2.5 2.5a1.5 1.5 0 0 0 2.1 0L15 13" />
      <path d="M6 12l3.5 4M18 12l-3.5 4" />
    </svg>
  );
}

export const processIcons = {
  chat: ChatIcon,
  note: NoteIcon,
  hammer: HammerIcon,
  handshake: HandshakeIcon,
} as const;

export function HammerIcon(p: IconProps) {
  return (
    <svg {...base} width={20} height={20} {...p}>
      <path d="m14 6 4 4-2.5 2.5L11.5 9 14 6Z" />
      <path d="m11.5 9-7 7 2.5 2.5 7-7" />
      <path d="m14.5 3.5 2 2L19 4l1.5 1.5" />
    </svg>
  );
}

/* ============ Proyectos (04) ============ */

/** Manufactura: fábrica con chimenea. */
export function FactoryIcon(p: IconProps) {
  return (
    <svg {...base} width={24} height={24} {...p}>
      <path d="M3.5 20.5V9l5 3.5V9l5 3.5V9l5 3.5v8h-15Z" />
      <path d="M3.5 20.5h17" />
      <path d="M7.5 16.5h2M12.5 16.5h2M17 16.5h1" />
    </svg>
  );
}

/** Retail: local con toldo. */
export function StoreIcon(p: IconProps) {
  return (
    <svg {...base} width={24} height={24} {...p}>
      <path d="M4 9.5 5.5 4h13L20 9.5" />
      <path d="M4 9.5a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0" />
      <path d="M5.5 12v8.5h13V12" />
      <path d="M9.5 20.5v-5h5v5" />
    </svg>
  );
}

/** Logística: camión de reparto. */
export function TruckIcon(p: IconProps) {
  return (
    <svg {...base} width={24} height={24} {...p}>
      <path d="M2.5 6.5h11v10h-11z" />
      <path d="M13.5 10h4l3 3v3.5h-7z" />
      <circle cx="6.5" cy="18" r="1.8" />
      <circle cx="17" cy="18" r="1.8" />
    </svg>
  );
}

/** Portal web B2B: globo. */
export function GlobeIcon(p: IconProps) {
  return (
    <svg {...base} width={24} height={24} {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.6 2.4 4 5.2 4 8.5s-1.4 6.1-4 8.5c-2.6-2.4-4-5.2-4-8.5s1.4-6.1 4-8.5Z" />
    </svg>
  );
}

export const projectIcons = {
  factory: FactoryIcon,
  store: StoreIcon,
  truck: TruckIcon,
  globe: GlobeIcon,
} as const;

/* ============ Filosofía (05) ============ */

/** Simpleza: hoja. */
export function LeafIcon(p: IconProps) {
  return (
    <svg {...base} width={20} height={20} {...p}>
      <path d="M5 19C4 13 7 4.5 19 4.5c1 8.5-4.5 13-11 13" />
      <path d="M5 19c2-5 5.5-8.5 10-10.5" />
    </svg>
  );
}

/** Transparencia: ojo. */
export function EyeIcon(p: IconProps) {
  return (
    <svg {...base} width={20} height={20} {...p}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

/** Cercanía: dos personas. */
export function UsersIcon(p: IconProps) {
  return (
    <svg {...base} width={20} height={20} {...p}>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19.5c.6-3 2.7-4.5 5.5-4.5s4.9 1.5 5.5 4.5" />
      <path d="M15.5 6a3 3 0 0 1 0 5.5M17.5 15.5c1.8.5 3 1.8 3.5 4" />
    </svg>
  );
}

/** Calma: luna creciente. */
export function MoonIcon(p: IconProps) {
  return (
    <svg {...base} width={20} height={20} {...p}>
      <path d="M20 13.5A8 8 0 0 1 10.5 4a8 8 0 1 0 9.5 9.5Z" />
      <path d="m16 4.5.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8Z" />
    </svg>
  );
}

export const philosophyIcons = {
  leaf: LeafIcon,
  eye: EyeIcon,
  users: UsersIcon,
  moon: MoonIcon,
} as const;
