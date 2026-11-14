import { profile } from "@/data/profile";
import { Card, Section, SectionHeading, Todo } from "@/components/ui/primitives";
import { ContactForm } from "./contact-form";

const stripProtocol = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const linkClass = "underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground";

export function ContactSection({ asPage = false }: { asPage?: boolean }) {
  const links = [
    profile.email && { label: "Email", href: `mailto:${profile.email}`, value: profile.email },
    profile.linkedin && { label: "LinkedIn", href: profile.linkedin, value: stripProtocol(profile.linkedin) },
    profile.github && { label: "GitHub", href: profile.github, value: stripProtocol(profile.github) },
  ].filter(Boolean) as { label: string; href: string; value: string }[];

  return (
    <Section id="contact" labelledBy="contact-title" className={asPage ? "pt-16" : "border-t"}>
      <SectionHeading
        id="contact-title"
        as={asPage ? "h1" : "h2"}
        title="Get in touch"
        description={`${profile.objective} Email or LinkedIn is the quickest way to reach me.`}
      />
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <dl className="space-y-4 text-sm">
            {links.map((link) => (
              <div key={link.label}>
                <dt className="text-muted-foreground">{link.label}</dt>
                <dd className="mt-0.5">
                  <a
                    href={link.href}
                    className={linkClass}
                    {...(!link.href.startsWith("mailto:") && { target: "_blank", rel: "noopener" })}
                  >
                    {link.value}
                  </a>
                </dd>
              </div>
            ))}
            {profile.location && (
              <div>
                <dt className="text-muted-foreground">Based in</dt>
                <dd className="mt-0.5">{profile.location}</dd>
              </div>
            )}
          </dl>
          {links.length < 3 && (
            <Todo className="mt-3">email / LinkedIn / GitHub not set — see src/data/profile.ts</Todo>
          )}
        </div>
        <Card className="p-6 sm:p-8">
          <ContactForm />
        </Card>
      </div>
    </Section>
  );
}
