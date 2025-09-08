# PRP-03: Core Components

## Status: ACTIVE
## Created: 2025-09-08
## Target Completion: Week 5-6

## Objective
Build a comprehensive component library that showcases all 12 punk themes. Each component must be theme-aware, accessible, and demonstrate the unique characteristics of each punk aesthetic while maintaining consistent functionality.

## Success Criteria
- [ ] Navigation components (header, sidebar, breadcrumbs)
- [ ] Form components (inputs, buttons, selects, toggles)
- [ ] Display components (cards, modals, alerts, badges)
- [ ] Layout components (grid, container, sections)
- [ ] All components fully theme-aware
- [ ] WCAG AA accessibility compliance
- [ ] Storybook documentation for all components
- [ ] Unit tests with >90% coverage

## Component Requirements

### Navigation Components
```typescript
// Header with theme switcher integration
interface HeaderProps {
  logo?: ReactNode;
  navigation: NavItem[];
  showThemeSwitcher?: boolean;
  variant?: 'fixed' | 'sticky' | 'static';
}

// Sidebar for app navigation
interface SidebarProps {
  items: MenuItem[];
  collapsed?: boolean;
  variant?: 'overlay' | 'push' | 'permanent';
}

// Breadcrumb navigation
interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  maxItems?: number;
}
```

### Form Components
```typescript
// Text input with validation
interface InputProps {
  label: string;
  error?: string;
  hint?: string;
  variant?: 'outlined' | 'filled' | 'borderless';
  size?: 'sm' | 'md' | 'lg';
}

// Button with loading states
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

// Toggle/Switch component
interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
}
```

### Display Components
```typescript
// Card with multiple variants
interface CardProps {
  title?: string;
  subtitle?: string;
  image?: string;
  actions?: ReactNode;
  variant?: 'elevated' | 'outlined' | 'filled';
}

// Modal/Dialog
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'fullscreen';
  closeOnOverlayClick?: boolean;
}

// Alert notifications
interface AlertProps {
  type: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
  dismissible?: boolean;
  action?: ReactNode;
}

// Badge indicators
interface BadgeProps {
  variant?: 'solid' | 'outlined' | 'dot';
  color?: 'primary' | 'secondary' | 'success' | 'error';
  size?: 'sm' | 'md' | 'lg';
}
```

### Layout Components
```typescript
// Responsive grid system
interface GridProps {
  cols?: ResponsiveValue<number>;
  gap?: ResponsiveValue<number>;
  align?: 'start' | 'center' | 'end' | 'stretch';
}

// Container with max-width
interface ContainerProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: ResponsiveValue<number>;
  centered?: boolean;
}

// Section with spacing
interface SectionProps {
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'default' | 'subtle' | 'accent';
  fullHeight?: boolean;
}
```

## Theme Integration

Each component must adapt to all 12 themes:
- **Cyberpunk**: Neon outlines, glitch effects, tech patterns
- **Solarpunk**: Organic shapes, nature patterns, growth animations
- **Steampunk**: Brass borders, gear decorations, Victorian ornaments
- **Vaporwave**: Gradient backgrounds, retro patterns, wave effects
- **Dieselpunk**: Industrial edges, riveted borders, mechanical details
- **Biopunk**: Organic textures, DNA patterns, mutation effects

## Accessibility Requirements
- All interactive components keyboard navigable
- ARIA labels and roles properly implemented
- Focus indicators visible and theme-appropriate
- Color contrast meets WCAG AA standards
- Screen reader announcements for state changes
- Reduced motion alternatives for animations

## Testing Strategy
```typescript
// Unit tests for each component
describe('Button', () => {
  it('renders with correct theme classes');
  it('handles click events');
  it('shows loading state');
  it('respects disabled state');
  it('applies size variants');
});

// Accessibility tests
describe('Button A11y', () => {
  it('has proper ARIA attributes');
  it('is keyboard navigable');
  it('announces state changes');
  it('meets contrast requirements');
});

// Theme tests
describe('Button Themes', () => {
  THEMES.forEach(theme => {
    it(`renders correctly in ${theme}`);
    it(`maintains contrast in ${theme}`);
  });
});
```

## Storybook Documentation
- Component playground with all props
- Theme switcher in toolbar
- Accessibility addon enabled
- Usage examples and code snippets
- Design tokens documentation
- Responsive viewport testing

## Implementation Approach

### Phase 1: Foundation Components
1. Button, Input, Card (most used)
2. Establish component patterns
3. Set up Storybook infrastructure

### Phase 2: Navigation & Layout
1. Header, Sidebar, Breadcrumbs
2. Grid, Container, Section
3. Responsive behavior testing

### Phase 3: Advanced Components
1. Modal, Alert, Badge
2. Form validation components
3. Complex interaction patterns

### Phase 4: Polish & Documentation
1. Animation refinements
2. Accessibility audit
3. Complete Storybook stories
4. Performance optimization

## Dependencies
```json
{
  "@storybook/react": "^7.0.0",
  "@storybook/addon-a11y": "^7.0.0",
  "@testing-library/react": "^14.0.0",
  "react-aria-components": "^1.0.0",
  "framer-motion": "^11.0.0"
}
```

## References
- DaisyUI Components: https://daisyui.com/components/
- React Aria: https://react-spectrum.adobe.com/react-aria/
- Storybook Best Practices: https://storybook.js.org/docs/
- PRP-01: Theme System (for theme integration)
- PRP-02: PWA (for offline component behavior)