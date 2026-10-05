"use client";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const capabilities = [
  "WEB PLATFORMS",
  "ODOO & ERPNEXT",
  "CUSTOM BACKENDS",
  "MOBILE ENGINEERING",
  "DATABASE ARCHITECTURE",
  "PROCESS AUTOMATION",
  "SYSTEM INTEGRATION",
  "ARGENTINA & GLOBAL",
];

export function Marquee() {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="relative w-full overflow-hidden border-y border-[#EEE8D5]/[0.08] bg-[#080B0C] py-4"
    >
      <div
        className={`flex w-max items-center gap-8 ${
          reduced ? "" : "animate-[marquee_36s_linear_infinite]"
        }`}
        style={{
          willChange: reduced ? "auto" : "transform",
        }}
      >
        {[...capabilities, ...capabilities, ...capabilities].map((item, idx) => (
          <div key={`${item}-${idx}`} className="flex items-center gap-8 shrink-0">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#839496]/70 transition-colors hover:text-[#EEE8D5]">
              {item}
            </span>
            <span className="h-1 w-1 rounded-full bg-[#CB4B16]" />
          </div>
        ))}
      </div>
    </div>
  );
}
