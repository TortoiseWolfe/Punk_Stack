# PRP-12: Font Architecture

## Status: QUEUED
## Created: 2025-01-09
## Priority: Low
## Target Completion: Week 8
## Dependencies: PRP-06 (Theme/Mode Separation)

## Objective
Implement a comprehensive font system that provides theme-specific typography pairings, ensuring readability, aesthetic consistency, and WCAG AA compliance across all punk themes and color combinations.

## Success Criteria
- [ ] CSS variable-based font system implemented
- [ ] Theme-specific font pairings for all 6 punk styles
- [ ] WCAG AA contrast compliance for all text
- [ ] Font loading optimization (<3s total load time)
- [ ] Fallback font stack for each theme
- [ ] Variable font support where applicable
- [ ] Font size scale system (8-point scale)
- [ ] Responsive typography implemented

## Theme Font Pairings

### Cyberpunk
- **Display**: Orbitron (tech, futuristic)
- **Body**: Space Mono (monospace, digital)
- **Accent**: Rajdhani (angular, sharp)
- **Fallback**: system-ui, monospace

### Solarpunk
- **Display**: Comfortaa (organic, rounded)
- **Body**: Open Sans (clean, readable)
- **Accent**: Amatic SC (handwritten, natural)
- **Fallback**: system-ui, sans-serif

### Steampunk
- **Display**: Playfair Display (Victorian, serif)
- **Body**: Merriweather (classic, readable)
- **Accent**: Cinzel (engraved, decorative)
- **Fallback**: Georgia, serif

### Vaporwave
- **Display**: Bebas Neue (bold, retro)
- **Body**: Work Sans (clean, geometric)
- **Accent**: Monoton (neon sign style)
- **Fallback**: Arial, sans-serif

### Dieselpunk
- **Display**: Oswald (industrial, condensed)
- **Body**: Roboto Slab (mechanical, sturdy)
- **Accent**: Teko (tall, bold)
- **Fallback**: Georgia, serif

### Biopunk
- **Display**: Creepster (organic, mutated)
- **Body**: Fira Sans (technical, clean)
- **Accent**: Bungee (bold, experimental)
- **Fallback**: Helvetica, sans-serif

## Technical Implementation

### CSS Variable System
```css
:root {
  /* Font families */
  --font-display: var(--theme-font-display);
  --font-body: var(--theme-font-body);
  --font-accent: var(--theme-font-accent);
  --font-mono: var(--theme-font-mono);
  
  /* Font sizes - 8-point scale */
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
  --text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
  --text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
  --text-2xl: clamp(1.5rem, 1.3rem + 1vw, 2rem);
  --text-3xl: clamp(2rem, 1.7rem + 1.5vw, 2.5rem);
  --text-4xl: clamp(2.5rem, 2rem + 2.5vw, 3.5rem);
  
  /* Line heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
  
  /* Letter spacing */
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  
  /* Font weights */
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-black: 900;
}

/* Theme-specific font definitions */
[data-theme="neon-noir"] {
  --theme-font-display: 'Orbitron', var(--font-fallback-sans);
  --theme-font-body: 'Space Mono', var(--font-fallback-mono);
  --theme-font-accent: 'Rajdhani', var(--font-fallback-sans);
  --theme-font-mono: 'Space Mono', monospace;
}

[data-theme="solar-bloom"] {
  --theme-font-display: 'Comfortaa', var(--font-fallback-sans);
  --theme-font-body: 'Open Sans', var(--font-fallback-sans);
  --theme-font-accent: 'Amatic SC', var(--font-fallback-cursive);
  --theme-font-mono: 'Fira Code', monospace;
}
/* ... other themes */
```

### Font Loading Strategy
```typescript
// Progressive font loading with FOUT prevention
const loadFonts = async (theme: PunkStyle) => {
  const fontConfig = {
    cyberpunk: [
      { family: 'Orbitron', weights: [400, 700, 900] },
      { family: 'Space Mono', weights: [400, 700] },
      { family: 'Rajdhani', weights: [400, 600] }
    ],
    solarpunk: [
      { family: 'Comfortaa', weights: [400, 700] },
      { family: 'Open Sans', weights: [400, 600, 700] },
      { family: 'Amatic SC', weights: [400, 700] }
    ],
    // ... other themes
  };
  
  const fonts = fontConfig[theme];
  const fontPromises = fonts.map(font => {
    return Promise.all(
      font.weights.map(weight => 
        document.fonts.load(`${weight} 1em ${font.family}`)
      )
    );
  });
  
  await Promise.all(fontPromises);
};

// Font loading hook
export const useThemeFonts = (theme: PunkStyle) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  useEffect(() => {
    loadFonts(theme).then(() => setFontsLoaded(true));
  }, [theme]);
  
  return fontsLoaded;
};
```

### Typography Components
```typescript
// Typography component with theme awareness
export const Typography = ({ 
  variant = 'body',
  size = 'base',
  weight = 'normal',
  children,
  className = ''
}) => {
  const fontFamily = `var(--font-${variant})`;
  const fontSize = `var(--text-${size})`;
  const fontWeight = `var(--font-${weight})`;
  
  return (
    <span 
      className={className}
      style={{
        fontFamily,
        fontSize,
        fontWeight,
        lineHeight: 'var(--leading-normal)'
      }}
    >
      {children}
    </span>
  );
};
```

## Accessibility Requirements

### Contrast Ratios
- Normal text: 4.5:1 minimum (WCAG AA)
- Large text: 3:1 minimum (WCAG AA)
- Enhanced contrast mode: 7:1 (WCAG AAA)

### Readability
```css
/* Minimum font sizes */
body {
  font-size: max(1rem, 16px); /* Never below 16px */
}

/* Maximum line length for readability */
.text-content {
  max-width: 65ch; /* Optimal reading length */
}

/* Adequate line spacing */
p {
  line-height: 1.6; /* Comfortable reading */
}
```

### Font Loading Performance
```html
<!-- Preconnect to font providers -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Preload critical fonts -->
<link rel="preload" href="/fonts/orbitron-v25-latin-regular.woff2" 
      as="font" type="font/woff2" crossorigin>
```

## Responsive Typography

### Fluid Type Scale
```css
/* Responsive font sizing using clamp() */
h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1.2;
}

h2 {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  line-height: 1.3;
}

p {
  font-size: clamp(1rem, 2vw, 1.125rem);
  line-height: 1.6;
}

/* Breakpoint adjustments */
@media (min-width: 768px) {
  :root {
    --text-scale: 1.125;
  }
}

@media (min-width: 1024px) {
  :root {
    --text-scale: 1.25;
  }
}
```

## Font Optimization

### Variable Fonts
```css
/* Use variable fonts where available */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Variable.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-display: swap;
}
```

### Subsetting
```javascript
// Font subsetting for performance
const fontSubsets = {
  latin: 'U+0000-00FF',
  latinExt: 'U+0100-024F',
  numbers: 'U+0030-0039'
};
```

### Font Display Strategy
```css
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/custom.woff2') format('woff2');
  font-display: swap; /* Show fallback immediately */
}
```

## Implementation Phases

### Phase 1: Foundation
1. Set up CSS variable system
2. Import Google Fonts
3. Create typography scale
4. Implement responsive sizing

### Phase 2: Theme Integration
1. Map fonts to each punk theme
2. Create font loading strategy
3. Implement Typography component
4. Add font weight variations

### Phase 3: Optimization
1. Implement font subsetting
2. Add variable font support
3. Optimize loading performance
4. Create fallback strategies

### Phase 4: Testing
1. Test all theme/font combinations
2. Verify WCAG compliance
3. Performance testing
4. Cross-browser testing

## Dependencies
```json
{
  "dependencies": {
    "@fontsource/orbitron": "^5.0.0",
    "@fontsource/space-mono": "^5.0.0",
    "@fontsource/playfair-display": "^5.0.0",
    "@fontsource/merriweather": "^5.0.0",
    "@fontsource/bebas-neue": "^5.0.0",
    "@fontsource/oswald": "^5.0.0",
    "@fontsource/creepster": "^5.0.0",
    "@fontsource/fira-sans": "^5.0.0"
  }
}
```

## Deliverables
1. Complete font system implementation
2. Theme-specific typography guidelines
3. WCAG compliance report
4. Performance metrics documentation
5. Typography component library
6. Font loading optimization strategy
7. Storybook typography showcase

## References
- Variable Fonts: https://web.dev/variable-fonts/
- Font Loading: https://web.dev/font-best-practices/
- WCAG Typography: https://www.w3.org/WAI/WCAG21/Understanding/text-spacing.html
- Fluid Typography: https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/