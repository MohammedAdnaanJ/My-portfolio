import Link from "next/link";
import { navItems, profile } from "@/data/profile";
import { Container } from "@/components/ui/primitives";
import { SocialLinks } from "./social-links";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium">{profile.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">Backend · Python · Software Engineering</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <SocialLinks showTodos={false} />
      </Container>
      <Container className="pb-8">
        <p className="font-mono text-xs text-subtle">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js & TypeScript.
        </p>
      </Container>
    </footer>
  );
}
