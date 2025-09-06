# Punk Stack API Documentation

## Theme System API

### Theme Type Definitions

```typescript
type PunkStyle = 'cyberpunk' | 'solarpunk' | 'steampunk';

type CyberpunkTheme = 'neon-noir' | 'matrix-green' | 'blade-runner' | 'ghost-shell';
type SolarpunkTheme = 'forest-canopy' | 'ocean-bloom' | 'desert-oasis' | 'sky-garden';
type SteampunkTheme = 'brass-copper' | 'victorian-noir' | 'clockwork-bronze' | 'industrial-iron';

type ThemeName = CyberpunkTheme | SolarpunkTheme | SteampunkTheme;

interface Theme {
  name: ThemeName;
  style: PunkStyle;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    neutral: string;
    base100: string;
    base200: string;
    base300: string;
    info: string;
    success: string;
    warning: string;
    error: string;
  };
  fonts: {
    heading: string;
    body: string;
    mono: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  animations: {
    transition: string;
    duration: string;
    easing: string;
  };
}
```

### Theme Context API

```typescript
interface ThemeContextValue {
  theme: Theme;
  themeName: ThemeName;
  setTheme: (theme: ThemeName) => void;
  availableThemes: ThemeName[];
  isLoading: boolean;
  error: Error | null;
}

function useTheme(): ThemeContextValue;
```

### ThemeProvider Props

```typescript
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeName;
  storageKey?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}
```

## Component APIs

### ThemeSwitcher

```typescript
interface ThemeSwitcherProps {
  /** Display variant of the switcher */
  variant?: 'dropdown' | 'grid' | 'inline';
  /** Show theme preview on hover */
  showPreview?: boolean;
  /** Group themes by punk style */
  grouped?: boolean;
  /** Custom class name */
  className?: string;
  /** Callback when theme changes */
  onThemeChange?: (theme: ThemeName) => void;
  /** Show theme descriptions */
  showDescriptions?: boolean;
  /** Accessible label */
  ariaLabel?: string;
}

function ThemeSwitcher(props: ThemeSwitcherProps): JSX.Element;
```

### Card

```typescript
interface CardProps {
  /** Card variant */
  variant?: 'default' | 'bordered' | 'elevated' | 'glass';
  /** Card size */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Interactive card */
  interactive?: boolean;
  /** Card content */
  children: React.ReactNode;
  /** Header content */
  header?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Click handler */
  onClick?: () => void;
  /** Additional HTML attributes */
  [key: string]: any;
}

function Card(props: CardProps): JSX.Element;
```

### Button

```typescript
interface ButtonProps {
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'link';
  /** Button size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Full width button */
  fullWidth?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
  /** Icon before text */
  startIcon?: React.ReactNode;
  /** Icon after text */
  endIcon?: React.ReactNode;
  /** Button content */
  children: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Render as link */
  href?: string;
  /** Additional HTML attributes */
  [key: string]: any;
}

function Button(props: ButtonProps): JSX.Element;
```

### Input

```typescript
interface InputProps {
  /** Input variant */
  variant?: 'default' | 'bordered' | 'ghost' | 'filled';
  /** Input size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Input type */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  /** Input label */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Helper text */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Success message */
  success?: string;
  /** Required field */
  required?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Read-only state */
  readOnly?: boolean;
  /** Input value */
  value?: string;
  /** Default value */
  defaultValue?: string;
  /** Change handler */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Blur handler */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Focus handler */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Icon before input */
  startAdornment?: React.ReactNode;
  /** Icon after input */
  endAdornment?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Input name */
  name?: string;
  /** Input id */
  id?: string;
  /** Additional HTML attributes */
  [key: string]: any;
}

function Input(props: InputProps): JSX.Element;
```

### Modal

```typescript
interface ModalProps {
  /** Modal open state */
  open: boolean;
  /** Close handler */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Modal size */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Close on backdrop click */
  closeOnBackdropClick?: boolean;
  /** Close on escape key */
  closeOnEscape?: boolean;
  /** Show close button */
  showCloseButton?: boolean;
  /** Modal content */
  children: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Backdrop class name */
  backdropClassName?: string;
  /** Animation variant */
  animation?: 'fade' | 'slide' | 'zoom' | 'none';
}

function Modal(props: ModalProps): JSX.Element | null;
```

### Navigation

```typescript
interface NavigationProps {
  /** Logo element */
  logo?: React.ReactNode;
  /** Navigation items */
  items: NavigationItem[];
  /** Show theme switcher */
  showThemeSwitcher?: boolean;
  /** Sticky navigation */
  sticky?: boolean;
  /** Transparent background */
  transparent?: boolean;
  /** Custom class name */
  className?: string;
  /** Mobile menu variant */
  mobileVariant?: 'drawer' | 'dropdown' | 'fullscreen';
}

interface NavigationItem {
  /** Item label */
  label: string;
  /** Item href */
  href?: string;
  /** Click handler */
  onClick?: () => void;
  /** Active state */
  active?: boolean;
  /** Nested items */
  items?: NavigationItem[];
  /** Item icon */
  icon?: React.ReactNode;
}

function Navigation(props: NavigationProps): JSX.Element;
```

### Hero

```typescript
interface HeroProps {
  /** Hero title */
  title: string;
  /** Hero subtitle */
  subtitle?: string;
  /** Hero description */
  description?: string;
  /** Call-to-action buttons */
  actions?: React.ReactNode;
  /** Background image */
  backgroundImage?: string;
  /** Background overlay */
  overlay?: boolean;
  /** Hero height */
  height?: 'sm' | 'md' | 'lg' | 'full';
  /** Content alignment */
  align?: 'left' | 'center' | 'right';
  /** Custom class name */
  className?: string;
  /** Additional content */
  children?: React.ReactNode;
}

function Hero(props: HeroProps): JSX.Element;
```

### Grid

```typescript
interface GridProps {
  /** Number of columns */
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  /** Responsive columns */
  colsSm?: number;
  colsMd?: number;
  colsLg?: number;
  colsXl?: number;
  /** Gap between items */
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Align items */
  align?: 'start' | 'center' | 'end' | 'stretch';
  /** Justify items */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  /** Grid items */
  children: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Additional HTML attributes */
  [key: string]: any;
}

function Grid(props: GridProps): JSX.Element;
```

## Utility Functions

### Theme Utilities

```typescript
/** Get theme by name */
function getTheme(name: ThemeName): Theme;

/** Get all themes for a punk style */
function getThemesByStyle(style: PunkStyle): Theme[];

/** Apply theme to DOM */
function applyTheme(theme: Theme): void;

/** Generate CSS variables from theme */
function generateCSSVariables(theme: Theme): string;

/** Validate theme structure */
function validateTheme(theme: unknown): theme is Theme;

/** Get contrast ratio between colors */
function getContrastRatio(color1: string, color2: string): number;

/** Check if theme meets WCAG AA */
function meetsWCAGAA(theme: Theme): boolean;
```

### Storage Utilities

```typescript
/** Save theme to localStorage */
function saveTheme(theme: ThemeName): void;

/** Load theme from localStorage */
function loadTheme(): ThemeName | null;

/** Clear saved theme */
function clearTheme(): void;

/** Subscribe to storage changes */
function subscribeToThemeChanges(callback: (theme: ThemeName) => void): () => void;
```

### Animation Utilities

```typescript
/** Transition between themes */
function transitionTheme(from: Theme, to: Theme, duration?: number): Promise<void>;

/** Preload theme assets */
function preloadTheme(theme: ThemeName): Promise<void>;

/** Get transition CSS */
function getTransitionStyles(duration: number): string;
```

## Hooks

### useTheme
```typescript
function useTheme(): ThemeContextValue;
```

### useLocalStorage
```typescript
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void];
```

### useMediaQuery
```typescript
function useMediaQuery(query: string): boolean;
```

### usePreferredTheme
```typescript
function usePreferredTheme(): 'light' | 'dark' | null;
```

### useThemeTransition
```typescript
function useThemeTransition(): {
  transitioning: boolean;
  startTransition: (callback: () => void) => void;
};
```

## Constants

```typescript
/** All available themes */
export const THEMES: Record<ThemeName, Theme>;

/** Theme groups by style */
export const THEME_GROUPS: Record<PunkStyle, Theme[]>;

/** Default theme */
export const DEFAULT_THEME: ThemeName = 'neon-noir';

/** Storage key for theme */
export const THEME_STORAGE_KEY = 'punk-stack-theme';

/** Theme transition duration */
export const THEME_TRANSITION_MS = 100;

/** Breakpoints */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};
```