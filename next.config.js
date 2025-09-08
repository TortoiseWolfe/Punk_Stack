/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

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

module.exports = nextConfig;