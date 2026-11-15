"use client";

import { useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Providers } from "@/components/layout/providers";
import { ErrorView } from "@/components/layout/error-view";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

/**
 * Last-resort boundary for errors in the root layout itself. It replaces the whole document,
 * so it renders its own <html>/<body> and skips the header and footer (they may be what failed).
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <title>Something went wrong</title>
        <Providers>
          <main id="main" className="flex flex-1 items-center">
            <ErrorView
              code="500"
              title="Something went wrong"
              description="The site hit an unexpected error and couldn't load. Try again in a moment."
              detail={error.digest && <>Reference: {error.digest}</>}
            >
              <Button onClick={reset} className="h-10 px-4">
                <RotateCw className="size-4" />
                Try again
              </Button>
              {/* Plain <a> forces a full reload, which is what a broken root layout needs. */}
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/" className="text-sm font-medium underline decoration-border underline-offset-4 hover:decoration-foreground">
                Back to home
              </a>
            </ErrorView>
          </main>
        </Providers>
      </body>
    </html>
  );
}
