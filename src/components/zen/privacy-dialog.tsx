"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { siteConfig } from "@/lib/site-config";
import { LotusIcon, ShieldIcon } from "@/components/zen/icons";

/**
 * Plain-language privacy policy backing the zero-spam guarantee.
 */
export function PrivacyDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const items: readonly { title: string; body: string }[] = [
    {
      title: "What we retain",
      body: "Your name, email address, organization (if specified), and project message — strictly the fields requested by the intake form.",
    },
    {
      title: "How it is used",
      body: "Solely to review your brief, reply, and build your technical proposal if we initiate a conversation.",
    },
    {
      title: "What we never do",
      body: "We do not sell, rent, or share your data, compile cold sales lists, or send unsolicited newsletters. This platform does not deploy third-party advertising cookies.",
    },
    {
      title: "Right to erasure",
      body: `Contact us at ${siteConfig.email} and we will immediately remove your messages and contact records without dispute.`,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90svh] gap-0 overflow-y-auto rounded-2xl border-zen-line bg-zen-surface p-0 sm:max-w-md">
        <div
          aria-hidden
          className="h-1 w-full rounded-t-2xl"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(203,75,22,0.7), transparent)",
          }}
        />

        <div className="p-6 sm:p-7">
          <DialogHeader className="items-start text-left">
            <span
              aria-hidden
              className="flex size-11 items-center justify-center rounded-full border border-zen-accent/25 bg-zen-accent-soft text-zen-accent"
            >
              <ShieldIcon width={20} height={20} />
            </span>
            <DialogTitle className="mt-4 text-xl font-semibold tracking-tight text-zen-ink">
              Privacy Commitment
            </DialogTitle>
            <DialogDescription className="mt-1.5 text-sm leading-relaxed text-zen-muted">
              The concise, honest standard: your information exists only to respond to your technical brief.
            </DialogDescription>
          </DialogHeader>

          <ul className="mt-6 space-y-5">
            {items.map((item) => (
              <li key={item.title} className="flex gap-3.5">
                <span
                  aria-hidden
                  className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-zen-accent/70"
                />
                <div>
                  <h3 className="text-sm font-semibold text-zen-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-pretty text-zen-muted">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-7 flex items-start gap-3 rounded-xl border border-zen-line/70 bg-zen-surface/40 px-4 py-3.5 text-sm leading-relaxed text-zen-muted">
            <LotusIcon
              aria-hidden
              className="mt-0.5 shrink-0 text-zen-accent/70"
              width={17}
              height={17}
            />
            Studio guarantee: zero advertising spam, zero data brokers.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
