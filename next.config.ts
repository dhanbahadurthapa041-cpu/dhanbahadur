import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Round 2: experimental.viewTransition intentionally NOT set — the flag
  // does not exist in the installed Next 16.3.4 config types, and the
  // matching <ViewTransition> API needs the experimental React channel
  // (installed: stable React 19.2.8). Do NOT upgrade Next/React for this;
  // revisit when the API stabilises. See globals.css for the 180ms
  // crossfade rules that will apply once the wrapper lands.
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
