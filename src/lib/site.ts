/**
 * Canonical site URL. Set NEXT_PUBLIC_SITE_URL in your deployment environment
 * (e.g. https://mohammedadnaan.dev). Falls back to the Vercel URL, then localhost.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const isDev = process.env.NODE_ENV === "development";
