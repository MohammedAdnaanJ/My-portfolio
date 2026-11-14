import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { profile } from "@/data/profile";
import { Section, SectionHeading } from "@/components/ui/primitives";

export function AboutSection() {
  return (
    <Section id="about" labelledBy="about-title" className="border-t">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <SectionHeading
          id="about-title"
          title="About me"
          className="mb-0 self-start lg:sticky lg:top-24"
        />
        <div>
          <p className="text-lg leading-relaxed text-pretty text-foreground/90">{profile.summary}</p>
          <h3 className="mt-10 mb-3 font-medium">What I&apos;m learning right now</h3>
          <ul className="list-disc space-y-1.5 pl-5 text-muted-foreground marker:text-subtle">
            {profile.interests.map((interest) => (
              <li key={interest}>{interest}</li>
            ))}
          </ul>
          <Link
            href="/about"
            className="mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            More about me
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </Section>
  );
}
