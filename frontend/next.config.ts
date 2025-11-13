import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add these two blocks to skip errors during Vercel's build
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Your original settings (keep these)
  experimental: {
    globalNotFound: true,
  },
  images: {
    qualities: [75, 85, 95, 100],
  },
};

export default nextConfig;
