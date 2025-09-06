/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
  // Enable static export for GitHub Pages
  output: isGitHubPages ? 'export' : undefined,
  
  // Configure base path for GitHub Pages deployment
  // Replace 'Punk_Stack' with your repository name
  basePath: isGitHubPages ? '/Punk_Stack' : '',
  assetPrefix: isGitHubPages ? '/Punk_Stack/' : '',
  
  // Disable image optimization for static export
  images: {
    unoptimized: isGitHubPages,
  },
  
  // Ensure trailing slashes for better GitHub Pages compatibility
  trailingSlash: isGitHubPages,
  
  // React strict mode for better development experience
  reactStrictMode: true,
  
  // SWC minification for better performance
  swcMinify: true,
  
  // Standalone output for Docker optimization
  output: isProd && !isGitHubPages ? 'standalone' : undefined,
  
  // Experimental features
  experimental: {
    // Enable server components
    serverActions: !isGitHubPages,
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_SITE_URL: isGitHubPages 
      ? 'https://yourusername.github.io/Punk_Stack'
      : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
  
  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Add any custom webpack config here
    return config;
  },
};

module.exports = nextConfig;