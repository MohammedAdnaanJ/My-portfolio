"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download, Menu } from "lucide-react";
import { navItems, profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "./theme-toggle";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="glass sticky top-0 z-40 border-b">
      <a
        href="#main"
        className="sr-only rounded-md bg-primary px-3 py-2 text-primary-foreground focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2.5 rounded-md" aria-label={`${profile.name} — home`}>
          <span className="flex size-8 items-center justify-center rounded-lg border bg-card font-mono text-xs font-semibold text-primary transition-colors group-hover:border-primary/40">
            MA
          </span>
          <span className="hidden text-sm font-medium tracking-tight sm:inline">{profile.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm transition-colors",
                      active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <a
            href={profile.resume.href}
            download
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "ml-1 hidden h-9 px-3 sm:inline-flex")}
          >
            <Download className="size-3.5" />
            Resume
          </a>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="size-9 md:hidden" aria-label="Open menu" />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-6">
              <SheetTitle className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                Navigation
              </SheetTitle>
              <nav aria-label="Mobile" className="mt-2">
                <ul className="flex flex-col gap-1">
                  {[{ label: "Home", href: "/" }, ...navItems].map((item) => {
                    const active = item.href === "/" ? pathname === "/" : isActive(pathname, item.href);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "block rounded-lg px-3 py-2.5 text-base transition-colors",
                            active ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <a
                href={profile.resume.href}
                download
                onClick={() => setOpen(false)}
                className={cn(buttonVariants({ variant: "outline" }), "mt-4 h-10 w-full")}
              >
                <Download className="size-4" />
                Download resume
              </a>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
