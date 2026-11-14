import { skillGroups } from "@/data/skills";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { SkillIcon } from "@/components/ui/skill-icon";

export function SkillsGrid() {
  return (
    <dl className="divide-y border-y">
      {skillGroups.map((group) => (
        <div key={group.title} className="grid gap-3 py-5 sm:grid-cols-[180px_1fr] sm:gap-8">
          <dt className="text-sm font-medium">{group.title}</dt>
          <dd>
            <ul className="flex flex-wrap gap-x-5 gap-y-2.5">
              {group.skills.map((skill) => (
                <li key={skill} className="group/skill inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <SkillIcon skill={skill} />
                  {skill}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function SkillsSection() {
  return (
    <Section id="skills" labelledBy="skills-title" className="border-t">
      <SectionHeading id="skills-title" title="Skills" />
      <SkillsGrid />
    </Section>
  );
}
