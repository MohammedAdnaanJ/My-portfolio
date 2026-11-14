import type { ProjectStatus } from "@/types";
import { cn } from "@/lib/utils";

const config: Record<ProjectStatus, { label: string; dot: string }> = {
  completed: { label: "Completed", dot: "bg-success" },
  prototype: { label: "Internal POC", dot: "bg-primary" },
  "in-progress": { label: "In progress", dot: "bg-amber-500" },
  planned: { label: "Planned", dot: "bg-subtle" },
};

export function StatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  const { label, dot } = config[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground",
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", dot)} aria-hidden />
      {label}
    </span>
  );
}
