# PRP-05: Effects & Animation System

## Status: QUEUED
## Created: 2025-01-08
## Priority: Medium
## Target Completion: Week 5
## Dependencies: PRP-03 (Core Components), PRP-06 (Theme/Mode Separation)

## Objective
Implement a comprehensive animation and effects system that brings each punk theme to life with unique, theme-specific visual effects, transitions, and animations while maintaining performance and accessibility.

## Consolidates
- Effects System (original PRP-28)
- Animation Library (original PRP-29)
- Theme-specific animations

## Success Criteria
- [ ] Framer Motion integrated for animations
- [ ] Theme-specific effects for all 6 punk styles
- [ ] GPU-accelerated animations (60fps)
- [ ] <5% CPU usage for ambient effects
- [ ] Reduced motion support (prefers-reduced-motion)
- [ ] Page transitions implemented
- [ ] Micro-interactions on all interactive elements
- [ ] Loading states and skeletons
- [ ] Performance budget maintained (<16ms per frame)

## Theme-Specific Effects

### Cyberpunk
- **Glitch Effects**: Random digital distortions
- **Neon Glow**: Pulsing neon borders and shadows
- **Scan Lines**: CRT-style horizontal scan lines
- **Matrix Rain**: Background digital rain effect
- **Tech Transitions**: Circuit board trace animations

### Solarpunk
- **Growth Animations**: Organic growth patterns
- **Photosynthesis**: Light absorption effects
- **Leaf Particles**: Floating leaf effects
- **Sunburst**: Radial light animations
- **Wind Sway**: Gentle swaying motions

### Steampunk
- **Gear Rotations**: Spinning gear decorations
- **Steam Puffs**: Steam emission effects
- **Brass Polish**: Metallic shine animations
- **Clockwork**: Mechanical timing movements
- **Victorian Flourishes**: Ornate border animations

### Vaporwave
- **Wave Distortion**: Wavy heat-like effects
- **Chrome Reflection**: Metallic gradient shifts
- **VHS Glitch**: Retro video artifacts
- **Palm Sway**: Tropical palm tree animations
- **Sunset Parallax**: Layered background movement

### Dieselpunk
- **Industrial Smoke**: Smokestack effects
- **Rivet Pop**: Mechanical assembly animations
- **Piston Movement**: Engine-like animations
- **Gauge Needles**: Analog meter movements
- **Art Deco Patterns**: Geometric pattern animations

### Biopunk
- **DNA Helix**: Rotating DNA strands
- **Organic Pulse**: Breathing/heartbeat effects
- **Mutation Morph**: Shape-shifting transitions
- **Toxic Glow**: Radioactive pulsing
- **Cell Division**: Splitting and merging animations

## Technical Implementation

### Animation Library Setup
```typescript
// framer-motion configuration
import { motion, AnimatePresence } from 'framer-motion';

// Theme-aware animation variants
const getThemeAnimations = (theme: PunkStyle) => {
  switch(theme) {
    case 'cyberpunk':
      return {
        glitch: {
          x: [0, -2, 2, -2, 0],
          filter: ['hue-rotate(0)', 'hue-rotate(90deg)', 'hue-rotate(0)'],
          transition: { duration: 0.3, repeat: Infinity, repeatDelay: 5 }
        },
        neonPulse: {
          boxShadow: [
            '0 0 20px rgba(255,0,255,0.5)',
            '0 0 40px rgba(0,255,255,0.8)',
            '0 0 20px rgba(255,0,255,0.5)'
          ],
          transition: { duration: 2, repeat: Infinity }
        }
      };
    case 'solarpunk':
      return {
        grow: {
          scale: [0, 1.1, 1],
          opacity: [0, 1],
          transition: { duration: 0.6, ease: 'easeOut' }
        },
        photosynthesize: {
          filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)'],
          transition: { duration: 3, repeat: Infinity }
        }
      };
    // ... other themes
  }
};
```

### Component Animation Patterns
```typescript
// Animated component wrapper
export const AnimatedCard = ({ children, theme }) => {
  const animations = getThemeAnimations(theme);
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={animations}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
};

// Micro-interaction hook
export const useThemeAnimation = (theme: PunkStyle) => {
  const reducedMotion = useReducedMotion();
  const animations = getThemeAnimations(theme);
  
  return reducedMotion ? {} : animations;
};
```

### Page Transitions
```typescript
// Route transition wrapper
export const PageTransition = ({ children, theme }) => {
  const transitions = {
    cyberpunk: { type: 'glitch', duration: 0.3 },
    solarpunk: { type: 'fade', duration: 0.5 },
    steampunk: { type: 'slide', duration: 0.4 },
    vaporwave: { type: 'wave', duration: 0.6 },
    dieselpunk: { type: 'mechanical', duration: 0.4 },
    biopunk: { type: 'morph', duration: 0.5 }
  };
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={transitions[theme]}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
```

### Performance Optimizations
```typescript
// GPU acceleration hints
const optimizedAnimation = {
  transform: 'translateZ(0)', // Force GPU layer
  willChange: 'transform', // Hint browser optimization
  backfaceVisibility: 'hidden' // Prevent flicker
};

// Reduced motion support
const useReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  
  return reducedMotion;
};
```

### CSS-based Effects
```css
/* Cyberpunk scan lines */
@keyframes scan-lines {
  0% { background-position: 0 0; }
  100% { background-position: 0 10px; }
}

.cyberpunk-scanlines {
  background-image: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 255, 255, 0.03) 2px,
    rgba(0, 255, 255, 0.03) 4px
  );
  animation: scan-lines 8s linear infinite;
}

/* Solarpunk growth */
@keyframes grow {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Steampunk gears */
@keyframes rotate-gear {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

## Animation Catalog

### Micro-interactions
- Button hover states (theme-specific)
- Input focus effects
- Toggle switches with theme animations
- Loading spinners (gear for steampunk, glitch for cyberpunk, etc.)
- Progress indicators
- Tooltips with entrance animations
- Dropdown reveals

### Macro-animations
- Page transitions
- Modal openings (theme-aware)
- Sidebar slides
- Tab switches
- Accordion expansions
- Card flips
- List reordering with drag

### Background Effects
- Parallax scrolling (vaporwave sunsets)
- Ambient particles (solarpunk leaves, cyberpunk data)
- Gradient animations
- Pattern movements
- Canvas-based effects for complex animations

## Accessibility Considerations

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Focus Management
- Maintain focus during transitions
- Announce state changes to screen readers
- Provide skip animation options
- Ensure animations don't interfere with navigation

## Performance Budget

### Metrics
- 60fps for all animations
- <16ms per frame computation
- <100ms for theme switch animations
- <5% CPU usage for ambient effects
- No layout thrashing
- Minimal repaints

### Optimization Strategies
- Use transform and opacity only
- Batch DOM updates
- Debounce rapid animations
- Lazy-load heavy effects
- Use CSS animations where possible
- RequestAnimationFrame for JS animations

## Implementation Phases

### Phase 1: Foundation (Week 1)
1. Install and configure Framer Motion
2. Create animation utility functions
3. Set up reduced motion detection
4. Implement basic transitions

### Phase 2: Theme Effects (Week 2)
1. Implement cyberpunk glitch effects
2. Add solarpunk organic animations
3. Create steampunk mechanical movements
4. Design vaporwave retro effects
5. Build dieselpunk industrial animations
6. Develop biopunk mutation effects

### Phase 3: Integration (Week 3)
1. Apply animations to all components
2. Add page transitions
3. Implement loading states
4. Create interactive demos

### Phase 4: Optimization (Week 4)
1. Performance profiling
2. GPU optimization
3. Bundle size reduction
4. Accessibility testing

## Dependencies
```json
{
  "dependencies": {
    "framer-motion": "^11.0.0",
    "lottie-react": "^2.4.0"
  },
  "devDependencies": {
    "@types/web-animations-js": "^2.2.16"
  }
}
```

## Deliverables
1. Complete animation system implementation
2. Theme-specific effect library
3. Performance optimization report
4. Accessibility compliance documentation
5. Animation usage guidelines
6. Interactive Storybook demos
7. CSS animation library
8. Canvas effect components (optional)

## References
- Framer Motion Docs: https://www.framer.com/motion/
- Web Animations API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API
- GPU Acceleration: https://web.dev/animations-guide/
- Reduced Motion: https://web.dev/prefers-reduced-motion/
- CSS Animations: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations