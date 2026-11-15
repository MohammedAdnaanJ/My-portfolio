import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FolderGit2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ErrorView } from "@/components/layout/error-view";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <ErrorView
      code="404"
      title="Page not found"
      description="The page you're looking for doesn't exist or has moved. Check the URL, or head back home."
    >
      <Link href="/" className={cn(buttonVariants(), "h-10 px-4")}>
        <ArrowLeft className="size-4" />
        Back to home
      </Link>
      <Link href="/projects" className={cn(buttonVariants({ variant: "outline" }), "h-10 px-4")}>
        <FolderGit2 className="size-4" />
        View projects
      </Link>
    </ErrorView>
  );
}
