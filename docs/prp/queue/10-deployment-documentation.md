# PRP-11: Deployment & Documentation

## Status: QUEUED
## Created: 2025-01-09
## Priority: High
## Target Completion: Week 7
## Dependencies: All other PRPs

## Objective
Establish comprehensive deployment pipelines, CI/CD automation, and create complete documentation including API references, user guides, and deployment instructions for GitHub Pages and other platforms.

## Consolidates
- GitHub Pages Deployment
- Documentation site
- CI/CD pipelines
- API documentation

## Success Criteria
- [ ] GitHub Pages deployment with app and Storybook
- [ ] GitHub Actions CI/CD pipeline
- [ ] Automated testing in CI
- [ ] Documentation site with search
- [ ] API reference documentation
- [ ] User guides and tutorials
- [ ] Deployment guides for multiple platforms
- [ ] Performance monitoring in production

## GitHub Pages Deployment

### Static Export Configuration
```javascript
// next.config.js for GitHub Pages
const isProd = process.env.NODE_ENV === 'production';
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

module.exports = {
  // Enable static export for GitHub Pages
  output: isGitHubPages ? 'export' : undefined,
  
  // Set base path for GitHub Pages
  basePath: isGitHubPages ? '/Punk_Stack' : '',
  
  // Asset prefix for CDN
  assetPrefix: isGitHubPages ? '/Punk_Stack/' : '',
  
  // Disable image optimization for static export
  images: {
    unoptimized: isGitHubPages,
  },
  
  // Trailing slashes for GitHub Pages
  trailingSlash: isGitHubPages,
};
```

### GitHub Actions Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  # Build job
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          
      - name: Cache dependencies
        uses: actions/cache@v3
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-
            
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test -- --coverage
        
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
          
      - name: Build Next.js app
        env:
          GITHUB_PAGES: true
        run: npm run build
        
      - name: Build Storybook
        run: npm run build-storybook -- -o out/storybook
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  # Deployment job
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## CI/CD Pipeline

### Pull Request Checks
```yaml
# .github/workflows/pr-checks.yml
name: PR Checks

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run format:check
      
  type-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run type-check
      
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        shard: [1, 2, 3, 4]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm test -- --shard=${{ matrix.shard }}/4
      
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run build
      - run: npm run e2e
      
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            http://localhost:3000
            http://localhost:3000/components
          uploadArtifacts: true
          temporaryPublicStorage: true
```

### Release Automation
```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Create Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          draft: false
          prerelease: false
          
      - name: Generate changelog
        uses: conventional-changelog-action@v3
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          output-file: 'CHANGELOG.md'
          
      - name: Deploy to production
        run: |
          # Deploy to Vercel, Netlify, etc.
          echo "Deploying to production..."
```

## Documentation Site

### Documentation Structure
```
docs/
├── getting-started/
│   ├── installation.md
│   ├── quick-start.md
│   └── project-structure.md
├── guides/
│   ├── themes/
│   │   ├── using-themes.md
│   │   ├── creating-themes.md
│   │   └── theme-architecture.md
│   ├── components/
│   │   ├── component-patterns.md
│   │   ├── creating-components.md
│   │   └── testing-components.md
│   └── deployment/
│       ├── github-pages.md
│       ├── vercel.md
│       └── docker.md
├── api/
│   ├── components/
│   ├── hooks/
│   ├── utilities/
│   └── themes/
└── contributing/
    ├── code-of-conduct.md
    ├── contributing.md
    └── development-setup.md
```

### Documentation Generator
```typescript
// scripts/generate-docs.ts
import { Project } from 'ts-morph';
import fs from 'fs-extra';
import path from 'path';

const project = new Project({
  tsConfigFilePath: path.join(process.cwd(), 'tsconfig.json'),
});

// Generate API documentation
function generateAPIDocs() {
  const sourceFiles = project.getSourceFiles('components/**/*.tsx');
  
  sourceFiles.forEach(file => {
    const components = file.getExportedDeclarations();
    
    components.forEach((declarations, name) => {
      declarations.forEach(declaration => {
        if (declaration.getKindName() === 'FunctionDeclaration' ||
            declaration.getKindName() === 'VariableDeclaration') {
          const jsDocs = declaration.getJsDocs();
          const props = extractProps(declaration);
          
          generateComponentDoc(name, jsDocs, props);
        }
      });
    });
  });
}

// Generate component documentation
function generateComponentDoc(name: string, jsDocs: any[], props: any[]) {
  const doc = `# ${name}

${extractDescription(jsDocs)}

## Import
\`\`\`typescript
import { ${name} } from '@/components/${getComponentPath(name)}';
\`\`\`

## Props
${generatePropsTable(props)}

## Examples
${generateExamples(name)}

## Accessibility
${generateA11yNotes(name)}

## Related
${generateRelatedLinks(name)}
`;
  
  fs.writeFileSync(
    path.join('docs/api/components', `${name}.md`),
    doc
  );
}
```

### Documentation Site with Nextra
```javascript
// next.config.js for documentation
const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  defaultShowCopyCode: true,
  flexsearch: {
    codeblocks: true
  },
  codeHighlight: true
});

module.exports = withNextra({
  // Documentation site config
});

// theme.config.tsx
export default {
  logo: <span>Punk Stack Documentation</span>,
  project: {
    link: 'https://github.com/yourusername/punk-stack',
  },
  docsRepositoryBase: 'https://github.com/yourusername/punk-stack/tree/main/docs',
  footer: {
    text: 'Punk Stack Documentation',
  },
  primaryHue: 330, // Cyberpunk pink
  navigation: true,
  sidebar: {
    toggleButton: true,
    defaultMenuCollapseLevel: 1,
  },
  toc: {
    float: true,
  },
  search: {
    placeholder: 'Search documentation...',
  },
  editLink: {
    text: 'Edit this page on GitHub',
  },
  feedback: {
    content: 'Question? Give us feedback →',
    labels: 'feedback',
  },
};
```

## Platform Deployment Guides

### Vercel Deployment
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "NEXT_PUBLIC_API_URL": "@api_url",
    "DATABASE_URL": "@database_url"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### Netlify Deployment
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "out"

[build.environment]
  NEXT_PUBLIC_API_URL = "https://api.example.com"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[redirects]]
  from = "/api/*"
  to = "https://api.example.com/:splat"
  status = 200
```

### Docker Deployment
```yaml
# docker-compose.production.yml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: docker/Dockerfile
      args:
        - NODE_ENV=production
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=${API_URL}
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    restart: unless-stopped
    
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./certs:/etc/nginx/certs
    depends_on:
      - app
```

## Monitoring & Analytics

### Performance Monitoring
```typescript
// lib/monitoring.ts
import { getCLS, getFID, getLCP, getFCP, getTTFB } from 'web-vitals';

export function initMonitoring() {
  // Send metrics to analytics
  function sendToAnalytics(metric: Metric) {
    // Google Analytics
    if (window.gtag) {
      window.gtag('event', metric.name, {
        value: Math.round(metric.value),
        metric_id: metric.id,
        metric_value: metric.value,
        metric_delta: metric.delta,
      });
    }
    
    // Custom analytics endpoint
    fetch('/api/metrics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metric),
    });
  }
  
  // Collect Web Vitals
  getCLS(sendToAnalytics);
  getFID(sendToAnalytics);
  getLCP(sendToAnalytics);
  getFCP(sendToAnalytics);
  getTTFB(sendToAnalytics);
}

// Error tracking
export function initErrorTracking() {
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    
    // Send to error tracking service
    fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: event.message,
        source: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
        userAgent: navigator.userAgent,
        url: window.location.href,
      }),
    });
  });
  
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    
    // Send to error tracking service
    fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'unhandledRejection',
        reason: event.reason,
        promise: String(event.promise),
        userAgent: navigator.userAgent,
        url: window.location.href,
      }),
    });
  });
}
```

## User Guides

### Getting Started Guide
```markdown
# Getting Started with Punk Stack

## Prerequisites
- Node.js 20+
- Docker (optional but recommended)
- Git

## Quick Start

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/yourusername/punk-stack.git
cd punk-stack
\`\`\`

### 2. Install dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Start development server
\`\`\`bash
npm run dev
\`\`\`

### 4. Open browser
Navigate to http://localhost:3000

## Project Structure
\`\`\`
punk-stack/
├── app/           # Next.js App Router
├── components/    # React components
│   ├── atoms/     # Basic building blocks
│   ├── molecules/ # Composite components
│   └── organisms/ # Complex components
├── lib/           # Utilities and hooks
├── public/        # Static assets
├── styles/        # Global styles
├── test/          # Test files
└── docs/          # Documentation
\`\`\`

## Available Scripts
- \`npm run dev\` - Start development server
- \`npm test\` - Run tests
- \`npm run build\` - Build for production
- \`npm run storybook\` - Start Storybook
```

## Deliverables
1. GitHub Pages deployment pipeline
2. CI/CD workflows for testing and deployment
3. Documentation site with search
4. API reference documentation
5. Platform-specific deployment guides
6. Monitoring and analytics setup
7. User guides and tutorials
8. Contributing guidelines

## References
- GitHub Actions: https://docs.github.com/en/actions
- GitHub Pages: https://docs.github.com/en/pages
- Nextra: https://nextra.site/
- Vercel Docs: https://vercel.com/docs
- Docker Best Practices: https://docs.docker.com/develop/dev-best-practices/