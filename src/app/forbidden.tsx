import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ErrorView } from "@/components/layout/error-view";

export const metadata: Metadata = { title: "Access denied", robots: { index: false } };

/** Rendered with a 403 status when a route calls `forbidden()` from `next/navigation`. */
export default function Forbidden() {
  return (
    <ErrorView
      code="403"
      title="Access denied"
      description="You don't have permission to view this page. If you think that's a mistake, get in touch."
    >
      <Link href="/" className={cn(buttonVariants(), "h-10 px-4")}>
        <ArrowLeft className="size-4" />
        Back to home
      </Link>
      <Link href="/contact" className={cn(buttonVariants({ variant: "outline" }), "h-10 px-4")}>
        Contact me
      </Link>
    </ErrorView>
  );
}
