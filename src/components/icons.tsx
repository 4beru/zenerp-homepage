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

export function WebIcon(p: IconProps) {
  return (
    <svg {...base} width="24" height="24" {...p}>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 8h18M7 21h10M12 18v3" />
    </svg>
  );
}

export function MobileIcon(p: IconProps) {
  return (
    <svg {...base} width="24" height="24" {...p}>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M11 18.5h2" />
    </svg>
  );
}

export function DesktopIcon(p: IconProps) {
  return (
    <svg {...base} width="24" height="24" {...p}>
      <rect x="2.5" y="4" width="19" height="12.5" rx="2" />
      <path d="M9 20.5h6M12 16.5v4" />
    </svg>
  );
}

/** Odoo: anillo característico simplificado. */
export function OdooIcon(p: IconProps) {
  return (
    <svg {...base} width="24" height="24" {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.5" />
    </svg>
  );
}

/** ERPNext: capas / engranaje simplificado. */
export function ErpNextIcon(p: IconProps) {
  return (
    <svg {...base} width="24" height="24" {...p}>
      <path d="M12 3l8 4.5-8 4.5-8-4.5L12 3Z" />
      <path d="M4 12l8 4.5 8-4.5" />
      <path d="M4 16.5L12 21l8-4.5" />
    </svg>
  );
}

export function PuzzleIcon(p: IconProps) {
  return (
    <svg {...base} width="24" height="24" {...p}>
      <path d="M10 4a2 2 0 1 1 4 0v1h3a1 1 0 0 1 1 1v3h-1a2 2 0 1 0 0 4h1v3a1 1 0 0 1-1 1h-3v-1a2 2 0 1 0-4 0v1H7a1 1 0 0 1-1-1v-3H5a2 2 0 1 1 0-4h1V6a1 1 0 0 1 1-1h3V4Z" />
    </svg>
  );
}

export function FeatherIcon(p: IconProps) {
  return (
    <svg {...base} width="24" height="24" {...p}>
      <path d="M20.2 4.8c-2.6-2.4-7.2-1.2-9.9 1.5-2 2-2.6 4.9-2.9 7.3L4 19.6" />
      <path d="M8.5 13.5H14M10.5 9.5H16" />
      <path d="M4 19.6c4.7.6 8.7-.7 11.4-3.4 2.2-2.2 3.3-5.9 4.8-11.4" />
    </svg>
  );
}

/** Flor de loto — la marca de Zen ERP como ícono lineal. */
export function LotusIcon(p: IconProps) {
  return (
    <svg {...base} width="24" height="24" {...p}>
      <path d="M12 4c-1.9 2.6-1.9 6.4 0 9 1.9-2.6 1.9-6.4 0-9Z" />
      <path d="M7.5 6.5C7 9.6 8.4 12.4 11 13.6M16.5 6.5c.5 3.1-.9 5.9-3.5 7.1" />
      <path d="M3.5 11c1.2 2.6 3.8 4.3 7 4.5M20.5 11c-1.2 2.6-3.8 4.3-7 4.5" />
      <path d="M5 18.5c2.2 1.4 4.5 2 7 2s4.8-.6 7-2" />
    </svg>
  );
}

export function HandshakeIcon(p: IconProps) {
  return (
    <svg {...base} width="24" height="24" {...p}>
      <path d="M3 11l3-3 4 1 2-1 2 1 4-1 3 3" />
      <path d="M8 13l2.5 2.5a1.5 1.5 0 0 0 2.1 0L15 13" />
      <path d="M6 12l3.5 4M18 12l-3.5 4" />
    </svg>
  );
}

export function ArrowRightIcon(p: IconProps) {
  return (
    <svg {...base} width="20" height="20" {...p}>
      <path d="M4 12h16m-6-6 6 6-6 6" />
    </svg>
  );
}

export function MenuIcon(p: IconProps) {
  return (
    <svg {...base} width="24" height="24" {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(p: IconProps) {
  return (
    <svg {...base} width="24" height="24" {...p}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function MailIcon(p: IconProps) {
  return (
    <svg {...base} width="20" height="20" {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function WhatsAppIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden {...p}>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6c-.3-.1-1.5-.8-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.4-3c-.3-.4 0-.5.1-.7l.5-.6c.1-.2.1-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1 2.2-.3 3.6a11 11 0 0 0 4.6 4.4c1.9.8 2.7.9 3.6.7.6-.1 1.5-.6 1.7-1.3.2-.6.2-1.2.2-1.3-.1-.2-.3-.2-.6-.4Z" />
    </svg>
  );
}

export function CheckIcon(p: IconProps) {
  return (
    <svg {...base} width="20" height="20" {...p}>
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

export function AlertIcon(p: IconProps) {
  return (
    <svg {...base} width="20" height="20" {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4m0 4h.01" />
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
};

export const valueIcons = {
  feather: FeatherIcon,
  lotus: LotusIcon,
  handshake: HandshakeIcon,
};
