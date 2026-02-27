import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.api-sports.io",
        pathname: "/football/**",
      },
    ],
  },
  env: {
    FOOTBALL_API_KEY: process.env.FOOTBALL_API_KEY,
  },
};

export default nextConfig;
