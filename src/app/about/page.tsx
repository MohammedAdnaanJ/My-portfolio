import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { SkillsGrid } from "@/components/sections/skills";

export const metadata: Metadata = {
  title: "About",
  description: `About ${profile.name}: backend engineering background, interests and technical skills.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Section className="pt-16" labelledBy="about-page-title">
        <SectionHeading as="h1" id="about-page-title" eyebrow="About" title="Engineer first, focused on backends and data." />
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <Reveal className="space-y-5 text-lg leading-relaxed text-pretty text-muted-foreground">
            {profile.about.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </Reveal>
          <Reveal delay={0.1}>
            <aside className="space-y-6 rounded-2xl border bg-card p-6">
              <div>
                <h2 className="font-mono text-xs tracking-wider text-muted-foreground uppercase">Interests</h2>
                <ul className="mt-3 space-y-2 text-sm">
                  {profile.interests.map((i) => (
                    <li key={i} className="flex gap-2">
                      <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-mono text-xs tracking-wider text-muted-foreground uppercase">Looking for</h2>
                <p className="mt-3 text-sm text-muted-foreground">{profile.objective}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a href={profile.resume.href} download className={cn(buttonVariants({ variant: "outline" }), "h-9 px-3")}>
                  <Download className="size-4" />
                  Resume
                </a>
                <Link href="/contact" className={cn(buttonVariants(), "h-9 px-3")}>
                  Get in touch
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </aside>
          </Reveal>
        </div>
      </Section>
      <Section className="border-t" labelledBy="about-skills-title">
        <SectionHeading id="about-skills-title" eyebrow="Skills" title="Technical toolkit" />
        <SkillsGrid />
      </Section>
    </>
  );
}
