import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/primitives";
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
        <SectionHeading as="h1" id="about-page-title" title="About me" />
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-5 text-lg leading-relaxed text-pretty text-muted-foreground">
            {profile.about.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
          <div>
            <aside className="space-y-8 lg:border-l lg:pl-8">
              <div>
                <h2 className="font-medium">Learning right now</h2>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground marker:text-subtle">
                  {profile.interests.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-medium">Looking for</h2>
                <p className="mt-3 text-sm text-muted-foreground">{profile.objective}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href={profile.resume.href}
                  download
                  className={cn(buttonVariants({ variant: "outline" }), "h-9 px-3")}
                >
                  <Download className="size-4" />
                  Resume
                </a>
                <Link href="/contact" className={cn(buttonVariants(), "h-9 px-3")}>
                  Get in touch
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </Section>
      <Section className="border-t" labelledBy="about-skills-title">
        <SectionHeading id="about-skills-title" title="Skills" />
        <SkillsGrid />
      </Section>
    </>
  );
}
