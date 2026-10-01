"use client";

import { useId, useState, type ChangeEvent, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRightIcon, CheckIcon } from "@/components/zen/icons";

type Status = "idle" | "submitting" | "success" | "error";

type LeadFormProps = {
  source: string;
  initialMessage?: string;
  submitLabel?: string;
  className?: string;
};

export function LeadForm({
  source,
  initialMessage = "",
  submitLabel = "Send project brief",
  className = "",
}: LeadFormProps) {
  const uid = useId().replace(/:/g, "");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [form, setForm] = useState(() => ({
    name: "",
    email: "",
    company: "",
    message: initialMessage,
    website: "",
  }));

  const setField =
    (key: keyof typeof form) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((current) => ({ ...current, [key]: event.target.value }));

  const reset = () => {
    setForm({
      name: "",
      email: "",
      company: "",
      message: initialMessage,
      website: "",
    });
    setStatus("idle");
    setErrorMsg(null);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (name.length < 2) {
      setErrorMsg("Please enter your name.");
      setStatus("error");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    if (message.length < 10) {
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
        body: JSON.stringify({
          ...form,
          name,
          email,
          message,
          source,
        }),
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
    <div className={className}>
      {status === "success" ? (
        <div className="border-t border-zen-line pt-8" role="status">
          <div className="flex h-11 w-11 items-center justify-center border border-zen-accent/50 bg-zen-accent-soft text-zen-accent">
            <CheckIcon width={20} height={20} />
          </div>
          <h3 className="mt-6 font-display text-2xl font-semibold uppercase tracking-tight text-zen-ink">
            Brief received.
          </h3>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-zen-muted sm:text-base">
            Thanks. The project context is with us now. We&apos;ll review it and get back to you with the next sensible step.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-7 inline-flex cursor-pointer items-center gap-2 border border-zen-line px-5 py-3 text-sm font-semibold text-zen-ink transition-colors hover:border-zen-accent/40 hover:text-zen-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zen-accent"
          >
            Send another brief
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor={`${uid}-name`} className="text-xs font-medium uppercase tracking-wider text-zen-muted">
                Name <span className="text-zen-accent">*</span>
              </Label>
              <Input
                id={`${uid}-name`}
                autoComplete="name"
                value={form.name}
                onChange={setField("name")}
                maxLength={80}
                required
                placeholder="Your name"
                className="h-12 rounded-none border-zen-line bg-zen-surface-raised text-zen-ink placeholder:text-zen-muted/50 focus-visible:ring-1 focus-visible:ring-zen-accent"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor={`${uid}-email`} className="text-xs font-medium uppercase tracking-wider text-zen-muted">
                Email <span className="text-zen-accent">*</span>
              </Label>
              <Input
                id={`${uid}-email`}
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={setField("email")}
                maxLength={120}
                required
                placeholder="you@company.com"
                className="h-12 rounded-none border-zen-line bg-zen-surface-raised text-zen-ink placeholder:text-zen-muted/50 focus-visible:ring-1 focus-visible:ring-zen-accent"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-2">
            <Label htmlFor={`${uid}-company`} className="text-xs font-medium uppercase tracking-wider text-zen-muted">
              Company <span className="font-normal normal-case tracking-normal text-zen-muted/60">(optional)</span>
            </Label>
            <Input
              id={`${uid}-company`}
              autoComplete="organization"
              value={form.company}
              onChange={setField("company")}
              maxLength={80}
              placeholder="Company or business"
              className="h-12 rounded-none border-zen-line bg-zen-surface-raised text-zen-ink placeholder:text-zen-muted/50 focus-visible:ring-1 focus-visible:ring-zen-accent"
            />
          </div>

          <div className="mt-5 flex flex-col gap-2">
            <Label htmlFor={`${uid}-message`} className="text-xs font-medium uppercase tracking-wider text-zen-muted">
              Project <span className="text-zen-accent">*</span>
            </Label>
            <Textarea
              id={`${uid}-message`}
              value={form.message}
              onChange={setField("message")}
              maxLength={2000}
              required
              rows={7}
              placeholder="What is happening today, and what should the system make easier?"
              className="min-h-44 resize-y rounded-none border-zen-line bg-zen-surface-raised text-zen-ink placeholder:text-zen-muted/50 focus-visible:ring-1 focus-visible:ring-zen-accent"
            />
            <span className="self-end font-mono text-[10px] tabular-nums text-zen-muted/50">
              {form.message.length} / 2000
            </span>
          </div>

          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor={`${uid}-website`}>Website</label>
            <input
              id={`${uid}-website`}
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={setField("website")}
            />
          </div>

          {status === "error" && errorMsg ? (
            <p role="alert" className="mt-5 border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
              {errorMsg}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="group mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 border border-zen-accent bg-zen-accent px-6 py-3.5 text-sm font-semibold text-[#050505] transition-colors hover:bg-zen-accent-strong disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {status === "submitting" ? (
              <>
                <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-[#050505]/25 border-t-[#050505]" />
                Sending…
              </>
            ) : (
              <>
                {submitLabel}
                <ArrowRightIcon width={16} height={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </button>

          <p className="mt-4 max-w-xl text-xs leading-relaxed text-zen-muted/60">
            We only use these details to respond to your project inquiry.
          </p>
        </form>
      )}
    </div>
  );
}
