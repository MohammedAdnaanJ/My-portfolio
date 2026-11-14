import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(100, "Name is too long."),
  email: z.email("Please enter a valid email address.").trim().max(200),
  subject: z.string().trim().max(150, "Subject is too long.").optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(20, "Please write at least 20 characters.")
    .max(5000, "Message is too long (max 5000 characters)."),
  /** Honeypot field — real users never see or fill it. */
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;
export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export function fieldErrors(error: z.ZodError<ContactInput>): ContactFieldErrors {
  const out: ContactFieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as ContactField | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
