import type { ReactNode } from "react";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { Card, Section, SectionHeading, Todo } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "./contact-form";

function ContactRow({
  href,
  icon,
  label,
  value,
  external,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  value: string;
  external?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        {...(external && { target: "_blank", rel: "noopener" })}
        className="group flex items-center gap-4 rounded-xl border bg-card p-4 transition-colors hover:border-primary/30"
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
          {icon}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-xs text-muted-foreground">{label}</span>
          <span className="block truncate text-sm font-medium">{value}</span>
        </span>
        <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </li>
  );
}

const stripProtocol = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

function contactHint() {
  const channels = [profile.email && "email", profile.linkedin && "LinkedIn"].filter(Boolean);
  return channels.length > 0
    ? `The fastest way to reach me is ${channels.join(" or ")} — or use the form.`
    : "Send me a message using the form.";
}

export function ContactSection({ asPage = false }: { asPage?: boolean }) {
  return (
    <Section id="contact" labelledBy="contact-title" className={asPage ? "pt-16" : "border-t"}>
      <SectionHeading
        id="contact-title"
        as={asPage ? "h1" : "h2"}
        eyebrow="Contact"
        title="Let's talk"
        description={`${profile.objective} ${contactHint()}`}
      />
      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <ul className="space-y-3">
            {profile.email && (
              <ContactRow href={`mailto:${profile.email}`} icon={<Mail className="size-4" />} label="Email" value={profile.email} />
            )}
            {profile.linkedin && (
              <ContactRow
                href={profile.linkedin}
                icon={<LinkedInIcon className="size-4" />}
                label="LinkedIn"
                value={stripProtocol(profile.linkedin)}
                external
              />
            )}
            {profile.github && (
              <ContactRow
                href={profile.github}
                icon={<GitHubIcon className="size-4" />}
                label="GitHub"
                value={stripProtocol(profile.github)}
                external
              />
            )}
          </ul>
          {(!profile.email || !profile.linkedin || !profile.github) && (
            <Todo className="mt-3">email / LinkedIn / GitHub not set — see src/data/profile.ts</Todo>
          )}
          {profile.location && (
            <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4" aria-hidden />
              {profile.location}
            </p>
          )}
          <div className="mt-6 rounded-xl border border-dashed p-4">
            <p className="text-xs font-medium text-foreground">Open to</p>
            <p className="mt-1 text-sm text-muted-foreground">{profile.openTo.join(" · ")}</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <Card className="relative p-6 sm:p-8">
            <ContactForm />
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
