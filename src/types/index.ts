export type SocialKey = "github" | "linkedin" | "email";

export interface Profile {
  name: string;
  title: string;
  /** One or two sentences shown in the hero. */
  tagline: string;
  summary: string;
  objective: string;
  /** Longer paragraphs for the About page. */
  about: string[];
  interests: string[];
  location: string | null;
  /** null = not configured yet. Links/buttons for unset values are hidden in production. */
  email: string | null;
  github: string | null;
  linkedin: string | null;
  resume: {
    href: string;
    /** Set to false once you replace public/resume.pdf with your real resume. */
    isPlaceholder: boolean;
  };
  openTo: string[];
}

export interface ExperienceFocusArea {
  title: string;
  description: string;
  highlights?: string[];
  tech: string[];
}

export interface Experience {
  company: string;
  companyUrl: string | null;
  /** e.g. "Internship". Edit to match the actual engagement. */
  engagement: string;
  /** Official job title, if any. null hides it. */
  role: string | null;
  focus: string[];
  /** Free-form dates such as "Jan 2024". null = not confirmed yet (hidden in production). */
  start: string | null;
  end: string | null;
  location: string | null;
  summary: string;
  areas: ExperienceFocusArea[];
  tech: string[];
}

export type ProjectStatus = "completed" | "prototype" | "in-progress" | "planned";

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ProjectChallenge {
  title: string;
  context: string;
  approach: string;
}

export interface ArchitectureNode {
  title: string;
  detail: string;
  tech?: string;
}

export interface ArchitectureLayer {
  label: string;
  nodes: ArchitectureNode[];
  /** Label for the connection from this layer to the next one. */
  edgeLabel?: string;
}

export interface ProjectArchitecture {
  layers: ArchitectureLayer[];
  flow: string[];
  footnote?: string;
}

export interface Project {
  slug: string;
  title: string;
  shortTitle: string;
  status: ProjectStatus;
  featured: boolean;
  category: string;
  summary: string;
  overview: string[];
  problem: string[];
  architecture?: ProjectArchitecture;
  /** Short top-to-bottom pipeline shown on the featured project card. */
  pipeline?: { label: string; tech: string }[];
  stack: string[];
  stackLabel?: string;
  features: ProjectFeature[];
  featuresLabel?: string;
  decisions?: ProjectFeature[];
  challenges?: ProjectChallenge[];
  learnings?: string[];
  scopeNote?: string;
  /** null = no public repository. Never put a made-up URL here. */
  repoUrl: string | null;
  /** Deployed demo. Leave unset if the deployment is down. */
  liveUrl?: string;
  /** Shown instead of a repo link when the code isn't public. */
  sourceNote?: string;
  /** e.g. "May – Jun 2025" */
  period?: string;
  /** Visible only in `npm run dev` — reminders of what still needs filling in. */
  todos?: string[];
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export interface NavItem {
  label: string;
  href: string;
}
