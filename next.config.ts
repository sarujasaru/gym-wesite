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
    // Enable package optimization for heavy libraries
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
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Setup explicit, optimized Webpack splitChunks to isolate dynamic heavy vendored bundles
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        chunks: 'all',
        cacheGroups: {
          ...config.optimization.splitChunks?.cacheGroups,
          // Framework bundle isolation for caching
          framework: {
            test: /[\\/]node_modules[\\/](react|react-dom|next|scheduler)[\\/]/,
            name: 'framework-vendor',
            chunks: 'all',
            priority: 40,
            enforce: true,
          },
          // Isolates heavy Sanity Studio logic into its own chunks
          sanity: {
            test: /[\\/]node_modules[\\/](@sanity|sanity|next-sanity|@sanity\/client|@sanity\/image-url|@sanity\/vision)[\\/]/,
            name: 'sanity-vendor',
            chunks: 'all',
            priority: 30,
            reuseExistingChunk: true,
          },
          // Isolates motion/animation library overhead into its own chunks
          motion: {
            test: /[\\/]node_modules[\\/](motion|framer-motion|motion-dom|motion-utils)[\\/]/,
            name: 'motion-vendor',
            chunks: 'all',
            priority: 25,
            reuseExistingChunk: true,
          },
          // Isolates heavy lucide icons
          lucide: {
            test: /[\\/]node_modules[\\/](lucide-react)[\\/]/,
            name: 'lucide-vendor',
            chunks: 'all',
            priority: 20,
            reuseExistingChunk: true,
          },
          // Core vendor commons
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
          },
        },
      };
    }

    return config;
  },
  turbopack: {},
};

export default nextConfig;
