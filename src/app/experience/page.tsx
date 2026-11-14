import type { Metadata } from "next";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";

export const metadata: Metadata = {
  title: "Experience",
  description: `${profile.name}'s engineering experience across backend development, automation and data engineering.`,
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <Section className="pt-16" labelledBy="experience-page-title">
      <SectionHeading
        as="h1"
        id="experience-page-title"
        title="Experience"
        description="One internship so far, at Datagen Systems in Chennai."
      />
      <ExperienceTimeline items={experience} />
    </Section>
  );
}
