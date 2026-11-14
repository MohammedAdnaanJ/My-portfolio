import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { ProjectsList } from "@/components/sections/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: `Engineering case studies by ${profile.name}: a custom Apache Iceberg REST Catalog, enterprise data archival and more.`,
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <Section className="pt-16" labelledBy="projects-page-title">
      <SectionHeading
        as="h1"
        id="projects-page-title"
        eyebrow="Projects"
        title="Engineering case studies"
        description="Each project covers the problem, the architecture, the decisions behind it and what I learned. Planned work is labelled as planned."
      />
      <ProjectsList />
    </Section>
  );
}
