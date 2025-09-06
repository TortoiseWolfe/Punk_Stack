# Punk Stack Architecture

## System Design Principles

### Core Principles
1. **Test-Driven Development**: Tests define behavior before implementation
2. **Documentation-First**: Documentation drives development decisions
3. **Component Composition**: Small, composable components over monoliths
4. **Theme Agnostic**: Components work with any theme configuration
5. **Performance First**: Sub-100ms theme switching is non-negotiable
6. **Accessibility Built-in**: A11y is not an afterthought

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                     Application Layer                     │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │    Pages    │  │   Layouts    │  │   Features   │  │
│  └─────────────┘  └──────────────┘  └──────────────┘  │
├─────────────────────────────────────────────────────────┤
│                    Component Layer                        │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │     UI      │  │   Compound   │  │   Provider   │  │
│  │ Components  │  │  Components  │  │  Components  │  │
│  └─────────────┘  └──────────────┘  └──────────────┘  │
├─────────────────────────────────────────────────────────┤
│                      Theme Layer                          │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │    Theme    │  │    Theme     │  │     CSS      │  │
│  │  Provider   │  │  Definitions │  │  Variables   │  │
│  └─────────────┘  └──────────────┘  └──────────────┘  │
├─────────────────────────────────────────────────────────┤
│                    Foundation Layer                       │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Next.js 15 │  │ Tailwind CSS │  │  DaisyUI 5   │  │
│  │  App Router │  │      4.1     │  │  Components  │  │
│  └─────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## Directory Structure

```
punk-stack/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with theme provider
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles and CSS variables
│
├── components/              # Component library
│   ├── ui/                 # Base UI components
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   └── index.ts
│   │   ├── Card/
│   │   ├── Input/
│   │   └── Modal/
│   │
│   ├── theme/              # Theme-specific components
│   │   ├── ThemeSwitcher/
│   │   └── ThemeProvider/
│   │
│   └── layout/             # Layout components
│       ├── Navigation/
│       ├── Hero/
│       └── Grid/
│
├── lib/                    # Core utilities
│   ├── themes/            # Theme definitions
│   │   ├── cyberpunk.ts
│   │   ├── solarpunk.ts
│   │   └── steampunk.ts
│   │
│   ├── hooks/             # Custom React hooks
│   │   ├── useTheme.ts
│   │   └── useLocalStorage.ts
│   │
│   └── utils/             # Utility functions
│       ├── theme.ts
│       └── storage.ts
│
├── test/                  # Test files
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   └── fixtures/
│
├── docs/                  # Documentation
│   ├── REQUIREMENTS.md
│   ├── TEST_PLAN.md
│   ├── API.md
│   └── ARCHITECTURE.md
│
└── public/               # Static assets
    └── fonts/           # Theme-specific fonts
```

## Component Architecture

### Component Design Patterns

#### 1. Compound Components
```typescript
// Complex components expose sub-components
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>
```

#### 2. Render Props
```typescript
// Flexible rendering with render props
<ThemeProvider
  render={({ theme, setTheme }) => (
    <App theme={theme} onThemeChange={setTheme} />
  )}
/>
```

#### 3. Composition Over Configuration
```typescript
// Prefer composition
<Button startIcon={<Icon />}>Click</Button>

// Over configuration
<Button icon="star" iconPosition="start">Click</Button>
```

### Component Hierarchy

```
ThemeProvider (Context)
  └── Layout
      ├── Navigation
      │   └── ThemeSwitcher
      └── Page
          ├── Hero
          └── Grid
              ├── Card
              └── Button
```

## Theme System Architecture

### Theme Resolution Flow

```
User Selection → localStorage → Theme Context → CSS Variables → Component Styles
       ↑                ↓              ↓              ↓              ↓
   Tab Sync ← Storage Event ← State Update ← DOM Update ← Style Application
```

### CSS Variable Strategy

```css
:root {
  /* Base theme variables */
  --color-primary: theme('colors.primary');
  --color-secondary: theme('colors.secondary');
  
  /* Computed variables */
  --color-primary-focus: color-mix(in srgb, var(--color-primary) 80%, white);
  
  /* Component-specific */
  --button-radius: theme('borderRadius.lg');
  --card-shadow: theme('boxShadow.xl');
}

[data-theme="neon-noir"] {
  --color-primary: #ff00ff;
  --color-secondary: #00ffff;
}
```

### Theme Switching Mechanism

1. **User triggers theme change**
2. **Validate new theme exists**
3. **Start transition (disable animations)**
4. **Update data-theme attribute**
5. **Update CSS variables**
6. **Save to localStorage**
7. **Broadcast to other tabs**
8. **Complete transition**
9. **Re-enable animations**

## State Management

### Context Architecture

```typescript
interface AppState {
  theme: ThemeState;
  ui: UIState;
  user: UserState;
}

interface ThemeState {
  current: ThemeName;
  available: ThemeName[];
  isTransitioning: boolean;
}
```

### State Flow

```
Component Action → Hook → Context → Storage
                    ↓        ↓         ↓
              Local State  Global  Persistent
```

## Performance Architecture

### Optimization Strategies

#### 1. CSS Variables for Instant Updates
- No JavaScript re-execution
- Browser-native performance
- GPU-accelerated transitions

#### 2. Lazy Loading Non-Critical Themes
```typescript
// Load theme assets on demand
const loadTheme = async (theme: ThemeName) => {
  const module = await import(`@/lib/themes/${theme}`);
  return module.default;
};
```

#### 3. Preload Next Theme
```typescript
// Predictive loading
const preloadAdjacentThemes = (current: ThemeName) => {
  const themes = getAdjacentThemes(current);
  themes.forEach(theme => preloadTheme(theme));
};
```

### Bundle Strategy

```
Main Bundle (< 50KB)
  ├── Core Components
  ├── Default Theme
  └── Theme System

Lazy Bundles
  ├── Additional Themes (per theme ~5KB)
  ├── Icon Sets
  └── Animation Libraries
```

## Testing Architecture

### Test Pyramid

```
         /\          E2E Tests (10%)
        /  \         - Critical paths
       /    \        - User journeys
      /──────\       
     /        \      Integration Tests (30%)
    /          \     - Component interactions
   /            \    - Theme switching
  /──────────────\   
 /                \  Unit Tests (60%)
/                  \ - Components
────────────────────  - Hooks
                     - Utilities
```

### Test Execution Flow

```
1. Pre-commit → Lint + Type Check
2. Pre-push → Unit Tests
3. PR → Full Test Suite
4. Main → E2E + Deploy
```

## Security Architecture

### Security Layers

1. **Input Sanitization**: All user inputs sanitized
2. **CSP Headers**: Strict Content Security Policy
3. **XSS Protection**: React's built-in escaping
4. **CSRF Tokens**: For theme preference API
5. **Secure Storage**: HttpOnly cookies option

### Theme Injection Prevention

```typescript
// Validate theme before applying
const applyTheme = (theme: unknown) => {
  if (!validateTheme(theme)) {
    throw new Error('Invalid theme structure');
  }
  // Apply validated theme
};
```

## Deployment Architecture

### Build Pipeline

```
Source Code → TypeScript Compilation → Bundle → Optimize → Deploy
     ↓              ↓                    ↓         ↓         ↓
  Type Check    Tree Shaking      Code Split   Minify   CDN Push
```

### Environment Strategy

```
Development
  ├── Hot Reload
  ├── Source Maps
  └── Debug Tools

Staging
  ├── Production Build
  ├── Test Data
  └── Preview Features

Production
  ├── Optimized Build
  ├── CDN Assets
  └── Error Tracking
```

## Monitoring Architecture

### Metrics Collection

```typescript
interface PerformanceMetrics {
  themeSwitch: {
    duration: number;
    timestamp: number;
    from: ThemeName;
    to: ThemeName;
  };
  pageLoad: {
    fcp: number;
    lcp: number;
    cls: number;
    tti: number;
  };
}
```

### Error Tracking

```typescript
interface ErrorBoundary {
  fallback: ComponentType;
  onError: (error: Error, errorInfo: ErrorInfo) => void;
  resetKeys?: Array<string | number>;
  resetOnPropsChange?: boolean;
}
```

## Scalability Considerations

### Horizontal Scaling
- **Component Library**: Publishable as npm package
- **Theme Marketplace**: Community themes support
- **Multi-framework**: Adaptable to Vue/Angular

### Vertical Scaling
- **Custom Themes**: User-created themes
- **Theme Builder**: Visual theme editor
- **A11y Variants**: High contrast versions
- **Animation Library**: Theme-specific animations

## Migration Path

### From Existing Codebase
1. Install dependencies
2. Wrap app in ThemeProvider
3. Migrate components gradually
4. Update styles to use CSS variables
5. Add theme switcher
6. Remove old theme system

### Version Upgrade Strategy
- Semantic versioning
- Backward compatibility for 2 major versions
- Migration guides for breaking changes
- Codemods for automatic updates

## Decision Records

### ADR-001: CSS Variables over CSS-in-JS
**Decision**: Use CSS variables for theming
**Rationale**: Better performance, no runtime overhead
**Consequences**: Less dynamic, but faster

### ADR-002: DaisyUI over Material-UI
**Decision**: Build on DaisyUI
**Rationale**: Lighter weight, better customization
**Consequences**: Less out-of-box components

### ADR-003: App Router over Pages Router
**Decision**: Use Next.js 15 App Router
**Rationale**: Better layouts, streaming, server components, Turbopack support
**Consequences**: Latest API, growing community resources

### ADR-004: Vitest 3 over Jest
**Decision**: Use Vitest 3 for testing
**Rationale**: 100x faster incremental builds, better TypeScript support, Vite integration
**Consequences**: Modern API, growing plugin ecosystem