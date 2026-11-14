"use client";

import { motion } from "motion/react";

/**
 * Hero figure: the Iceberg REST catalog endpoints and a snapshot lineage after a rollback.
 * The drawing is decorative; the caption carries the meaning for screen readers.
 * The only motion is the lineage drawing itself once on load.
 */
const endpoints: { method: "GET" | "POST"; path: string; note?: string }[] = [
  { method: "GET", path: "/v1/config" },
  { method: "GET", path: "/v1/namespaces" },
  { method: "POST", path: "/v1/namespaces/{ns}/tables" },
  { method: "GET", path: "/v1/namespaces/{ns}/tables/{t}" },
  { method: "POST", path: "/v1/namespaces/{ns}/tables/{t}", note: "commit" },
];

const ease = [0.21, 0.47, 0.32, 0.98] as const;
const lineageDelay = 0.3;

export function HeroVisual() {
  return (
    <figure className="select-none">
      <div aria-hidden="true" className="rounded-lg border bg-card">
        <div className="space-y-1.5 px-4 py-4 font-mono text-[0.72rem] sm:text-xs">
          {endpoints.map((e, i) => (
            <div key={i} className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
              <span className={e.method === "GET" ? "w-9 text-success" : "w-9 text-primary"}>{e.method}</span>
              <span className="truncate text-foreground/85">{e.path}</span>
              {e.note && (
                <span className="ml-auto rounded border border-primary/30 px-1.5 text-[0.6rem] text-primary">
                  {e.note}
                </span>
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
            <motion.line
              x1="24"
              y1="34"
              x2="216"
              y2="34"
              stroke="var(--border)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, delay: lineageDelay, ease: "easeInOut" }}
            />
            <motion.line
              x1="216"
              y1="34"
              x2="296"
              y2="34"
              stroke="var(--border)"
              strokeWidth="2"
              strokeDasharray="4 4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: lineageDelay + 0.9 }}
            />
            {[24, 104, 184].map((x, i) => (
              <motion.g
                key={x}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 380, damping: 18, delay: lineageDelay + 0.15 + i * 0.25 }}
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              >
                <circle
                  cx={x + (i === 2 ? 32 : 0)}
                  cy="34"
                  r={i === 2 ? 7 : 5}
                  fill={i === 2 ? "var(--primary)" : "var(--muted-foreground)"}
                />
                <text
                  x={x + (i === 2 ? 32 : 0)}
                  y="62"
                  textAnchor="middle"
                  className="fill-muted-foreground font-mono"
                  fontSize="10"
                >
                  s{i + 1}
                </text>
              </motion.g>
            ))}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: lineageDelay + 1 }}
            >
              <circle
                cx="296"
                cy="34"
                r="5"
                fill="none"
                stroke="var(--muted-foreground)"
                strokeOpacity="0.6"
                strokeWidth="1.5"
              />
              <text
                x="296"
                y="62"
                textAnchor="middle"
                className="fill-muted-foreground font-mono"
                fontSize="10"
                opacity="0.6"
              >
                s4
              </text>
            </motion.g>
            <motion.g
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: lineageDelay + 0.9, ease }}
            >
              <rect x="186" y="4" width="60" height="16" rx="4" fill="var(--accent)" />
              <text x="216" y="15.5" textAnchor="middle" className="fill-accent-foreground font-mono" fontSize="9">
                current
              </text>
              <line x1="216" y1="20" x2="216" y2="26" stroke="var(--primary)" strokeWidth="1.5" />
            </motion.g>
          </svg>
        </div>
      </div>
      <figcaption className="mt-3 text-sm leading-relaxed text-muted-foreground">
        The Iceberg REST catalog I prototyped at Lakex.ai: its endpoints, and a table&apos;s snapshot history after
        rolling back to s3.
      </figcaption>
    </figure>
  );
}
