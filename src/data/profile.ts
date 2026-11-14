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
    "I build backend services and data systems — REST APIs with Python and FastAPI, SQL-backed applications, and data platforms on Apache Spark and Apache Iceberg.",
  summary:
    "Backend-focused software engineer with hands-on experience in developing REST APIs, database-driven applications, enterprise data archival solutions, and data engineering systems. Experienced with Python, FastAPI, SQL databases, Linux environments, Apache Spark, and Apache Iceberg. Interested in building scalable backend services, reliable data platforms, and maintainable software systems.",
  objective:
    "Seeking full-time opportunities in Backend Engineering, Python Development, and Software Engineering.",
  about: [
    "I'm a backend-focused software engineer. Most of my work sits where application code meets data: designing REST APIs in Python and FastAPI, modelling and querying relational databases, and building the plumbing that moves, stores and manages data reliably.",
    "At Datagen Systems I worked hands-on across backend development, automation and data engineering — building APIs, working with PostgreSQL, MySQL and Oracle databases, contributing to enterprise data archival workflows with IBM InfoSphere Optim, and administering Linux (RHEL / OEL) environments with shell scripting.",
    "On the Lakex.ai data archival platform I prototyped a custom Apache Iceberg REST Catalog as an internal proof of concept — a metadata lifecycle engine covering snapshot lineage, time travel, rollback, reconciliation and safe metadata expiration, exercised end-to-end with Apache Spark.",
    "I care about systems that are boring in the best way: predictable under retries, observable, safe by default, and easy for the next engineer to understand.",
  ],
  interests: [
    "Scalable backend services and API design",
    "Lakehouse table formats and metadata management",
    "Reliable data pipelines and data platforms",
    "Database operations and troubleshooting",
    "Linux systems and automation",
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
