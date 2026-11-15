import type { ReactNode } from "react";
import { Container } from "@/components/ui/primitives";

/**
 * Shared layout for error pages (403, 404, 500…). Server-safe so it works in both
 * server boundaries (`not-found`, `forbidden`) and client ones (`error`, `global-error`).
 */
export function ErrorView({
  code,
  title,
  description,
  children,
  detail,
}: {
  code: string;
  title: string;
  description: ReactNode;
  /** Action buttons/links. */
  children?: ReactNode;
  /** Small mono footnote, e.g. an error digest for support. */
  detail?: ReactNode;
}) {
  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p
        aria-hidden
        className="font-mono text-7xl font-semibold tracking-tighter text-primary/15 select-none sm:text-8xl"
      >
        {code}
      </p>
      <p className="mt-4 font-mono text-sm text-primary">Error {code}</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h1>
      <p className="mt-3 max-w-xl leading-relaxed text-pretty text-muted-foreground">{description}</p>
      {children && <div className="mt-8 flex flex-wrap items-center gap-3">{children}</div>}
      {detail && <p className="mt-6 font-mono text-xs text-subtle">{detail}</p>}
    </Container>
  );
}
