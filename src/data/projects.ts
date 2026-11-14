import type { Project } from "@/types";

/**
 * ─── Projects ───────────────────────────────────────────────────────────────
 * Each entry renders a card on /projects and a case-study page at /projects/<slug>.
 *
 * Credibility rules this file follows (keep them when you edit):
 *   - `repoUrl` stays null until a real public repository exists.
 *   - No benchmarks, user counts or production claims that can't be backed up.
 *   - Planned work is labelled as planned (`status: "planned"`).
 *
 * Review the wording of each section and adjust it so it describes your
 * implementation precisely — you know the details better than this draft does.
 */
export const projects: Project[] = [
  {
    slug: "iceberg-rest-catalog",
    title: "Production-Oriented Custom Apache Iceberg REST Catalog & Metadata Lifecycle Engine",
    shortTitle: "Custom Apache Iceberg REST Catalog",
    status: "prototype",
    featured: true,
    category: "Data Platform · Backend",
    summary:
      "A custom Apache Iceberg REST Catalog with a metadata lifecycle engine — snapshot lineage, time travel, rollback, reconciliation and quarantine-first metadata expiration — built with FastAPI and PostgreSQL and exercised end-to-end with Apache Spark.",
    overview: [
      "A from-scratch implementation of an Apache Iceberg REST Catalog built with FastAPI, using PostgreSQL 16 as a metadata index and exercised end-to-end with Apache Spark 3.5. I built it at Datagen Systems as an internal proof of concept for the Lakex.ai data archival platform, to validate the approach before the development phase.",
      "Beyond serving catalog requests, the service includes a metadata lifecycle engine: it tracks every metadata JSON file and the snapshot lineage of each table, supports snapshot history, time travel and rollback using Iceberg semantics, reconciles its index against the metadata on storage, and expires old metadata through a dry-run, quarantine-first cleanup process.",
    ],
    problem: [
      "Iceberg tables depend on a catalog to map a table identifier to its current metadata file and to coordinate commits. Off-the-shelf catalogs work, but they hide how that coordination happens — and they give limited visibility into how table metadata accumulates over time.",
      "Every commit writes a new metadata JSON file and snapshots pile up. Cleaning that up carelessly can break time travel or leave a table pointing at files that no longer exist. The goal was to build a catalog from the API level up, understand Iceberg's metadata model in depth, and design lifecycle management that is observable, repeatable and safe by default.",
    ],
    architecture: {
      layers: [
        {
          label: "Clients & compute",
          nodes: [
            { title: "API clients", detail: "HTTP / JSON requests", tech: "REST" },
            { title: "Apache Spark", detail: "Table creation & data insertion", tech: "Spark 3.5 · PySpark" },
          ],
          edgeLabel: "Iceberg REST Catalog API",
        },
        {
          label: "Catalog service",
          nodes: [
            {
              title: "FastAPI REST Catalog",
              detail: "Organizations · namespaces · tables · commits · snapshots",
              tech: "Python · FastAPI",
            },
            {
              title: "Metadata lifecycle engine",
              detail: "Reconciliation · expiration · dry-run · quarantine",
              tech: "Python",
            },
          ],
          edgeLabel: "Index reads & writes · metadata file reads & writes",
        },
        {
          label: "Metadata & storage",
          nodes: [
            {
              title: "PostgreSQL metadata index",
              detail: "Catalog objects, metadata pointers, snapshot lineage",
              tech: "PostgreSQL 16",
            },
            {
              title: "Iceberg metadata & warehouse",
              detail: "Metadata JSON, manifests, Parquet data files",
              tech: "Apache Iceberg 1.5.2",
            },
          ],
        },
      ],
      flow: [
        "A client or engine calls the REST catalog — for example to create a namespace, load a table or commit a change.",
        "The catalog resolves the organization, namespace and table in the PostgreSQL metadata index.",
        "It reads or writes the table's Iceberg metadata JSON in the warehouse and records the new metadata location and snapshot lineage in the index.",
        "Spark uses the metadata returned by the catalog to read and write manifests and data files in the warehouse.",
      ],
      footnote:
        "Spark accesses data files in the warehouse directly; the catalog owns table identity, the current metadata pointer and lifecycle operations.",
    },
    pipeline: [
      { label: "Client", tech: "REST / HTTP" },
      { label: "FastAPI REST Catalog", tech: "Python" },
      { label: "PostgreSQL metadata index", tech: "PostgreSQL 16" },
      { label: "Iceberg metadata / warehouse", tech: "Iceberg 1.5.2" },
      { label: "Apache Spark", tech: "Spark 3.5 · PySpark" },
    ],
    stack: [
      "Python",
      "FastAPI",
      "PostgreSQL 16",
      "Apache Spark 3.5",
      "PySpark",
      "Apache Iceberg 1.5.2",
      "Linux",
    ],
    features: [
      {
        title: "Custom REST catalog APIs",
        description: "Catalog endpoints implemented in FastAPI so standard Iceberg clients and engines can talk to it.",
      },
      {
        title: "Namespace & table management",
        description: "Create, list, load and drop namespaces and tables through the catalog.",
      },
      {
        title: "Spark integration",
        description: "Tables created and data inserted from Spark / PySpark using the custom catalog.",
      },
      {
        title: "Metadata JSON tracking",
        description: "Every metadata file a table produces is recorded, so its history is fully traceable.",
      },
      {
        title: "Snapshot lineage",
        description: "Parent–child relationships between snapshots stored and queryable per table.",
      },
      {
        title: "Snapshot history & time travel",
        description: "Inspect a table's snapshot history and query earlier versions of the data.",
      },
      {
        title: "Rollback",
        description: "Roll a table back to an earlier snapshot using Iceberg's own semantics.",
      },
      {
        title: "PostgreSQL metadata indexing",
        description: "Catalog objects, metadata pointers and lineage indexed in PostgreSQL for fast lookups.",
      },
      {
        title: "Reconciliation & idempotent persistence",
        description: "The index can be reconciled against metadata on storage, and re-running a write never duplicates state.",
      },
      {
        title: "Safe metadata expiration",
        description: "Dry-run reports what would be removed; files are quarantined before anything is deleted.",
      },
      {
        title: "Multi-organization model",
        description: "Catalog objects are scoped by organization so multiple tenants can share one service.",
      },
    ],
    decisions: [
      {
        title: "Follow the Iceberg REST specification",
        description:
          "Implementing the published REST catalog contract means Spark works with its stock Iceberg integration — no custom engine plugin to build or maintain.",
      },
      {
        title: "PostgreSQL as an index over Iceberg metadata",
        description:
          "Iceberg's metadata files stay the source of table state; PostgreSQL indexes them for fast lookups and lineage queries. Because the index is derived, it can be reconciled against storage.",
      },
      {
        title: "Idempotent writes",
        description:
          "Persistence is keyed on stable identifiers, so a retried request or a repeated reconciliation run converges on the same state instead of creating duplicates.",
      },
      {
        title: "Destructive operations are safe by default",
        description:
          "Metadata expiration starts with a dry run and moves files to quarantine before deletion, so a mistake is recoverable rather than permanent.",
      },
    ],
    challenges: [
      {
        title: "Keeping the index consistent with storage",
        context:
          "The PostgreSQL index and the metadata files on storage can drift — for example after an interrupted operation or a change made outside the catalog.",
        approach:
          "Built a reconciliation process that compares the index with the metadata actually present and brings them back in line, combined with idempotent persistence so it is safe to run repeatedly.",
      },
      {
        title: "Rollback without losing history",
        context:
          "Rolling a table back must change what readers see without erasing the snapshots that came after the rollback target.",
        approach:
          "Used Iceberg's snapshot semantics so rollback moves the table's current snapshot while the full lineage remains recorded and inspectable.",
      },
      {
        title: "Expiring metadata safely",
        context:
          "Old metadata files and snapshots must eventually be cleaned up, but removing something still referenced breaks time travel or the table itself.",
        approach:
          "Expiration runs as dry-run first, reporting exactly what would be removed. Approved removals go to quarantine before final deletion, giving a recovery window.",
      },
      {
        title: "Compatibility with Spark",
        context:
          "Spark's Iceberg integration exercises the catalog API in its own way and expects responses that match the specification exactly.",
        approach:
          "Validated the catalog end-to-end from Spark — creating namespaces and tables, inserting data, and reading snapshot history back through the catalog.",
      },
      {
        title: "Multi-organization isolation",
        context: "Several organizations sharing one catalog service must not see or affect each other's namespaces and tables.",
        approach: "Scoped catalog objects by organization in the data model so every lookup resolves within a single organization.",
      },
    ],
    learnings: [
      "How Iceberg actually works underneath: metadata JSON, manifest lists, manifests, snapshots and how a commit moves a table from one state to the next.",
      "Designing REST APIs against an external specification, where compatibility with existing clients matters more than API taste.",
      "Why idempotency and reconciliation are essential in any system that stores state in two places.",
      "Building destructive maintenance operations with dry-run and quarantine stages so they are safe to automate.",
      "Running Spark and PostgreSQL together on Linux and debugging problems that cross service boundaries.",
    ],
    scopeNote:
      "Internal proof of concept built at Datagen Systems ahead of the development phase, and tested in a Linux environment. It was designed with production concerns in mind, but no production deployment or performance benchmarks are claimed.",
    repoUrl: null,
    sourceNote: "Internal company codebase — source not publicly available",
    todos: ["Review the decisions/challenges wording so it matches your implementation exactly."],
  },
  {
    slug: "enterprise-data-archival",
    title: "Enterprise Data Archival & Management",
    shortTitle: "Enterprise Data Archival",
    status: "completed",
    featured: false,
    category: "Enterprise Data · Databases",
    summary:
      "Backend APIs and archival automation for Datagen Archive Manager — 12+ FastAPI endpoints, AF / CSV / Parquet conversion workflows with IBM Optim and PostgreSQL FDW, and SQL work across Oracle, MySQL and PostgreSQL.",
    overview: [
      "Work on Datagen Archive Manager, a full-stack enterprise archival platform at Datagen Systems. I developed 12+ FastAPI backend APIs in Python covering authentication, password management, user management and AI Assistant functionality, secured with JWT and bcrypt.",
      "I automated data archival and conversion workflows for AF, CSV and Parquet formats, integrating IBM Optim Conversion Server and PostgreSQL FDW — processing 500K+ records with zero data loss — and designed and optimized SQL operations across Oracle, MySQL and PostgreSQL.",
    ],
    problem: [
      "Enterprise systems accumulate large volumes of historical data. Keeping all of it in production databases increases cost and slows systems down, but the data often still has to be retained and remain accessible.",
      "Archival workflows move that data out of production systems in a controlled way, while keeping it usable for later access.",
    ],
    stack: [
      "Python",
      "FastAPI",
      "JWT",
      "bcrypt",
      "IBM InfoSphere Optim",
      "PostgreSQL FDW",
      "Oracle",
      "PostgreSQL",
      "MySQL",
      "Parquet",
      "React.js",
      "Linux",
    ],
    featuresLabel: "What I built",
    features: [
      {
        title: "12+ FastAPI backend APIs",
        description: "Authentication, password management, user management and AI Assistant endpoints, secured with JWT and bcrypt.",
      },
      {
        title: "Archival & conversion automation",
        description: "Automated workflows for AF, CSV and Parquet formats using IBM Optim Conversion Server and PostgreSQL FDW.",
      },
      {
        title: "500K+ records, zero data loss",
        description: "Conversion workflows processed over 500K records without data loss.",
      },
      {
        title: "SQL across three databases",
        description: "Designed and optimized SQL operations on Oracle, MySQL and PostgreSQL.",
      },
      {
        title: "Frontend integration & debugging",
        description: "Supported React frontend integration and resolved 10+ API bugs through systematic Postman testing.",
      },
      {
        title: "Environment setup",
        description: "Installed and configured Red Hat Enterprise Linux, databases and IBM InfoSphere Optim.",
      },
    ],
    learnings: [
      "How enterprise archival fits into data retention and database management.",
      "Working confidently across multiple relational database platforms.",
      "Operating data tooling on Linux servers and automating repeatable steps.",
    ],
    scopeNote:
      "Built during my internship at Datagen Systems. Client-specific details are intentionally omitted.",
    repoUrl: null,
    sourceNote: "Internal company codebase — source not publicly available",
  },
  {
    slug: "subscription-tracker-api",
    title: "Subscription Tracker REST API",
    shortTitle: "Subscription Tracker API",
    status: "completed",
    featured: false,
    category: "Backend · REST API",
    period: "Jun – Jul 2025",
    summary:
      "A secure REST API for tracking subscriptions — Express.js and MongoDB with JWT authentication, Arcjet rate limiting, bot protection and email validation, and Upstash Redis for background job scheduling.",
    overview: [
      "A backend service for managing user subscriptions, built with Express.js and MongoDB in a modular architecture and secured with JWT authentication.",
      "Arcjet protects the API with rate limiting, bot protection and email validation, and Upstash Redis handles background job scheduling and message queues. Endpoints were tested with Postman, covering authentication, input validation and error handling.",
    ],
    problem: [
      "A public API has to defend itself: authenticate users, reject abusive or automated traffic, validate input, and run time-based work outside the request cycle. The goal was a backend that handles those concerns properly rather than only the happy path.",
    ],
    stack: ["Node.js", "Express.js", "MongoDB", "JWT", "Arcjet", "Upstash Redis", "Postman"],
    features: [
      {
        title: "JWT authentication",
        description: "Sign-up / sign-in with JWT-protected routes.",
      },
      {
        title: "Modular backend architecture",
        description: "Express.js API organised into separate modules on top of MongoDB.",
      },
      {
        title: "Rate limiting & bot protection",
        description: "Arcjet guards endpoints against excessive requests and automated traffic.",
      },
      {
        title: "Email validation",
        description: "Arcjet validates email addresses on input.",
      },
      {
        title: "Background jobs & queues",
        description: "Upstash Redis for background job scheduling and message queues.",
      },
      {
        title: "API testing",
        description: "Postman tests covering authentication, input validation and error handling.",
      },
    ],
    learnings: [
      "Designing a REST API with authentication, validation and consistent error handling.",
      "Adding a security layer — rate limiting and bot protection — in front of an API.",
      "Moving scheduled work out of the request cycle with background jobs.",
    ],
    repoUrl: null,
    sourceNote: "Private repository — source not publicly available",
  },
  {
    slug: "ai-learning-companion-saas",
    title: "AI-Powered Learning Companion SaaS",
    shortTitle: "AI Learning Companion SaaS",
    status: "completed",
    featured: false,
    category: "Full-Stack · AI",
    period: "May – Jun 2025",
    summary:
      "A SaaS app where users create AI tutors for any subject and learn with them through real-time voice sessions — Next.js server actions over Supabase, Clerk authentication and plan-based billing, Vapi voice AI and Sentry monitoring.",
    overview: [
      "Users build their own AI learning companions — choosing a subject, topic, voice and speaking style — and then hold live voice conversations with them. The app tracks session history, lets users bookmark companions, and gates features by subscription plan.",
      "Data access is implemented as Next.js server actions over Supabase, with Clerk providing authentication, the pricing table and plan / feature checks.",
    ],
    problem: [
      "Learning by talking through a topic is effective, but a human tutor isn't always available. The goal was a self-serve product where anyone can spin up a subject-specific voice tutor, with the account, billing and usage limits a real SaaS needs.",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Clerk",
      "Vapi AI",
      "Sentry",
      "Zod",
      "React Hook Form",
      "Tailwind CSS",
      "shadcn/ui",
    ],
    features: [
      {
        title: "Custom AI companions",
        description: "Create tutors with a subject, topic, voice and style through a validated form (React Hook Form + Zod).",
      },
      {
        title: "Real-time voice sessions",
        description: "Live voice conversations with a companion using the Vapi web SDK.",
      },
      {
        title: "Search, filter & pagination",
        description: "Companion library searchable by name or topic and filterable by subject, with range-based pagination in Supabase.",
      },
      {
        title: "Session history & bookmarks",
        description: "Recent sessions and a personal learning journey, plus bookmarks that revalidate the page on change.",
      },
      {
        title: "Plan-based limits",
        description: "Clerk billing with a pricing table; server-side checks cap how many companions a user can create on each plan.",
      },
      {
        title: "Monitoring",
        description: "Sentry instrumentation for client, server and edge error tracking.",
      },
    ],
    learnings: [
      "Structuring data access as typed server actions with authentication checks on every call.",
      "Enforcing subscription limits on the server rather than trusting the UI.",
      "Integrating third-party services — auth, billing, voice AI and monitoring — into one coherent product.",
    ],
    repoUrl: "https://github.com/MohammedAdnaanJ/AI_SaaS_App",
    // Deployment at https://ai-saa-s-app-ten.vercel.app returned HTTP 500 when checked; add liveUrl once it's fixed.
  },
  {
    slug: "trello-clone",
    title: "Kanban Project Management Board (Trello Clone)",
    shortTitle: "Trello Clone",
    status: "completed",
    featured: false,
    category: "Full-Stack",
    period: "Aug 2025",
    summary:
      "A Kanban board app with drag-and-drop tasks across columns, persisted ordering, task priorities and due dates, and plan tiers — built with Next.js, Supabase and Clerk.",
    overview: [
      "Users create boards that start with default To Do, In Progress, Review and Done columns, add and rename columns, and manage tasks with priority, assignee and due date. Tasks can be dragged within and between columns, and the new position is persisted.",
      "A small service layer (board, column and task services) wraps all Supabase queries, and the Supabase client is authenticated with the user's Clerk session token.",
    ],
    problem: [
      "Drag-and-drop UIs are easy to make look right and hard to make stay right: the order a user sees has to survive a page reload. The goal was a Kanban board where ordering and column membership are stored reliably in the database.",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Clerk", "dnd-kit", "Tailwind CSS", "shadcn/ui"],
    features: [
      {
        title: "Drag-and-drop tasks",
        description: "Move tasks within and across columns with dnd-kit; the column and sort order are saved to Supabase.",
      },
      {
        title: "Boards & columns",
        description: "Boards are created with four default columns; columns can be added and renamed.",
      },
      {
        title: "Rich tasks",
        description: "Tasks carry a description, assignee, due date and low / medium / high priority.",
      },
      {
        title: "Dashboard & filters",
        description: "Dashboard with board stats, plus filter dialogs for boards and tasks.",
      },
      {
        title: "Plans & pricing",
        description: "Free, Pro and Enterprise plan states shared through React context, with a pricing page.",
      },
      {
        title: "Authenticated data access",
        description: "Clerk authentication, with the Supabase client using the Clerk session token for requests.",
      },
    ],
    decisions: [
      {
        title: "Service layer over raw queries",
        description:
          "Board, column and task operations live in dedicated services, so components never build Supabase queries directly and data logic stays in one place.",
      },
      {
        title: "Explicit sort order",
        description: "Columns and tasks store a sort_order value, so the visual order is reproducible from the database alone.",
      },
    ],
    learnings: [
      "Modelling ordered, nested data (boards → columns → tasks) in a relational database.",
      "Keeping drag-and-drop UI state consistent with what is persisted in the database.",
      "Connecting a third-party auth provider to Supabase.",
    ],
    repoUrl: "https://github.com/MohammedAdnaanJ/Trello-Clone",
    liveUrl: "https://trello-clone-indol-six.vercel.app",
  },
  {
    slug: "earthquake-visualizer",
    title: "Earthquake Visualizer",
    shortTitle: "Earthquake Visualizer",
    status: "completed",
    featured: false,
    category: "Frontend · Data Visualization",
    period: "Oct 2025",
    summary:
      "A React app that plots the last 24 hours of earthquakes from the USGS live feed on an interactive map, with magnitude filters and a details sidebar.",
    overview: [
      "The app fetches the USGS GeoJSON feed of all earthquakes from the past day and plots each event on a Leaflet map. A sidebar lists events with magnitude and details, and the map auto-zooms to fit the data.",
      "Data fetching is isolated in a custom useEarthquakeData hook that exposes loading and error states to the UI.",
    ],
    problem: [
      "Raw earthquake feeds are hard to read as JSON. Putting events on a map with simple magnitude filters makes recent seismic activity understandable at a glance.",
    ],
    stack: ["React", "Vite", "React Leaflet", "Leaflet", "Axios", "Tailwind CSS"],
    features: [
      {
        title: "Live USGS data",
        description: "Pulls the USGS all-day GeoJSON feed on load.",
      },
      {
        title: "Interactive map",
        description: "Events plotted with React Leaflet, with automatic zoom to fit.",
      },
      {
        title: "Magnitude filters",
        description: "Switch between all events, magnitude above 3 and magnitude above 5.",
      },
      {
        title: "Details sidebar",
        description: "Browsable list of recent earthquakes with magnitude and location details.",
      },
      {
        title: "Loading & error states",
        description: "Spinner while fetching and a clear message if the feed can't be loaded.",
      },
      {
        title: "Responsive layout",
        description: "Works on desktop and mobile, with a hamburger toggle for the sidebar.",
      },
    ],
    learnings: [
      "Working with GeoJSON from a public API.",
      "Separating data fetching into a reusable hook with explicit loading and error states.",
    ],
    repoUrl: "https://github.com/MohammedAdnaanJ/Earthquake-Visualizer",
  },
  {
    slug: "local-rag-document-intelligence",
    title: "Local Document Intelligence / RAG Application",
    shortTitle: "Local RAG Application",
    status: "planned",
    featured: false,
    category: "AI · Backend",
    summary:
      "A planned, fully local retrieval-augmented generation app for asking questions about your own documents — local LLM inference with Ollama, embeddings with Sentence Transformers and a ChromaDB vector store.",
    overview: [
      "A planned application for querying personal or internal documents with a local language model, so documents never leave the machine.",
      "This project has not been built yet. The scope and stack below describe the intended design.",
    ],
    problem: [
      "Hosted AI tools are a poor fit for private or sensitive documents. A local pipeline keeps data on the machine while still allowing natural-language questions over it.",
    ],
    stackLabel: "Planned stack",
    stack: [
      "Python",
      "FastAPI",
      "Streamlit",
      "Ollama",
      "Qwen2.5",
      "Sentence Transformers",
      "LangChain",
      "ChromaDB",
    ],
    featuresLabel: "Planned scope",
    features: [
      {
        title: "Document ingestion",
        description: "Load documents, split them into chunks and generate embeddings with Sentence Transformers.",
      },
      {
        title: "Vector search",
        description: "Store embeddings in ChromaDB and retrieve the most relevant chunks for each question.",
      },
      {
        title: "Local inference",
        description: "Answer questions with Qwen2.5 running locally through Ollama.",
      },
      {
        title: "API and UI",
        description: "A FastAPI backend with a Streamlit interface.",
      },
    ],
    repoUrl: null,
    todos: ["Update status to 'in-progress' or 'completed' and move items from 'Planned scope' to features as you build them."],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const featuredProject = projects.find((p) => p.featured) ?? projects[0];
