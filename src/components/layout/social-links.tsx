import { Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { Todo } from "@/components/ui/primitives";

export function getSocialLinks() {
  return [
    profile.github && { key: "github", label: "GitHub", href: profile.github, Icon: GitHubIcon },
    profile.linkedin && { key: "linkedin", label: "LinkedIn", href: profile.linkedin, Icon: LinkedInIcon },
    profile.email && { key: "email", label: "Email", href: `mailto:${profile.email}`, Icon: Mail },
  ].filter(Boolean) as { key: string; label: string; href: string; Icon: typeof Mail }[];
}

/** Icon row of configured social links. Unconfigured links are hidden (TODO shown in dev). */
export function SocialLinks({ className, showTodos = true }: { className?: string; showTodos?: boolean }) {
  const links = getSocialLinks();
  const missing = [!profile.github && "github", !profile.linkedin && "linkedin", !profile.email && "email"].filter(Boolean);

  return (
    <div className={cn("flex flex-wrap items-center gap-1", className)}>
      {links.map(({ key, label, href, Icon }) => (
        <a
          key={key}
          href={href}
          {...(key !== "email" && { target: "_blank", rel: "noopener" })}
          aria-label={label}
          className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Icon className="size-4" />
        </a>
      ))}
      {showTodos && missing.length > 0 && <Todo>set {missing.join(", ")} in src/data/profile.ts</Todo>}
    </div>
  );
}
