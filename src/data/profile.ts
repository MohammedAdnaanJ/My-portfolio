import type { NavItem, Profile } from "@/types";

/**
 * ─── Personal profile ───────────────────────────────────────────────────────
 * Everything visitors read about you lives here. Fields set to `null` are
 * hidden in production and flagged with a "TODO" marker during `npm run dev`.
 * To update the resume, replace the PDF in public/ and keep resume.href in sync.
 */
export const profile: Profile = {
  name: "Mohammed Adnaan",
  title: "Backend Engineer | Python | FastAPI | REST APIs",
  tagline:
    "I write APIs in Python and FastAPI and spend a lot of time in SQL databases. Lately I've been going deep on Apache Iceberg and Spark.",
  summary:
    "I've always been more curious about what happens behind the screen than about the screen itself: which service picks up a request, what it asks the database, and where the data ends up. That's what pulled me into backend and data work. At Datagen Systems I built FastAPI services, automated archival jobs that moved 500K+ records without losing any, and set up data masking for sensitive Oracle columns.",
  objective: "I'm looking for a full-time backend or software engineering role.",
  about: [
    "I got into backend work because I wanted to understand how things work behind the scenes: how a request turns into a query, how data moves between services, and how databases and APIs fit together. Building that part well interests me more than the interface on top of it.",
    "My internship at Datagen Systems was mostly enterprise data archival. I built FastAPI endpoints for login, passwords and user management, automated archive and conversion jobs for AF, CSV and Parquet files, and installed and configured RHEL, the databases and IBM InfoSphere Optim.",
    "The hardest part was learning how archival and data masking actually work. A record passes through several databases, file formats and Optim components on its way to the archive, and masking has to hide sensitive values while keeping the data usable. When something broke, I read the logs, ran the SQL by hand, checked the configuration, and split the workflow into smaller steps until I found the one that failed.",
    "On the Lakex.ai platform I prototyped an Apache Iceberg REST Catalog as an internal proof of concept, and added column-level redaction for 5+ sensitive fields in Oracle.",
    "A few things I believe: understand the problem before writing code, and pick the simple solution over the clever one. I use AI tools, but I don't ship code I can't explain.",
    "Right now I'm studying system design, going further into Iceberg and lakehouse architecture, and running local LLMs to build small RAG apps. I learn best by building something and fixing whatever breaks.",
  ],
  interests: [
    "System design",
    "Apache Iceberg and lakehouse architecture",
    "Local LLMs and RAG applications",
    "Writing better Python",
  ],
  location: "Chennai, Tamil Nadu · Open to relocation",
  email: "mohamedadnan081@gmail.com",
  github: "https://github.com/MohammedAdnaanJ",
  linkedin: "https://www.linkedin.com/in/mohammedadnaan14",
  resume: {
    href: "/Mohammed_Adnaan_Resume.pdf",
    isPlaceholder: false,
  },
  openTo: ["Backend Engineering", "Python Development", "Software Engineering"],
};

export const navItems: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];
