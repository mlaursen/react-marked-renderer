import type { NextConfig } from "next";
import { join } from "node:path";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode: true,
  poweredByHeader: false,

  turbopack: {
    root: join(import.meta.dirname, "..", ".."),
  },

  sassOptions: {
    implementation: "sass-embedded",
  },
};

export default nextConfig;
