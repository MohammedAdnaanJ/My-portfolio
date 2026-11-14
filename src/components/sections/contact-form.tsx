"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send, TriangleAlert } from "lucide-react";
import { contactSchema, fieldErrors, type ContactFieldErrors } from "@/lib/contact-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; message: string };

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-xs text-destructive">
      {message}
    </p>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<ContactFieldErrors>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const errs = fieldErrors(parsed.error);
      setErrors(errs);
      setStatus({ state: "idle" });
      const first = Object.keys(errs)[0];
      if (first) form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setErrors({});
    setStatus({ state: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string; fieldErrors?: ContactFieldErrors };
      if (!res.ok) {
        if (body.fieldErrors) setErrors(body.fieldErrors);
        setStatus({ state: "error", message: body.error ?? "Something went wrong. Please try again." });
        return;
      }
      form.reset();
      setStatus({ state: "success" });
    } catch {
      setStatus({ state: "error", message: "Network error — please check your connection and try again." });
    }
  }

  const field = (name: keyof ContactFieldErrors) => ({
    name,
    id: `contact-${name}`,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
    onChange: () => errors[name] && setErrors((e) => ({ ...e, [name]: undefined })),
  });

  const submitting = status.state === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5" aria-describedby="contact-status">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-name">Name</Label>
          <Input {...field("name")} autoComplete="name" className="h-10" placeholder="Your name" required />
          <FieldError id="contact-name-error" message={errors.name} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email">Email</Label>
          <Input
            {...field("email")}
            type="email"
            autoComplete="email"
            className="h-10"
            placeholder="you@company.com"
            required
          />
          <FieldError id="contact-email-error" message={errors.email} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-subject">
          Subject <span className="font-normal text-muted-foreground">(optional)</span>
        </Label>
        <Input {...field("subject")} className="h-10" placeholder="e.g. Backend Engineer role at …" />
        <FieldError id="contact-subject-error" message={errors.subject} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea {...field("message")} rows={6} placeholder="How can I help?" required className="min-h-36" />
        <FieldError id="contact-message-error" message={errors.message} />
      </div>

      {/* Honeypot: hidden from people and assistive tech, catches naive bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" disabled={submitting} className="h-10 px-5">
          {submitting ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
          {submitting ? "Sending…" : "Send message"}
        </Button>
        <div id="contact-status" aria-live="polite" className="text-sm">
          {status.state === "success" && (
            <p className="inline-flex items-center gap-2 text-success">
              <CheckCircle2 className="size-4" />
              Thanks — your message was sent. I&apos;ll get back to you soon.
            </p>
          )}
          {status.state === "error" && (
            <p role="alert" className="inline-flex items-start gap-2 text-destructive">
              <TriangleAlert className="mt-0.5 size-4 shrink-0" />
              {status.message}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
