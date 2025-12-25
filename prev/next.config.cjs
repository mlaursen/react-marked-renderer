/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  eslint: {
    // I have already run lint before this step...
    ignoreDuringBuilds: true,
  },
  typescript: {
    // I have already typecheck before this step...
    ignoreBuildErrors: true,
  },
};
