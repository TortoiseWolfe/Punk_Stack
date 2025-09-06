# Project Setup Order of Operations

## IMPORTANT: Correct sequence for new Next.js projects

1. **Create Next.js app FIRST** - This needs an empty folder or will create one
   - `npx create-next-app@latest` generates package.json, tsconfig, and structure
   - Don't manually create package.json before this step

2. **Install additional dependencies** - After Next.js setup
   - Testing libraries (Vitest, Testing Library)
   - Additional UI libraries (DaisyUI)
   - Dev dependencies

3. **Configure environment** - After dependencies installed
   - Test configuration
   - TypeScript config adjustments
   - Tailwind/PostCSS config

4. **Implement code** - Following TDD
   - Tests first (already written)
   - Minimal implementation to pass tests
   - Refactor while keeping tests green

## Common Mistake to Avoid
❌ Creating package.json manually before running create-next-app
✅ Let create-next-app generate the initial project structure