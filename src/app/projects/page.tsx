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
        title="Projects"
        description="Write-ups of things I've built: the problem, how it works, the decisions I made and what I learned. Projects I haven't built yet are marked as planned."
      />
      <ProjectsList />
    </Section>
  );
}
