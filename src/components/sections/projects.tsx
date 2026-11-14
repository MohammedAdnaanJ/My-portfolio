import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { FeaturedProjectCard, ProjectCard } from "@/components/projects/project-card";

export function ProjectsList() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  return (
    <div className="space-y-6">
      {featured.map((p) => (
        <Reveal key={p.slug}>
          <FeaturedProjectCard project={p} />
        </Reveal>
      ))}
      <ul className="grid gap-6 md:grid-cols-2">
        {rest.map((p, i) => (
          <li key={p.slug}>
            <Reveal delay={i * 0.08} className="h-full">
              <ProjectCard project={p} />
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <Section id="projects" labelledBy="projects-title" className="border-t">
      <SectionHeading
        id="projects-title"
        eyebrow="Projects"
        title="Selected work"
        description="Case studies covering the problem, architecture, engineering decisions and what I learned."
        action={
          <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
            All projects
            <ArrowRight className="size-4" />
          </Link>
        }
      />
      <ProjectsList />
    </Section>
  );
}
