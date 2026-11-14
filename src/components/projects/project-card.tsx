import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { GitHubIcon } from "@/components/ui/brand-icons";
import { Card, TechTag } from "@/components/ui/primitives";
import { PipelineStrip } from "./architecture-diagram";
import { StatusBadge } from "./status-badge";

export function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <Card className="group relative overflow-hidden transition-colors hover:border-primary/30">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]"
      />
      <div className="grid gap-10 p-6 sm:p-8 lg:grid-cols-[1.25fr_1fr] lg:p-10">
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs tracking-wider text-primary uppercase">Featured · {project.category}</span>
            <StatusBadge status={project.status} />
          </div>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
              {project.shortTitle}
            </Link>
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">{project.title}</p>
          <p className="mt-5 leading-relaxed text-pretty text-muted-foreground">{project.summary}</p>
          <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technology stack">
            {project.stack.map((t) => (
              <li key={t}>
                <TechTag>{t}</TechTag>
              </li>
            ))}
          </ul>
          <div className="relative z-10 mt-8 flex flex-wrap gap-3 lg:mt-auto lg:pt-8">
            <Link href={`/projects/${project.slug}`} className={cn(buttonVariants(), "h-10 px-4")}>
              Read case study
              <ArrowUpRight className="size-4" />
            </Link>
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline" }), "h-10 px-4")}
              >
                <GitHubIcon className="size-4" />
                Source
              </a>
            )}
          </div>
        </div>
        {project.pipeline && (
          <div className="rounded-xl border bg-muted/40 p-4 sm:p-5">
            <p className="mb-4 font-mono text-[0.68rem] tracking-wider text-muted-foreground uppercase">System overview</p>
            <PipelineStrip steps={project.pipeline} />
          </div>
        )}
      </div>
    </Card>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="group relative flex h-full flex-col p-6 transition-colors hover:border-primary/30">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">{project.category}</span>
        <StatusBadge status={project.status} />
      </div>
      <h3 className="mt-4 text-lg font-semibold tracking-tight">
        <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
          {project.shortTitle}
        </Link>
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-pretty text-muted-foreground">{project.summary}</p>
      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={project.stackLabel ?? "Technology stack"}>
        {project.stack.slice(0, 6).map((t) => (
          <li key={t}>
            <TechTag>{t}</TechTag>
          </li>
        ))}
        {project.stack.length > 6 && (
          <li>
            <TechTag className="text-muted-foreground">+{project.stack.length - 6}</TechTag>
          </li>
        )}
      </ul>
      <div className="mt-auto flex items-center justify-between gap-3 pt-6">
        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
          {project.status === "planned" ? "View plan" : "Read case study"}
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
        <span className="flex items-center gap-3 text-xs text-muted-foreground">
          {project.period && <span>{project.period}</span>}
          {project.repoUrl && <GitHubIcon className="size-3.5" aria-label="Public repository" />}
        </span>
      </div>
    </Card>
  );
}
