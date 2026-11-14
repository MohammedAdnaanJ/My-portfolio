import { ArrowDown } from "lucide-react";
import type { ProjectArchitecture } from "@/types";
import { cn } from "@/lib/utils";

/** Layered system diagram rendered from data — stacks cleanly on mobile, reads top to bottom. */
export function ArchitectureDiagram({ architecture }: { architecture: ProjectArchitecture }) {
  const { layers } = architecture;
  return (
    <figure className="rounded-2xl border bg-card/60 p-4 sm:p-6">
      <div className="bg-grid rounded-xl p-2 sm:p-4">
        {layers.map((layer, i) => (
          <div key={layer.label}>
            <div>
              <p className="mb-2 font-mono text-[0.68rem] tracking-wider text-muted-foreground uppercase">
                {String(i + 1).padStart(2, "0")} · {layer.label}
              </p>
              <ul
                className={cn(
                  "grid gap-3",
                  layer.nodes.length === 3 && "sm:grid-cols-3",
                  layer.nodes.length === 2 && "sm:grid-cols-2",
                )}
              >
                {layer.nodes.map((node) => (
                  <li
                    key={node.title}
                    className={cn(
                      "rounded-xl border bg-background p-4 shadow-sm",
                      i === 1 && "border-primary/35 bg-accent/40",
                    )}
                  >
                    <p className="text-sm font-semibold">{node.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{node.detail}</p>
                    {node.tech && <p className="mt-2 font-mono text-[0.68rem] text-primary">{node.tech}</p>}
                  </li>
                ))}
              </ul>
            </div>
            {i < layers.length - 1 && (
              <div className="flex flex-col items-center py-3 text-muted-foreground" aria-hidden={!layer.edgeLabel}>
                <span className="h-3 w-px bg-border" />
                {layer.edgeLabel && (
                  <span className="my-1 rounded-full border bg-background px-3 py-1 text-center font-mono text-[0.68rem]">
                    {layer.edgeLabel}
                  </span>
                )}
                <ArrowDown className="size-3.5" aria-hidden />
              </div>
            )}
          </div>
        ))}
      </div>
      {architecture.footnote && (
        <figcaption className="mt-4 text-xs leading-relaxed text-muted-foreground">{architecture.footnote}</figcaption>
      )}
    </figure>
  );
}

/** Compact left-to-right pipeline used on the featured project card. */
export function PipelineStrip({ steps, className }: { steps: { label: string; tech: string }[]; className?: string }) {
  return (
    <ol className={cn("flex flex-col gap-2", className)} aria-label="Architecture overview">
      {steps.map((step, i) => (
        <li key={step.label} className="flex flex-col items-stretch">
          <div className="flex items-center justify-between gap-3 rounded-lg border bg-background/80 px-3 py-2.5">
            <span className="text-sm font-medium">{step.label}</span>
            <span className="font-mono text-[0.68rem] text-muted-foreground">{step.tech}</span>
          </div>
          {i < steps.length - 1 && <span aria-hidden className="mx-auto h-2 w-px bg-primary/40" />}
        </li>
      ))}
    </ol>
  );
}
