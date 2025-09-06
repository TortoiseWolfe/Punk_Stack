import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: process.env.GITHUB_PAGES === 'true' ? 'export' : undefined,
  
  // Set base path for GitHub Pages (repository name)
  basePath: process.env.GITHUB_PAGES === 'true' ? '/Punk_Stack' : '',
  
  // Asset prefix for GitHub Pages
  assetPrefix: process.env.GITHUB_PAGES === 'true' ? '/Punk_Stack' : '',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;