# Project Setup Order of Operations

## IMPORTANT: Docker-First Development

### Correct sequence for new Next.js projects:

1. **Set up Docker environment FIRST**
   - `docker compose up -d` - Ensures consistent development environment
   - All developers use same Node version, dependencies, and config

2. **Create Next.js app** - Inside Docker container or local
   - `npx create-next-app@latest` generates package.json, tsconfig, and structure
   - Run in empty directory or specify new directory name
   - NEVER manually create package.json before this step

3. **Install additional dependencies** - After Next.js setup
   - Testing libraries (Vitest, Testing Library)
   - UI libraries (DaisyUI)
   - Dev dependencies

4. **Configure environment** - After dependencies installed
   - Test configuration
   - TypeScript config adjustments
   - Tailwind/PostCSS config

5. **Implement code** - Following TDD
   - Tests first (already written)
   - Minimal implementation to pass tests
   - Refactor while keeping tests green

## Common Mistakes to Avoid
❌ Creating package.json manually before running create-next-app
❌ Installing dependencies before Docker setup
❌ Skipping Docker and having version mismatches
✅ Docker first, then create-next-app, then additional deps

## Docker Best Practices (Bret Fisher's Recommendations)

### Multi-Stage Builds
- Use multi-stage builds to minimize production image size
- Separate build dependencies from runtime dependencies
- Copy only necessary artifacts to final stage

### Security Best Practices
- **Always run as non-root user** (use 'node' user in Node images)
- Set USER directive before WORKDIR for proper permissions
- Use `npm ci` instead of `npm install` in production
- Never use npm/yarn in CMD - call node directly

### Performance Optimizations
- Use Alpine Linux for smaller images
- Leverage Docker layer caching effectively
- Order Dockerfile commands from least to most frequently changing
- Use .dockerignore to exclude unnecessary files

### Production Readiness
- Include HEALTHCHECK for container orchestration
- Set NODE_ENV=production explicitly
- Disable telemetry in production
- Use standalone output for Next.js optimization

Reference: https://github.com/BretFisher/node-docker-good-defaults

## GitHub Pages Deployment

### Configuration Requirements
1. Set `output: 'export'` in next.config.js
2. Configure basePath for repository name
3. Disable image optimization for static export
4. Include .nojekyll file in public directory

### Deployment Process
- GitHub Actions workflow handles build and deployment
- Triggers on push to main branch
- Builds static export with `GITHUB_PAGES=true` environment variable
- Deploys to GitHub Pages using official actions

## Important Reminders
- Do what has been asked; nothing more, nothing less
- NEVER create files unless absolutely necessary
- ALWAYS prefer editing existing files over creating new ones
- Only create documentation when explicitly requested