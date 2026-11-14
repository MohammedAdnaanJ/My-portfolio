import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Container, Todo } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { SocialLinks } from "@/components/layout/social-links";
import { HeroVisual } from "./hero-visual";

export function Hero() {
  const [role, ...stack] = profile.title.split("|").map((s) => s.trim());

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden className="bg-grid mask-fade-b pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]"
      />
      <Container className="grid items-center gap-14 pt-20 pb-20 sm:pt-28 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:pb-28">
        <Reveal>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-success" />
            Open to full-time backend &amp; software engineering roles
          </p>
          <h1 id="hero-title" className="text-4xl font-semibold tracking-tight sm:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-4 text-lg font-medium text-foreground/90 sm:text-xl">
            {role}
            {stack.map((s) => (
              <span key={s}>
                <span className="mx-2 text-subtle" aria-hidden>
                  /
                </span>
                <span className="sr-only">, </span>
                <span className="text-muted-foreground">{s}</span>
              </span>
            ))}
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
            {profile.tagline}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="#projects" className={cn(buttonVariants(), "h-10 px-4")}>
              View projects
              <ArrowRight className="size-4" />
            </Link>
            <a href={profile.resume.href} download className={cn(buttonVariants({ variant: "outline" }), "h-10 px-4")}>
              <Download className="size-4" />
              Download resume
            </a>
            <SocialLinks className="ml-1" showTodos={false} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {profile.resume.isPlaceholder && <Todo>replace public/resume.pdf</Todo>}
            {(!profile.github || !profile.linkedin) && <Todo>add GitHub / LinkedIn URLs in src/data/profile.ts</Todo>}
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mx-auto w-full max-w-md lg:max-w-none">
          <HeroVisual />
        </Reveal>
      </Container>
    </section>
  );
}
