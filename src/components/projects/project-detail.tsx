import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ExternalLink, Info, Lock } from "lucide-react";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { GitHubIcon } from "@/components/ui/brand-icons";
import { Card, Container, TechTag, Todo } from "@/components/ui/primitives";
import { ArchitectureDiagram } from "./architecture-diagram";
import { StatusBadge } from "./status-badge";

function DetailSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t pt-10">
      <h2 id={`${id}-title`} className="mb-5 text-2xl font-semibold tracking-tight">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-4 leading-relaxed text-pretty text-muted-foreground">
      {paragraphs.map((p) => (
        <p key={p.slice(0, 40)}>{p}</p>
      ))}
    </div>
  );
}

export function ProjectDetail({ project, prev, next }: { project: Project; prev?: Project; next?: Project }) {
  const featuresLabel = project.featuresLabel ?? "Key features";
  const toc = [
    { id: "overview", label: "Overview" },
    { id: "problem", label: "Problem statement" },
    project.architecture && { id: "architecture", label: "Architecture" },
    { id: "stack", label: project.stackLabel ?? "Technology stack" },
    { id: "features", label: featuresLabel },
    project.decisions?.length && { id: "decisions", label: "Design decisions" },
    project.challenges?.length && { id: "challenges", label: "Engineering challenges" },
    project.learnings?.length && { id: "learnings", label: "What I learned" },
  ].filter(Boolean) as { id: string; label: string }[];

  return (
    <article>
      <header className="relative overflow-hidden border-b">
        <div aria-hidden className="bg-grid mask-fade-b pointer-events-none absolute inset-0 -z-10" />
        <Container className="pt-12 pb-14 sm:pt-16">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            All projects
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs tracking-wider text-primary uppercase">{project.category}</span>
            <StatusBadge status={project.status} />
            {project.period && <span className="text-xs text-muted-foreground">{project.period}</span>}
          </div>
          <h1 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-balance sm:text-5xl">{project.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-pretty text-muted-foreground">{project.summary}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants(), "h-10 px-4")}
              >
                <GitHubIcon className="size-4" />
                View repository
              </a>
            ) : project.sourceNote ? (
              <span className="inline-flex items-center gap-2 rounded-lg border border-dashed px-3 py-2 text-sm text-muted-foreground">
                <Lock className="size-3.5" aria-hidden />
                {project.sourceNote}
              </span>
            ) : (
              project.status !== "planned" && <Todo>add repoUrl when the repository is public</Todo>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline" }), "h-10 px-4")}
              >
                <ExternalLink className="size-4" />
                Live demo
              </a>
            )}
          </div>
          {project.todos && project.todos.length > 0 && (
            <div className="mt-4 flex flex-col items-start gap-2">
              {project.todos.map((t) => (
                <Todo key={t}>{t}</Todo>
              ))}
            </div>
          )}
        </Container>
      </header>

      <Container className="grid gap-12 py-14 lg:grid-cols-[200px_1fr] lg:gap-16">
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-24">
            <p className="mb-3 font-mono text-xs tracking-wider text-muted-foreground uppercase">On this page</p>
            <ul className="space-y-2 border-l text-sm">
              {toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="-ml-px block border-l border-transparent pl-4 text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="min-w-0 space-y-12">
          {project.scopeNote && (
            <p className="flex gap-3 rounded-xl border bg-muted/40 p-4 text-sm text-muted-foreground">
              <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              {project.scopeNote}
            </p>
          )}

          <DetailSection id="overview" title="Overview">
            <Prose paragraphs={project.overview} />
          </DetailSection>

          <DetailSection id="problem" title="Problem statement">
            <Prose paragraphs={project.problem} />
          </DetailSection>

          {project.architecture && (
            <DetailSection id="architecture" title="Architecture">
              <ArchitectureDiagram architecture={project.architecture} />
              <h3 className="mt-8 mb-4 font-medium">Request flow</h3>
              <ol className="space-y-3">
                {project.architecture.flow.map((step, i) => (
                  <li key={step} className="flex gap-4 text-sm leading-relaxed text-muted-foreground">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full border font-mono text-xs text-foreground">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </DetailSection>
          )}

          <DetailSection id="stack" title={project.stackLabel ?? "Technology stack"}>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <li key={t}>
                  <TechTag className="px-2.5 py-1 text-xs">{t}</TechTag>
                </li>
              ))}
            </ul>
          </DetailSection>

          <DetailSection id="features" title={featuresLabel}>
            {project.status === "planned" && (
              <p className="mb-5 text-sm text-muted-foreground">
                These items describe intended functionality and have not been implemented yet.
              </p>
            )}
            <ul className="grid gap-3 sm:grid-cols-2">
              {project.features.map((f) => (
                <li key={f.title}>
                  <Card className="h-full p-4">
                    <p className="flex items-start gap-2 text-sm font-medium">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                      {f.title}
                    </p>
                    <p className="mt-1.5 pl-6 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
                  </Card>
                </li>
              ))}
            </ul>
          </DetailSection>

          {project.decisions && project.decisions.length > 0 && (
            <DetailSection id="decisions" title="Design decisions">
              <dl className="space-y-6">
                {project.decisions.map((d) => (
                  <div key={d.title} className="border-l-2 border-primary/40 pl-5">
                    <dt className="font-medium">{d.title}</dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{d.description}</dd>
                  </div>
                ))}
              </dl>
            </DetailSection>
          )}

          {project.challenges && project.challenges.length > 0 && (
            <DetailSection id="challenges" title="Engineering challenges">
              <ul className="space-y-4">
                {project.challenges.map((c, i) => (
                  <li key={c.title}>
                    <Card className="p-5 sm:p-6">
                      <h3 className="flex items-baseline gap-3 font-medium">
                        <span className="font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
                        {c.title}
                      </h3>
                      <dl className="mt-4 grid gap-4 text-sm leading-relaxed md:grid-cols-2">
                        <div>
                          <dt className="mb-1 font-mono text-[0.68rem] tracking-wider text-muted-foreground uppercase">
                            Challenge
                          </dt>
                          <dd className="text-muted-foreground">{c.context}</dd>
                        </div>
                        <div>
                          <dt className="mb-1 font-mono text-[0.68rem] tracking-wider text-muted-foreground uppercase">
                            Approach
                          </dt>
                          <dd className="text-foreground/85">{c.approach}</dd>
                        </div>
                      </dl>
                    </Card>
                  </li>
                ))}
              </ul>
            </DetailSection>
          )}

          {project.learnings && project.learnings.length > 0 && (
            <DetailSection id="learnings" title="What I learned">
              <ul className="space-y-3">
                {project.learnings.map((l) => (
                  <li key={l} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    {l}
                  </li>
                ))}
              </ul>
            </DetailSection>
          )}

          <nav aria-label="More projects" className="grid gap-4 border-t pt-10 sm:grid-cols-2">
            {prev ? (
              <Link href={`/projects/${prev.slug}`} className="group rounded-xl border p-4 transition-colors hover:border-primary/30">
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <ArrowLeft className="size-3" /> Previous
                </span>
                <span className="mt-1 block text-sm font-medium">{prev.shortTitle}</span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={`/projects/${next.slug}`}
                className="group rounded-xl border p-4 text-right transition-colors hover:border-primary/30"
              >
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  Next <ArrowRight className="size-3" />
                </span>
                <span className="mt-1 block text-sm font-medium">{next.shortTitle}</span>
              </Link>
            )}
          </nav>
        </div>
      </Container>
    </article>
  );
}
