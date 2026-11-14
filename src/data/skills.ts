import type { SkillGroup } from "@/types";

/** Grouped skills — no ratings, just what you work with. Order = display order. */
export const skillGroups: SkillGroup[] = [
  {
    title: "Programming",
    skills: ["Python", "SQL", "TypeScript", "JavaScript"],
  },
  {
    title: "Backend",
    skills: ["FastAPI", "REST APIs", "Node.js", "Express.js", "JWT", "OAuth2"],
  },
  {
    title: "Data Engineering",
    skills: ["Apache Spark", "PySpark", "Apache Iceberg", "Parquet", "External Tables", "Data Archival"],
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "MySQL", "Oracle", "MongoDB"],
  },
  {
    title: "Infrastructure",
    skills: ["Linux", "Networking", "RHEL", "OEL", "Shell Scripting", "Server Configuration", "Troubleshooting"],
  },
  {
    title: "Frontend",
    skills: ["HTML", "CSS", "React.js", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Enterprise",
    skills: ["IBM InfoSphere Optim"],
  },
  {
    title: "Tools",
    skills: ["Git", "GitHub", "VS Code", "Postman"],
  },
];
