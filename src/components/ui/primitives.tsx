import type { ReactNode } from "react";
import { CircleDashed } from "lucide-react";
import { cn } from "@/lib/utils";
import { isDev } from "@/lib/site";

/** Page-width wrapper with consistent gutters. */
export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

export function Section({
  id,
  className,
  children,
  labelledBy,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("py-20 sm:py-24", className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  id,
  title,
  description,
  as: Tag = "h2",
  className,
  action,
}: {
  id?: string;
  title: string;
  description?: string;
  as?: "h1" | "h2";
  className?: string;
  action?: ReactNode;
}) {
  return (
    <div className={cn("mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="max-w-2xl">
        <Tag
          id={id}
          className={cn(
            "font-semibold tracking-tight text-balance text-foreground",
            Tag === "h1" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl",
          )}
        >
          {title}
        </Tag>
        {description && (
          <p className="mt-4 text-base leading-relaxed text-pretty text-muted-foreground">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function TechTag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border bg-secondary/60 px-2 py-0.5 font-mono text-[0.72rem] leading-5 text-secondary-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * Development-only reminder for content that still needs filling in.
 * Renders nothing in production builds.
 */
export function Todo({ children, className }: { children: ReactNode; className?: string }) {
  if (!isDev) return null;
  return (
    <span
      role="note"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-dashed border-amber-500/50 bg-amber-500/10 px-2 py-0.5 font-mono text-[0.7rem] text-amber-700 dark:text-amber-300",
        className,
      )}
    >
      <CircleDashed className="size-3" aria-hidden />
      TODO: {children}
    </span>
  );
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("rounded-xl border bg-card text-card-foreground", className)}>{children}</div>;
}
