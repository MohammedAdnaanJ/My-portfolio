import { NextResponse } from "next/server";
import { contactSchema, fieldErrors } from "@/lib/contact-schema";
import { profile } from "@/data/profile";

/**
 * Contact form endpoint. Sends mail through Resend's HTTP API (https://resend.com).
 *
 * Required environment variables:
 *   RESEND_API_KEY      API key from Resend
 *   CONTACT_TO_EMAIL    inbox that receives messages
 * Optional:
 *   CONTACT_FROM_EMAIL  verified sender, defaults to Resend's onboarding sender
 */
export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please fix the highlighted fields.", fieldErrors: fieldErrors(parsed.error) },
      { status: 422 },
    );
  }

  const { name, email, subject, message, company } = parsed.data;
  // Honeypot filled → silently accept so bots don't learn anything.
  if (company) return NextResponse.json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    const fallback = profile.email
      ? ` Please email ${profile.email} directly.`
      : profile.linkedin
        ? " Please reach out on LinkedIn instead."
        : " Please try again later.";
    return NextResponse.json(
      { error: `The contact form isn't configured yet.${fallback}` },
      { status: 503 },
    );
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    });
    if (!res.ok) {
      console.error("Resend error", res.status, await res.text());
      return NextResponse.json({ error: "Your message couldn't be sent. Please try again later." }, { status: 502 });
    }
  } catch (err) {
    console.error("Contact form send failed", err);
    return NextResponse.json({ error: "Your message couldn't be sent. Please try again later." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
