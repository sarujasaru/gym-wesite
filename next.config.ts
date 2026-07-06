import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  compiler: {
    // ப்ரொடக்ஷன் பில்டில் கன்சோல் லாகுகளை நீக்கி ஜாவாஸ்கிரிப்ட் அளவை மேலும் சுருக்கும்
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@sanity/icons',
      '@sanity/ui',
      'sanity',
      '@sanity/client', // சானிட்டி கிளைன்ட் இம்போர்ட்டை ஆப்டிமைஸ் செய்ய சேர்க்கப்பட்டது
      'motion',
      'framer-motion'   // பிரேமர் மோஷன் பண்டில் அளவைக் குறைக்க சேர்க்கப்பட்டது
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
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        chunks: 'all',
        cacheGroups: {
          ...config.optimization.splitChunks?.cacheGroups,
          sanity: {
            test: /[\\/]node_modules[\\/](@sanity|sanity|next-sanity)[\\/]/,
            name: 'sanity-vendor',
            chunks: 'async',
            priority: 30,
            reuseExistingChunk: true,
          },
          motion: {
            test: /[\\/]node_modules[\\/](motion|framer-motion|motion-dom|motion-utils)[\\/]/,
            name: 'motion-vendor',
            chunks: 'all',
            priority: 25,
            reuseExistingChunk: true,
          },
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
