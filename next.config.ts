import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  
  typescript: {
    ignoreBuildErrors: false,
  },
  
  compiler: {
    // Strip console.log calls in production to reduce bundle size and memory usage
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  experimental: {
    // Enable package optimization for heavy libraries natively and correctly
    optimizePackageImports: [
      'lucide-react',
      '@sanity/icons',
      '@sanity/ui',
      'sanity',
      '@sanity/client',
      'motion',
      'framer-motion'
    ],
  },
  
  // ✅ turbopack moved to top-level (not under experimental)
  turbopack: {
    // Reduce bundle size with resolve extensions
    resolveExtensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 60,
  },
  
  output: 'standalone',
  transpilePackages: ['motion'],
};

export default nextConfig;