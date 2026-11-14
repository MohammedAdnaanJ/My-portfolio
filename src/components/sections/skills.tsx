import { Building2, Code, Database, LayoutTemplate, Server, Terminal, Workflow, Wrench } from "lucide-react";
import type { SkillGroup } from "@/types";
import { skillGroups } from "@/data/skills";
import { Card, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";

const icons: Record<SkillGroup["icon"], typeof Code> = {
  code: Code,
  server: Server,
  layout: LayoutTemplate,
  database: Database,
  workflow: Workflow,
  building: Building2,
  terminal: Terminal,
  wrench: Wrench,
};

export function SkillsGrid() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {skillGroups.map((group, i) => {
        const Icon = icons[group.icon];
        return (
          <li key={group.title}>
            <Reveal delay={(i % 4) * 0.05} className="h-full">
              <Card className="h-full p-5 transition-colors hover:border-primary/30">
                <div className="flex items-center gap-3">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold">{group.title}</h3>
                    <p className="text-xs text-muted-foreground">{group.description}</p>
                  </div>
                </div>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-md border bg-secondary/50 px-2 py-1 text-xs text-secondary-foreground"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}

export function SkillsSection() {
  return (
    <Section id="skills" labelledBy="skills-title" className="border-t">
      <SectionHeading
        id="skills-title"
        eyebrow="Skills"
        title="Technical toolkit"
        description="Grouped by where I use them — from API design and databases to distributed data processing and Linux operations."
      />
      <SkillsGrid />
    </Section>
  );
}
