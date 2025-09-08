import withPWAInit from "next-pwa";

/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  buildExcludes: [/middleware-manifest\.json$/],
  // Pre-cache all theme assets
  additionalManifestEntries: [
    // Theme CSS files - pre-cache all 12 themes
    { url: '/themes/neon-day.css', revision: 'v1' },
    { url: '/themes/neon-noir.css', revision: 'v1' },
    { url: '/themes/solar-bloom.css', revision: 'v1' },
    { url: '/themes/forest-canopy.css', revision: 'v1' },
    { url: '/themes/brass-copper.css', revision: 'v1' },
    { url: '/themes/victorian-noir.css', revision: 'v1' },
    { url: '/themes/miami-sunrise.css', revision: 'v1' },
    { url: '/themes/retro-night.css', revision: 'v1' },
    { url: '/themes/art-deco.css', revision: 'v1' },
    { url: '/themes/noir-industrial.css', revision: 'v1' },
    { url: '/themes/lab-bright.css', revision: 'v1' },
    { url: '/themes/toxic-glow.css', revision: 'v1' },
    // Offline fallback page
    { url: '/offline.html', revision: 'v1' }
  ],
  // Advanced caching strategies
  runtimeCaching: [
    // Cache First - Fonts (rarely change)
    {
      urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts-v1",
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
        },
      },
    },
    // Cache First - Theme assets
    {
      urlPattern: /\/themes\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "punk-themes-v1",
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
        },
      },
    },
    // Stale While Revalidate - JS/CSS bundles
    {
      urlPattern: /\/_next\/static\/.*/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "static-resources-v1",
        expiration: {
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
    // Cache First - Images
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "images-v1",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
    // Network First - HTML pages
    {
      urlPattern: /^\/(?!api).*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "pages-v1",
        networkTimeoutSeconds: 3,
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 24 * 60 * 60, // 1 day
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    // Network First - API routes
    {
      urlPattern: /^\/api\/.*/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "api-cache-v1",
        networkTimeoutSeconds: 5,
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 5 * 60, // 5 minutes
        },
        backgroundSync: {
          name: "api-queue",
          options: {
            maxRetentionTime: 24 * 60, // 24 hours
          },
        },
      },
    },
  ],
  // Fallback for offline
  fallbacks: {
    document: '/offline.html',
  },
});

const nextConfig = {
  // GitHub Pages deployment configuration
  ...(isGitHubPages && {
    output: 'export',
    basePath: '/Punk_Stack',
    images: {
      unoptimized: true,
    },
  }),
  
  // Ensure static export works properly
  ...(isProd && {
    distDir: isGitHubPages ? 'out' : '.next',
  }),
};

export default withPWA(nextConfig);