import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { profile } from "@/data/profile";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";

export function AboutSection() {
  return (
    <Section id="about" labelledBy="about-title" className="border-t">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <SectionHeading id="about-title" eyebrow="About" title="Backend services and the data behind them."
          className="mb-0 self-start lg:sticky lg:top-24"
        />
        <Reveal>
          <p className="text-lg leading-relaxed text-pretty text-foreground/90">{profile.summary}</p>
          <h3 className="mt-10 mb-4 font-mono text-xs tracking-wider text-muted-foreground uppercase">
            What I&apos;m interested in
          </h3>
          <ul className="grid gap-3 sm:grid-cols-2">
            {profile.interests.map((interest) => (
              <li key={interest} className="flex gap-3 text-sm text-muted-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                {interest}
              </li>
            ))}
          </ul>
          <Link
            href="/about"
            className="mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            More about me
            <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </div>
    </Section>
  );
}
