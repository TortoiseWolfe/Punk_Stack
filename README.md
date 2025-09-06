# Punk Stack

A modern design system featuring six punk aesthetics with light/dark modes, built on Next.js 15, Tailwind CSS 4, and DaisyUI 5.

## Project Structure

```
/
├── docker/            # Docker configuration
│   ├── Dockerfile     # Production multi-stage build
│   ├── Dockerfile.dev # Development configuration
│   └── .dockerignore  # Build context exclusions
├── docs/              # Documentation
│   ├── prp/          # Punk Rock Prompts (specifications)
│   │   ├── active/   # Current implementation specs
│   │   └── archive/  # Completed specs
│   ├── decisions/    # Architecture Decision Records
│   └── learnings/    # Lessons learned
├── test/             # Test suite (TDD approach)
├── public/           # Static assets
└── src/              # Implementation (coming soon)
```

## PRP Workflow

This project uses PRPs (Punk Rock Prompts) as temporary specifications that guide implementation:

1. **Active PRPs** in `/docs/prp/active/` define current work
2. **Implementation** follows PRP specifications
3. **Tests** validate PRP requirements
4. **Archive** completed PRPs to `/docs/prp/archive/`
5. **Documentation** lives in code, tests, and comments

## Themes

6 punk aesthetics × 2 modes = 12 total themes:
- **Cyberpunk**: Neon Day / Neon Noir
- **Solarpunk**: Solar Bloom / Forest Canopy
- **Steampunk**: Brass Copper / Victorian Noir
- **Vaporwave**: Miami Sunrise / Retro Night
- **Dieselpunk**: Art Deco / Noir Industrial
- **Biopunk**: Lab Bright / Toxic Glow

## Tech Stack

- **Next.js 15.5+** - React framework with App Router
- **React 19+** - UI library
- **Tailwind CSS 4.1+** - Utility-first CSS
- **DaisyUI 5+** - Component library
- **TypeScript 5+** - Type safety
- **Vitest 3+** - Testing framework

## Development Approach

Following strict TDD (Test-Driven Development):
1. Tests are written first (currently all failing)
2. Implementation follows to make tests pass
3. Documentation rotates into code

## Getting Started

### Docker-First Development (Recommended)

```bash
# 1. Start Docker environment
docker compose up dev

# 2. In a new terminal, create Next.js app (first time only)
docker compose run --rm dev npx create-next-app@latest . --typescript --tailwind --app

# 3. Install additional dependencies
docker compose run --rm dev npm install daisyui@latest vitest@latest @testing-library/react@latest

# 4. Run tests
docker compose run --rm test

# 5. Access development server
# http://localhost:3000
```

### Local Development (Alternative)

```bash
# 1. Create Next.js app (generates package.json)
npx create-next-app@latest . --typescript --tailwind --app

# 2. Install additional dependencies
npm install daisyui@latest vitest@latest @testing-library/react@latest

# 3. Run tests
npm test

# 4. Start development
npm run dev
```

## Deployment

### GitHub Pages

The project is configured for automatic deployment to GitHub Pages:

1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. Push to main branch to trigger deployment
4. Access at: `https://[username].github.io/Punk_Stack`

### Docker Production Build

```bash
# Build production image
docker build -f docker/Dockerfile -t punk-stack:latest .

# Run production container
docker run -p 3000:3000 punk-stack:latest

# Or use docker-compose
docker compose --profile production up
```
