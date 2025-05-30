import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  images: {
    domains: ["storage.googleapis.com"],
  },
};

export default nextConfig;
