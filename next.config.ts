import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Round 2: no <ViewTransition> wrapper — the API needs the experimental
  // React channel (installed: stable React 19.2.8). Do NOT upgrade
  // Next/React for this; revisit when the stable API is confirmed. See
  // globals.css for the 180ms crossfade rules that apply once it lands.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
