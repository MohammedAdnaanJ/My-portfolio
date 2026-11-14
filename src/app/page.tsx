import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { Hero } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { SkillsSection } from "@/components/sections/skills";
import { ProjectsSection } from "@/components/sections/projects";
import { ContactSection } from "@/components/sections/contact";

function PersonJsonLd() {
  const sameAs = [profile.github, profile.linkedin].filter(Boolean);
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: "Backend Engineer",
    url: siteUrl,
    knowsAbout: ["Python", "FastAPI", "REST APIs", "PostgreSQL", "Apache Spark", "Apache Iceberg", "Data Engineering"],
    ...(sameAs.length > 0 && { sameAs }),
  };
  // Escape "<" so the JSON can never terminate the script tag early.
  const json = JSON.stringify(data).replaceAll("<", String.fromCharCode(92) + "u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

export default function HomePage() {
  return (
    <>
      <PersonJsonLd />
      <Hero />
      <AboutSection />
      <Section id="experience" labelledBy="experience-title" className="border-t">
        <SectionHeading
          id="experience-title"
          title="Where I've worked"
          action={
            <Link
              href="/experience"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              Full details
              <ArrowRight className="size-4" />
            </Link>
          }
        />
        <ExperienceTimeline items={experience} compact />
      </Section>
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </>
  );
}
