import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    unoptimized: true, // For now, to avoid optimization issues in some envs
  }
};

export default nextConfig;
