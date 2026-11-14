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
    title: "Custom Apache Iceberg REST Catalog and metadata lifecycle engine",
    shortTitle: "Custom Apache Iceberg REST Catalog",
    status: "prototype",
    featured: true,
    category: "Data Platform · Backend",
    summary:
      "An Iceberg REST Catalog I wrote from scratch in FastAPI, backed by PostgreSQL. It tracks snapshot lineage, supports time travel and rollback, and cleans up old metadata safely. I tested it end to end with Apache Spark.",
    overview: [
      "I built this at Datagen Systems as an internal proof of concept for the Lakex.ai data archival platform. The idea was to test the approach before the development phase started. It's a FastAPI service that implements the Iceberg REST Catalog spec, uses PostgreSQL 16 as an index over table metadata, and works with Apache Spark 3.5.",
      "Serving catalog requests was only half of it. The service also records every metadata JSON file and each table's snapshot lineage, so you can look through history, time travel and roll back. It can reconcile its index against what's actually on storage, and it removes old metadata with a dry run first and a quarantine step before anything is deleted.",
    ],
    problem: [
      "An Iceberg table needs a catalog to know which metadata file is current and to coordinate commits. Existing catalogs do this well, but you never see how, and they don't show much about how metadata builds up over time. I wanted to understand it properly by building one.",
      "There's also a cleanup problem. Every commit writes a new metadata JSON file, and snapshots keep piling up. Delete the wrong file and time travel breaks, or the table points at something that no longer exists. So the second goal was cleanup you can see, repeat, and trust not to destroy anything.",
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
        "A client or engine calls the REST catalog, for example to create a namespace, load a table or commit a change.",
        "The catalog resolves the organization, namespace and table in the PostgreSQL metadata index.",
        "It reads or writes the table's Iceberg metadata JSON in the warehouse and records the new metadata location and snapshot lineage in the index.",
        "Spark uses the metadata returned by the catalog to read and write manifests and data files in the warehouse.",
      ],
      footnote:
        "Spark reads and writes data files in the warehouse directly. The catalog only owns table identity, the current metadata pointer and lifecycle operations.",
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
        description: "Every metadata file a table produces is recorded, so you can trace its whole history.",
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
          "Because the catalog follows the published REST spec, Spark works with its normal Iceberg integration. I didn't have to write or maintain a custom plugin.",
      },
      {
        title: "PostgreSQL as an index over Iceberg metadata",
        description:
          "The Iceberg metadata files are the source of truth. PostgreSQL only indexes them for fast lookups and lineage queries, so the index can always be checked against storage and corrected.",
      },
      {
        title: "Idempotent writes",
        description:
          "Writes are keyed on stable IDs. If a request is retried or reconciliation runs twice, you end up with the same state, not duplicates.",
      },
      {
        title: "Nothing is deleted straight away",
        description:
          "Expiration starts with a dry run, and files go to quarantine before they're deleted. If something is removed by mistake, it can still be recovered.",
      },
    ],
    challenges: [
      {
        title: "Keeping the index consistent with storage",
        context:
          "The PostgreSQL index and the metadata files on storage can drift apart, for example after an interrupted operation or a change made outside the catalog.",
        approach:
          "I wrote a reconciliation step that compares the index with the metadata that's really there and fixes the differences. Since writes are idempotent, it's safe to run as often as needed.",
      },
      {
        title: "Rollback without losing history",
        context:
          "Rolling a table back must change what readers see without erasing the snapshots that came after the rollback target.",
        approach:
          "Rollback uses Iceberg's snapshot semantics: it moves the table's current snapshot, and the full lineage stays recorded so you can still inspect it.",
      },
      {
        title: "Expiring metadata safely",
        context:
          "Old metadata files and snapshots must eventually be cleaned up, but removing something still referenced breaks time travel or the table itself.",
        approach:
          "Expiration always runs as a dry run first and reports exactly what it would remove. Approved files go to quarantine before final deletion, which leaves time to recover them.",
      },
      {
        title: "Compatibility with Spark",
        context:
          "Spark's Iceberg integration calls the catalog in its own way and expects responses that match the spec exactly.",
        approach:
          "I tested it from Spark end to end: creating namespaces and tables, inserting data, and reading snapshot history back through the catalog.",
      },
      {
        title: "Multi-organization isolation",
        context: "Several organizations sharing one catalog service must not see or affect each other's namespaces and tables.",
        approach: "Every catalog object belongs to an organization in the data model, so each lookup only sees one organization's data.",
      },
    ],
    learnings: [
      "How Iceberg works underneath: metadata JSON, manifest lists, manifests, snapshots, and what a commit actually changes.",
      "When you build against someone else's spec, staying compatible matters more than your own API preferences.",
      "If a system stores state in two places, you need idempotent writes and a way to reconcile them.",
      "Anything that deletes data needs a dry run and a way back before it's safe to automate.",
      "Running Spark and PostgreSQL together on Linux, and debugging problems that span more than one service.",
    ],
    scopeNote:
      "An internal proof of concept built at Datagen Systems before the development phase, tested on Linux. I designed it with production in mind, but it hasn't run in production and I haven't benchmarked it.",
    repoUrl: null,
    sourceNote: "Internal company code, so the source isn't public",
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
      "Backend APIs and archival automation for Datagen Archive Manager: 12+ FastAPI endpoints, AF, CSV and Parquet conversion jobs using IBM Optim and PostgreSQL FDW, and SQL work on Oracle, MySQL and PostgreSQL.",
    overview: [
      "Datagen Archive Manager is a full-stack archival product at Datagen Systems. On the backend I wrote 12+ FastAPI endpoints in Python for login, password and user management, and the AI Assistant, using JWT and bcrypt.",
      "I also automated the archival and conversion jobs for AF, CSV and Parquet files using IBM Optim Conversion Server and PostgreSQL FDW. Those jobs processed 500K+ records with zero data loss. Along the way I wrote and tuned SQL on Oracle, MySQL and PostgreSQL.",
    ],
    problem: [
      "Companies keep years of old data in their production databases. That costs money and slows things down, but they usually can't just delete it.",
      "Archiving moves that data out of production in a controlled way and keeps it available for later. A lot of it is sensitive, so it often has to be masked too: hidden from people who shouldn't see it, but still usable.",
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
    challenges: [
      {
        title: "Finding where a multi-step job went wrong",
        context:
          "A record passes through several databases, file formats and Optim components before it ends up archived. When a job failed, it wasn't obvious which step was responsible.",
        approach:
          "I checked the logs, ran the SQL by hand to validate it, reviewed the configuration, and broke the workflow into smaller steps until I found the root cause.",
      },
    ],
    learnings: [
      "How archival fits into data retention and database management.",
      "Writing SQL for Oracle, MySQL and PostgreSQL in the same project.",
      "Debugging a long pipeline by splitting it into small steps you can check one at a time.",
      "Running data tools on Linux servers and scripting the steps I kept repeating.",
    ],
    scopeNote:
      "Built during my internship at Datagen Systems. Client-specific details are intentionally omitted.",
    repoUrl: null,
    sourceNote: "Internal company code, so the source isn't public",
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
      "A REST API for tracking subscriptions, built with Express.js and MongoDB. It has JWT auth, rate limiting, bot protection and email validation through Arcjet, and background jobs with Upstash Redis.",
    overview: [
      "A backend for managing user subscriptions. It's an Express.js and MongoDB app split into modules, with JWT authentication.",
      "Arcjet handles rate limiting, bot protection and email validation, and Upstash Redis runs the background jobs and message queues. I tested the endpoints with Postman, including auth, input validation and error handling.",
    ],
    problem: [
      "Once an API is public, the happy path isn't enough. It has to check who's calling, block abusive or automated traffic, validate input, and run scheduled work outside the request. I wanted to build one that handles all of that.",
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
      "Putting rate limiting and bot protection in front of an API.",
      "Moving scheduled work out of the request cycle with background jobs.",
    ],
    repoUrl: null,
    sourceNote: "Private repository, so the source isn't public",
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
      "A SaaS app where you create an AI tutor for any subject and talk to it in real-time voice sessions. Built with Next.js server actions and Supabase, Clerk for auth and billing, Vapi for voice and Sentry for monitoring.",
    overview: [
      "You set up a learning companion by picking a subject, topic, voice and speaking style, then have a live voice conversation with it. The app keeps your session history, lets you bookmark companions, and limits features by plan.",
      "Data access is implemented as Next.js server actions over Supabase, with Clerk providing authentication, the pricing table and plan / feature checks.",
    ],
    problem: [
      "Talking through a topic is a good way to learn, but you don't always have a tutor around. I wanted a self-serve app where anyone can create a voice tutor for a subject, with the accounts, billing and usage limits a real SaaS needs.",
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
      "Wiring auth, billing, voice AI and monitoring from different providers into one app.",
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
      "A Kanban board with drag-and-drop tasks, saved ordering, priorities, due dates and plan tiers. Built with Next.js, Supabase and Clerk.",
    overview: [
      "Users create boards that start with default To Do, In Progress, Review and Done columns, add and rename columns, and manage tasks with priority, assignee and due date. Tasks can be dragged within and between columns, and the new position is persisted.",
      "A small service layer (board, column and task services) wraps all Supabase queries, and the Supabase client is authenticated with the user's Clerk session token.",
    ],
    problem: [
      "Drag and drop is easy to make look right and harder to keep right: the order you see has to still be there after a reload. I wanted a board where task order and columns are stored properly in the database.",
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
      "A planned app for asking questions about your own documents that runs fully locally: Ollama for the LLM, Sentence Transformers for embeddings and ChromaDB for vector search.",
    overview: [
      "I'm planning this as a way to ask questions about personal or internal documents with a local model, so the documents never leave the machine. It grows out of what I'm learning right now about local LLMs and RAG.",
      "I haven't built it yet. The scope and stack below are the plan.",
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
