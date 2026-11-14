"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

// The timeline pieces start at scale 0, which has no area for IntersectionObserver to see,
// so each one observes an untransformed wrapper and animates an inner element.

/** Vertical timeline line that draws downward as it scrolls into view. */
export function TimelineRail() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  return (
    <span ref={ref} aria-hidden className="absolute inset-y-0 left-0 w-px">
      <motion.span
        className="block h-full w-full origin-top bg-border"
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : undefined}
        transition={{ duration: 1.2, ease }}
      />
    </span>
  );
}

/** Timeline marker that pops in with a spring. `className` positions it; `dotClassName` styles the dot. */
export function TimelineDot({ className, dotClassName }: { className?: string; dotClassName?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  return (
    <span ref={ref} aria-hidden className={className}>
      <motion.span
        className={dotClassName}
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : undefined}
        transition={{ type: "spring", stiffness: 420, damping: 16, delay: 0.2 }}
      />
    </span>
  );
}
