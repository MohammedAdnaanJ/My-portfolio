import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { ContactSection } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name} about backend, Python and software engineering roles.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactSection asPage />;
}
