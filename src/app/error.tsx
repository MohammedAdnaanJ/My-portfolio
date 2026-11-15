"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { ErrorView } from "@/components/layout/error-view";

/** Catches errors thrown while rendering a page (served with a 500 status). Header and footer stay intact. */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <title>Something went wrong</title>
      <ErrorView
        code="500"
        title="Something went wrong"
        description="An unexpected error occurred on my end. Try again, and if it keeps happening, let me know."
        detail={error.digest && <>Reference: {error.digest}</>}
      >
        <Button onClick={reset} className="h-10 px-4">
          <RotateCw className="size-4" />
          Try again
        </Button>
        <Link href="/" className={cn(buttonVariants({ variant: "outline" }), "h-10 px-4")}>
          <ArrowLeft className="size-4" />
          Back to home
        </Link>
      </ErrorView>
    </>
  );
}
