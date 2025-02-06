/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['www.uemg.br', 'fapemig.br', 'images.unsplash.com']
  },
};

module.exports = nextConfig;