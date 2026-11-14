# Mohammed Adnaan — Portfolio

Personal portfolio for a backend / data engineer. Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **shadcn/ui** (Base UI), **Motion** and **Lucide**.

- Dark-first design with a light theme toggle
- Pages: Home, About, Experience, Projects, project case studies (`/projects/[slug]`), Contact
- Case-study pages with architecture diagram, design decisions, challenges and learnings
- Contact form with client + server validation (zod), honeypot spam protection, clear success/error states
- SEO: per-page metadata, Open Graph / Twitter cards, generated OG image, `sitemap.xml`, `robots.txt`, JSON-LD `Person`
- Accessible: semantic landmarks, skip link, keyboard-friendly nav, `aria-current`, reduced-motion support

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run lint       # ESLint
npm run build      # production build (also type-checks)
npm start          # serve the production build
```

Requires Node.js 18.18+ (Node 20+ recommended).

## Editing content

All content lives in `src/data/` — you shouldn't need to touch components to update the site.

| File | What it controls |
| --- | --- |
| `src/data/profile.ts` | Name, title, summary, About text, email, GitHub, LinkedIn, resume, nav items |
| `src/data/experience.ts` | Experience timeline (company, dates, engagement, focus areas, tech) |
| `src/data/projects.ts` | Project cards and case-study pages (overview, architecture, features, challenges…) |
| `src/data/skills.ts` | Grouped skills |

Types for all of these are in `src/types/index.ts`.

### Remaining TODOs

Unknown values are set to `null` rather than invented. In **production** they're hidden; in **`npm run dev`** they show an amber **TODO** marker.

- [ ] Review the Iceberg case study's decisions/challenges wording so it matches your implementation exactly
- [ ] Local RAG app: update `status` as you build it (`"planned"` → `"in-progress"` → `"completed"`)

To update the resume, replace `public/Mohammed_Adnaan_Resume.pdf` (or change `profile.resume.href` if the file name changes).

### Adding a project

Add an object to the `projects` array in `src/data/projects.ts` with a unique `slug`. Its page at `/projects/<slug>`, the card, and the sitemap entry are generated automatically. Optional sections (`architecture`, `decisions`, `challenges`, `learnings`, `pipeline`) render only when present.

## Contact form

The form posts to `src/app/api/contact/route.ts`, which sends mail through [Resend](https://resend.com)'s HTTP API (no SDK needed).

1. Create a Resend account and API key.
2. Set environment variables (copy `.env.example` to `.env.local` for local development):

```bash
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=you@example.com          # where messages are delivered
CONTACT_FROM_EMAIL="Portfolio <hello@your-domain.com>"   # optional; needs a verified domain
```

Without these variables the form still validates input but responds with a clear "not configured yet" message instead of pretending to send.

## Deploying to Vercel

1. Push this project to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository. Vercel detects Next.js automatically — no build settings needed.
3. Under **Settings → Environment Variables** add:
   - `NEXT_PUBLIC_SITE_URL` — your final URL, e.g. `https://mohammedadnaan.dev` (used for canonical URLs, sitemap and OG tags; falls back to the Vercel production URL)
   - `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, optionally `CONTACT_FROM_EMAIL`
4. Deploy. Every push to the default branch redeploys; pull requests get preview URLs.
5. Optional: add a custom domain under **Settings → Domains**, then update `NEXT_PUBLIC_SITE_URL` and redeploy.

Or with the CLI:

```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production deployment
```

## Project structure

```
src/
  app/
    page.tsx                 Home (hero, about, experience, projects, skills, contact)
    about/  experience/  projects/  contact/
    projects/[slug]/page.tsx Case-study pages (statically generated)
    api/contact/route.ts     Contact form endpoint
    layout.tsx               Root layout, fonts, global metadata
    opengraph-image.tsx      Generated social preview image
    sitemap.ts  robots.ts  not-found.tsx  icon.svg  globals.css
  components/
    layout/                  Header, footer, theme toggle, providers, social links
    sections/                Page sections (hero, about, experience, skills, projects, contact)
    projects/                Project cards, case-study layout, architecture diagram, status badge
    ui/                      shadcn/ui components + shared primitives
  data/                      ← all editable content
  lib/                       utils, site config, contact schema
  types/                     content types
public/
  Mohammed_Adnaan_Resume.pdf ← downloadable resume
```

## Theming

Colors are CSS variables in `src/app/globals.css` (`:root` = light, `.dark` = dark). Change `--primary` in both blocks to change the accent color.
