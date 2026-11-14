/**
 * Decorative hero illustration: Iceberg REST catalog endpoints and a snapshot
 * lineage after a rollback. Purely illustrative, hidden from assistive tech.
 */
const endpoints: { method: "GET" | "POST"; path: string; note?: string }[] = [
  { method: "GET", path: "/v1/config" },
  { method: "GET", path: "/v1/namespaces" },
  { method: "POST", path: "/v1/namespaces/{ns}/tables" },
  { method: "GET", path: "/v1/namespaces/{ns}/tables/{t}" },
  { method: "POST", path: "/v1/namespaces/{ns}/tables/{t}", note: "commit" },
];

export function HeroVisual() {
  return (
    <div aria-hidden="true" className="relative select-none">
      <div className="absolute -inset-8 -z-10 rounded-[2rem] bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
      <div className="glass overflow-hidden rounded-2xl border shadow-2xl shadow-black/10 dark:shadow-black/40">
        <div className="flex items-center gap-2 border-b px-4 py-3">
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="ml-2 font-mono text-[0.7rem] text-muted-foreground">iceberg-rest-catalog</span>
          <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[0.65rem] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-success" />
            fastapi
          </span>
        </div>

        <div className="space-y-1.5 px-4 py-4 font-mono text-[0.72rem] sm:text-xs">
          {endpoints.map((e, i) => (
            <div key={i} className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
              <span className={e.method === "GET" ? "w-9 text-success" : "w-9 text-primary"}>{e.method}</span>
              <span className="truncate text-foreground/85">{e.path}</span>
              {e.note && (
                <span className="ml-auto rounded border border-primary/30 px-1.5 text-[0.6rem] text-primary">{e.note}</span>
              )}
            </div>
          ))}
        </div>

        <div className="border-t px-4 pt-3 pb-4">
          <div className="mb-2 flex items-center justify-between font-mono text-[0.65rem] text-muted-foreground">
            <span>snapshot lineage · events</span>
            <span>rollback → s3</span>
          </div>
          <svg viewBox="0 0 320 76" className="w-full" fill="none">
            <line x1="24" y1="34" x2="216" y2="34" stroke="var(--border)" strokeWidth="2" />
            <line x1="216" y1="34" x2="296" y2="34" stroke="var(--border)" strokeWidth="2" strokeDasharray="4 4" />
            {[24, 104, 184].map((x, i) => (
              <g key={x}>
                <circle cx={x + (i === 2 ? 32 : 0)} cy="34" r={i === 2 ? 7 : 5} fill={i === 2 ? "var(--primary)" : "var(--muted-foreground)"} />
                <text x={x + (i === 2 ? 32 : 0)} y="62" textAnchor="middle" className="fill-muted-foreground font-mono" fontSize="10">
                  s{i + 1}
                </text>
              </g>
            ))}
            <circle cx="296" cy="34" r="5" fill="none" stroke="var(--muted-foreground)" strokeOpacity="0.6" strokeWidth="1.5" />
            <text x="296" y="62" textAnchor="middle" className="fill-muted-foreground font-mono" fontSize="10" opacity="0.6">
              s4
            </text>
            <rect x="186" y="4" width="60" height="16" rx="4" fill="var(--accent)" />
            <text x="216" y="15.5" textAnchor="middle" className="fill-accent-foreground font-mono" fontSize="9">
              current
            </text>
            <line x1="216" y1="20" x2="216" y2="26" stroke="var(--primary)" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}
