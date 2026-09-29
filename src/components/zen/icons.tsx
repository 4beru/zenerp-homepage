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

export function SparkleIcon(p: IconProps) {
  return (
    <svg {...base} width={20} height={20} {...p}>
      <path d="M12 3v4m0 10v4M3 12h4m10 0h4M5.6 5.6l2.8 2.8m7.2 7.2 2.8 2.8m0-12.8-2.8 2.8m-7.2 7.2-2.8 2.8" />
    </svg>
  );
}

export function HammerIcon(p: IconProps) {
  return (
    <svg {...base} width={20} height={20} {...p}>
      <path d="m14 6 4 4-2.5 2.5L11.5 9 14 6Z" />
      <path d="m11.5 9-7 7 2.5 2.5 7-7" />
      <path d="m14.5 3.5 2 2L19 4l1.5 1.5" />
    </svg>
  );
}
