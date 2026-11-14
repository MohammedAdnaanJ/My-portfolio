import type { CSSProperties } from "react";
import {
  Archive,
  ArchiveRestore,
  Bug,
  Database,
  DatabaseZap,
  KeyRound,
  MountainSnow,
  Network,
  Server,
  ServerCog,
  SquareCode,
  SquareTerminal,
  TableProperties,
  Webhook,
  type LucideIcon,
} from "lucide-react";
import {
  siApacheparquet,
  siApachespark,
  siCss,
  siExpress,
  siFastapi,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siJsonwebtokens,
  siLinux,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPostman,
  siPython,
  siReact,
  siRedhat,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";
import { cn } from "@/lib/utils";

/**
 * Brand logos come from simple-icons (CC0). Skills without a logo — generic concepts, or brands
 * simple-icons removed for trademark reasons (Oracle, IBM, VS Code, Iceberg) — use a Lucide icon.
 */
const icons: Record<string, SimpleIcon | LucideIcon> = {
  Python: siPython,
  SQL: DatabaseZap,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  FastAPI: siFastapi,
  "REST APIs": Webhook,
  "Node.js": siNodedotjs,
  "Express.js": siExpress,
  JWT: siJsonwebtokens,
  OAuth2: KeyRound,
  "Apache Spark": siApachespark,
  PySpark: siApachespark,
  "Apache Iceberg": MountainSnow,
  Parquet: siApacheparquet,
  "External Tables": TableProperties,
  "Data Archival": Archive,
  PostgreSQL: siPostgresql,
  MySQL: siMysql,
  Oracle: Database,
  MongoDB: siMongodb,
  Linux: siLinux,
  Networking: Network,
  RHEL: siRedhat,
  OEL: Server,
  "Shell Scripting": SquareTerminal,
  "Server Configuration": ServerCog,
  Troubleshooting: Bug,
  HTML: siHtml5,
  CSS: siCss,
  "React.js": siReact,
  "Next.js": siNextdotjs,
  "Tailwind CSS": siTailwindcss,
  "IBM InfoSphere Optim": ArchiveRestore,
  Git: siGit,
  GitHub: siGithub,
  "VS Code": SquareCode,
  Postman: siPostman,
};

function isSimpleIcon(icon: SimpleIcon | LucideIcon): icon is SimpleIcon {
  return "path" in icon;
}

/** Near-black brand colours vanish in dark mode, so those keep the text colour on hover. */
function brandColor(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 40 ? undefined : `#${hex}`;
}

/**
 * Icon for a skill name. Monochrome by default; inside a `group/skill` element it takes the
 * brand colour on hover. Renders nothing for skills without a mapping.
 */
export function SkillIcon({ skill, className }: { skill: string; className?: string }) {
  const icon = icons[skill];
  if (!icon) return null;

  const classes = cn(
    "size-3.5 shrink-0 text-muted-foreground transition-colors duration-200 group-hover/skill:text-(--brand)",
    className,
  );

  if (isSimpleIcon(icon)) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className={classes}
        style={{ "--brand": brandColor(icon.hex) ?? "var(--foreground)" } as CSSProperties}
      >
        <path d={icon.path} />
      </svg>
    );
  }

  const Icon = icon;
  return <Icon aria-hidden className={classes} style={{ "--brand": "var(--primary)" } as CSSProperties} />;
}
