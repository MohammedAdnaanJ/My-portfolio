import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Container, Todo } from "@/components/ui/primitives";
import { SocialLinks } from "@/components/layout/social-links";
import { HeroVisual } from "./hero-visual";

export function Hero() {
  // The stack after the role is already spelled out in the tagline, so only the role is shown here.
  const role = profile.title.split("|")[0].trim();
  const city = profile.location?.split(",")[0];

  return (
    <section aria-labelledby="hero-title">
      <Container className="grid items-center gap-14 pt-16 pb-20 sm:pt-24 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pb-24">
        <div>
          <h1 id="hero-title" className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {profile.name}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            {role}
            {city && <> in {city}</>}
          </p>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-pretty text-foreground/90">{profile.tagline}</p>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link href="#projects" className={cn(buttonVariants(), "h-10 px-4")}>
              See my work
              <ArrowRight className="size-4" />
            </Link>
            <a
              href={profile.resume.href}
              download
              className="text-sm font-medium underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
            >
              Resume (PDF)
            </a>
            <SocialLinks showTodos={false} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {profile.resume.isPlaceholder && <Todo>replace public/resume.pdf</Todo>}
            {(!profile.github || !profile.linkedin) && <Todo>add GitHub / LinkedIn URLs in src/data/profile.ts</Todo>}
          </div>
        </div>

        <div className="mx-auto w-full max-w-md lg:max-w-none">
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
