/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'images.unsplash.com',
            },
            {
              protocol: 'https',
              hostname: 'lxlfwrdbdhafahrrgtzk.supabase.co',
            },
            {
              protocol: 'http',
              hostname: 'localhost',
            },
            {
              protocol: 'https',
              hostname: 'localhost',
            },
            {
              protocol: 'https',
              hostname: 'api.producthunt.com',
            },
          ],
    },

    // SEO and Performance optimizations
    compress: true,
    poweredByHeader: false,
    generateEtags: false,

    async headers() {
      return [
        {
          source: "/app/:path*", 
          headers: [
            { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
            { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
          ],
        },
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            {
              key: 'X-XSS-Protection',
              value: '1; mode=block',
            },
            {
              key: 'Referrer-Policy',
              value: 'strict-origin-when-cross-origin',
            },
            {
              key: 'Permissions-Policy',
              value: 'camera=(), microphone=(), geolocation=()',
            },
          ],
        },
        {
          source: '/sitemap.xml',
          headers: [
            {
              key: 'Content-Type',
              value: 'application/xml',
            },
          ],
        },
        {
          source: '/robots.txt',
          headers: [
            {
              key: 'Content-Type',
              value: 'text/plain',
            },
          ],
        },
      ];
    },

    // Redirects for SEO
    async redirects() {
      return [
        {
          source: '/home',
          destination: '/',
          permanent: true,
        },
        {
          source: '/text-behind-image',
          destination: '/',
          permanent: true,
        },
        {
          source: '/text-behind-image-tool',
          destination: '/',
          permanent: true,
        },
      ];
    },

    // Rewrites for clean URLs
    async rewrites() {
      return [
        {
          source: '/text-behind-image',
          destination: '/',
        },
        {
          source: '/text-behind-image-tool',
          destination: '/',
        },
        {
          source: '/ai-text-effects',
          destination: '/',
        },
        {
          source: '/image-text-overlay',
          destination: '/',
        },
        {
          source: '/text-behind-image-online',
          destination: '/',
        },
        {
          source: '/text-behind-image-free',
          destination: '/',
        },
        {
          source: '/text-behind-image-generator',
          destination: '/',
        },
        {
          source: '/text-behind-image-editor',
          destination: '/',
        },
        {
          source: '/text-behind-image-maker',
          destination: '/',
        },
        {
          source: '/text-behind-image-website',
          destination: '/',
        },
      ];
    },
};

export default nextConfig;
