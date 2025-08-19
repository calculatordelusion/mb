/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    // Handle ONNX Runtime Web and other ES modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
    };

    // Handle ES modules that use import.meta
    config.module.rules.push({
      test: /\.m?js$/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    });

    // Exclude problematic modules from transpilation
    config.module.rules.push({
      test: /node_modules\/onnxruntime-web/,
      use: 'null-loader',
    });

    return config;
  },
  experimental: {
    esmExternals: 'loose',
  },
}

module.exports = nextConfig