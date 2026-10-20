import type { NextConfig } from "next";

// Before the launch (see src/lib/launch.ts) only the pre-launch page and the
// legal pages are public: the checkout pages send people back home.
const prelaunch = process.env.NEXT_PUBLIC_PRELAUNCH?.trim() !== "false";

const nextConfig: NextConfig = {
  async redirects() {
    return prelaunch ? [{ source: "/assinatura/:path*", destination: "/", permanent: false }] : [];
  },
};

export default nextConfig;
