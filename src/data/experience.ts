import type { Experience } from "@/types";

/**
 * ─── Professional experience ────────────────────────────────────────────────
 * Content mirrors the Work Experience section of the resume in public/.
 * `null` values are hidden in production and flagged as TODO in development.
 */
export const experience: Experience[] = [
  {
    company: "Datagen Systems Pvt. Ltd.",
    companyUrl: "https://www.datagensystems.com/",
    engagement: "Internship",
    role: "Backend Engineer Intern",
    focus: ["Backend Development", "Automation Engineering", "Data Engineering"],
    start: "Oct 2025",
    end: "Oct 2026",
    location: "Chennai",
    summary:
      "Worked on enterprise data archival and backend engineering workflows involving API development, database operations, data management, and automation — hands-on across enterprise database environments, archival workflows, Linux-based systems, and distributed data technologies.",
    areas: [
      {
        title: "Datagen Archive Manager — full-stack archival platform",
        description: "Backend APIs, archival automation and database work for an enterprise archival product.",
        highlights: [
          "Developed 12+ FastAPI backend APIs in Python covering authentication, password management, user management and AI Assistant functionality, using JWT and bcrypt.",
          "Automated data archival and conversion workflows for AF, CSV and Parquet formats, integrating IBM Optim Conversion Server and PostgreSQL FDW — processing 500K+ records with zero data loss.",
          "Designed and optimized SQL operations across Oracle, MySQL and PostgreSQL; supported React frontend integration and resolved 10+ API bugs through systematic Postman testing and debugging.",
        ],
        tech: ["Python", "FastAPI", "JWT", "bcrypt", "IBM Optim", "PostgreSQL FDW", "Parquet", "React.js"],
      },
      {
        title: "Lakex.ai — data archival platform",
        description: "Backend and lakehouse metadata work on a data archival platform.",
        highlights: [
          "Developed backend APIs and database operations.",
          "Prototyped a custom Apache Iceberg REST Catalog as an internal proof of concept to enable standardized lakehouse metadata management across distributed data sources.",
          "Implemented Oracle column-level data redaction across 5+ sensitive data fields; resolved 15+ API/UI integration issues through end-to-end functional testing.",
        ],
        tech: ["FastAPI", "Apache Iceberg", "Apache Spark", "Oracle", "PostgreSQL"],
      },
      {
        title: "Enterprise environment setup",
        description: "Infrastructure for enterprise data management tooling.",
        highlights: [
          "Installed and configured Red Hat Enterprise Linux, databases and IBM InfoSphere Optim.",
          "Supported DGM / TDM installation and configuration.",
        ],
        tech: ["RHEL", "OEL", "IBM InfoSphere Optim", "Shell Scripting"],
      },
    ],
    tech: [
      "Python",
      "FastAPI",
      "React.js",
      "PostgreSQL",
      "MySQL",
      "Oracle",
      "IBM InfoSphere Optim",
      "Apache Iceberg",
      "Apache Spark",
      "Trino",
      "RHEL / OEL",
      "Shell",
      "JWT",
    ],
  },
];
