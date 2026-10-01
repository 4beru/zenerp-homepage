"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLeadDialog } from "@/lib/store/lead-dialog";
import { siteConfig } from "@/lib/site-config";
import { ArrowRightIcon, CheckIcon } from "@/components/zen/icons";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactDialog() {
  const open = useLeadDialog((state) => state.open);
  const source = useLeadDialog((state) => state.source);
  const topic = useLeadDialog((state) => state.topic);
  const form = useLeadDialog((state) => state.form);
  const setField = useLeadDialog((state) => state.setField);
  const closeDialog = useLeadDialog((state) => state.closeDialog);

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (open) return;
    const timer = window.setTimeout(() => {
      setStatus("idle");
      setErrorMsg(null);
    }, 200);
    return () => window.clearTimeout(timer);
  }, [open]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    if (form.name.trim().length < 2) {
      setErrorMsg("Please enter your name.");
      setStatus("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    if (form.message.trim().length < 10) {
      setErrorMsg("Tell us a little more about the project.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMsg(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: source ?? "dialog" }),
      });
      const data = (await response.json()) as { ok: boolean; error?: string };

      if (response.ok && data.ok) {
        setStatus("success");
        return;
      }

      setErrorMsg(data.error ?? "We could not send the message. Please try again.");
      setStatus("error");
    } catch {
      setErrorMsg("We could not connect. Please check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(value) => !value && closeDialog()}>
      <DialogContent className="max-h-[90svh] gap-0 overflow-y-auto rounded-none border-zen-line bg-zen-surface p-0 text-zen-ink sm:max-w-lg">
        {status === "success" ? (
          <div className="p-7 sm:p-10" role="status">
            <div className="flex h-10 w-10 items-center justify-center border border-zen-accent/50 bg-zen-accent-soft text-zen-accent">
              <CheckIcon width={20} height={20} />
            </div>
            <h2 className="mt-6 font-display text-2xl font-semibold uppercase tracking-tight">
              Message received.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-zen-muted">
              Thanks. The context is with us now. We&apos;ll review it and get back to you with the next step.
            </p>
            <button
              type="button"
              onClick={closeDialog}
              className="mt-8 inline-flex cursor-pointer items-center border border-zen-accent bg-zen-accent px-5 py-3 text-sm font-semibold text-zen-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zen-accent"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <DialogHeader className="border-b border-zen-line p-7 text-left sm:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zen-accent">
                PROJECT INTAKE
              </p>
              <DialogTitle className="mt-4 font-display text-2xl font-semibold uppercase tracking-tight">
                Start the conversation.
              </DialogTitle>
              <DialogDescription className="mt-3 max-w-md text-sm leading-relaxed text-zen-muted">
                {topic ? <span className="block text-zen-ink">{topic}</span> : null}
                Send a few concrete details. We can refine the scope together.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 p-7 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="lead-dialog-name" className="text-xs uppercase tracking-wider text-zen-muted">
                    Name <span className="text-zen-accent">*</span>
                  </Label>
                  <Input
                    id="lead-dialog-name"
                    autoComplete="name"
                    value={form.name}
                    onChange={(event) => setField("name", event.target.value)}
                    maxLength={80}
                    required
                    className="h-11 rounded-none border-zen-line bg-zen-surface-raised text-zen-ink placeholder:text-zen-muted/50 focus-visible:ring-1 focus-visible:ring-zen-accent"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="lead-dialog-email" className="text-xs uppercase tracking-wider text-zen-muted">
                    Email <span className="text-zen-accent">*</span>
                  </Label>
                  <Input
                    id="lead-dialog-email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(event) => setField("email", event.target.value)}
                    maxLength={120}
                    required
                    className="h-11 rounded-none border-zen-line bg-zen-surface-raised text-zen-ink placeholder:text-zen-muted/50 focus-visible:ring-1 focus-visible:ring-zen-accent"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="lead-dialog-company" className="text-xs uppercase tracking-wider text-zen-muted">
                  Company <span className="font-normal normal-case tracking-normal text-zen-muted/60">(optional)</span>
                </Label>
                <Input
                  id="lead-dialog-company"
                  autoComplete="organization"
                  value={form.company}
                  onChange={(event) => setField("company", event.target.value)}
                  maxLength={80}
                  className="h-11 rounded-none border-zen-line bg-zen-surface-raised text-zen-ink placeholder:text-zen-muted/50 focus-visible:ring-1 focus-visible:ring-zen-accent"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="lead-dialog-message" className="text-xs uppercase tracking-wider text-zen-muted">
                  Project <span className="text-zen-accent">*</span>
                </Label>
                <Textarea
                  id="lead-dialog-message"
                  value={form.message}
                  onChange={(event) => setField("message", event.target.value)}
                  maxLength={2000}
                  required
                  rows={6}
                  className="min-h-36 resize-y rounded-none border-zen-line bg-zen-surface-raised text-zen-ink placeholder:text-zen-muted/50 focus-visible:ring-1 focus-visible:ring-zen-accent"
                />
              </div>

              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="lead-dialog-website">Website</label>
                <input
                  id="lead-dialog-website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(event) => setField("website", event.target.value)}
                />
              </div>

              {status === "error" && errorMsg ? (
                <p role="alert" className="border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                  {errorMsg}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 border border-zen-accent bg-zen-accent px-5 py-3.5 text-sm font-semibold text-zen-bg transition-colors hover:bg-zen-accent-strong disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zen-accent"
              >
                {status === "submitting" ? (
                  <>
                    <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-zen-bg/25 border-t-zen-bg" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send project brief
                    <ArrowRightIcon width={16} height={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>

              <p className="border-t border-zen-line pt-4 text-xs leading-relaxed text-zen-muted/60">
                Prefer email? <a href={`mailto:${siteConfig.email}`} className="text-zen-muted underline decoration-zen-accent/50 underline-offset-4 transition-colors hover:text-zen-accent">{siteConfig.email}</a>
              </p>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
