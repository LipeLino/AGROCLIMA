/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/project",
  output: "export",  // <=== enables static exports
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
