import type { SkillGroup } from "@/types";

/** Grouped skills — no ratings, just what you work with. Order = display order. */
export const skillGroups: SkillGroup[] = [
  {
    title: "Programming",
    description: "Languages I write day to day",
    icon: "code",
    skills: ["Python", "SQL", "TypeScript", "JavaScript"],
  },
  {
    title: "Backend",
    description: "APIs, services and auth",
    icon: "server",
    skills: ["FastAPI", "REST APIs", "Node.js", "Express.js", "JWT", "OAuth2"],
  },
  {
    title: "Data Engineering",
    description: "Processing, table formats and query engines",
    icon: "workflow",
    skills: [
      "Apache Spark",
      "PySpark",
      "Apache Iceberg",
      "Trino",
      "Presto",
      "Parquet",
      "External Tables",
      "Data Archival",
    ],
  },
  {
    title: "Databases",
    description: "Relational and document stores",
    icon: "database",
    skills: ["PostgreSQL", "MySQL", "Oracle", "MongoDB"],
  },
  {
    title: "Infrastructure",
    description: "Servers, scripting and operations",
    icon: "terminal",
    skills: ["Linux", "RHEL", "OEL", "Shell Scripting", "Server Configuration", "Troubleshooting"],
  },
  {
    title: "Frontend",
    description: "Interfaces for the services I build",
    icon: "layout",
    skills: ["React.js", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Enterprise",
    description: "Enterprise data management",
    icon: "building",
    skills: ["IBM InfoSphere Optim"],
  },
  {
    title: "Tools",
    description: "Everyday tooling",
    icon: "wrench",
    skills: ["Git", "GitHub", "VS Code", "Postman"],
  },
];
