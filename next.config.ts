import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    "preview-chat-b2389c5c-1187-48e9-a4e0-5052bbeef483.space-z.ai",
  ],
};

export default nextConfig;
