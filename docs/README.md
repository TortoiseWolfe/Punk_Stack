# Punk Stack

A modern design system featuring 12 distinct themes (6 punk aesthetics × 2 modes) built with Next.js, TypeScript, Tailwind CSS, and DaisyUI.

## Prerequisites

- Docker and Docker Compose
- Git

## Getting Started

This is a **Docker-first** project. All development should happen through Docker containers to ensure consistency across environments.

### Start Development Server

```bash
# Start the development environment
docker compose up dev

# Or run in background
docker compose up -d dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The application auto-updates as you edit files thanks to volume mounts and hot reload configuration.

### Other Commands

```bash
# Run tests
docker compose run --rm test

# Build production image (local testing)
docker compose --profile production up prod

# Stop all containers
docker compose down

# Rebuild containers (after dependency changes)
docker compose build dev
```

## Project Structure

- `app/` - Next.js App Router pages and layouts
- `components/` - Reusable UI components
- `lib/` - Utilities, hooks, and theme definitions
- `test/` - Test files following TDD approach
- `docker/` - Docker configuration files
- `docs/` - Project documentation

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
