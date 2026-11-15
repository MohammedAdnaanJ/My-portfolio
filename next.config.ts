import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Enables `forbidden()` / `unauthorized()` from next/navigation and the `forbidden.tsx` page.
    authInterrupts: true,
  },
};

export default nextConfig;
