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
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;