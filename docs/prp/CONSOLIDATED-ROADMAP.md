# Consolidated PRP Roadmap

## ✅ COMPLETED (Infrastructure & Themes)
1. Docker-First Development 
2. Next.js 15.5.2 Setup with App Router
3. Tailwind v4 + DaisyUI v5 Integration
4. 12-Theme System (6 styles × 2 modes)
5. PWA & Offline-First Capabilities
6. Theme persistence and switching

## 🔄 ACTIVE
- **PRP-03**: Core Components (consolidates PRPs 20-27)
  - All form, layout, navigation, feedback components
  - Icon system included
  - Storybook documentation

## 📋 REMAINING QUEUE (Consolidated)

### PRP-04: Testing & Quality Infrastructure
**Consolidates**: Testing Strategy, Visual Alignment, Accessibility Standards
- Vitest unit tests (already started)
- Playwright E2E tests
- Visual regression with Chromatic
- Accessibility audit tools
- Performance testing suite

### PRP-05: Effects & Animation System
**Consolidates**: Effects System, Animation Library, Theme-specific animations
- Framer Motion integration
- Theme-specific effects (scan lines, rain, gears, etc.)
- GPU-accelerated animations
- Reduced motion support

### PRP-06: Theme and Mode Separation
**High Priority**: Improve theme UX by separating style from mode
- Separate punk style selector from light/dark toggle
- System dark mode preference detection
- Keyboard shortcuts for quick mode toggle
- Backwards compatible preference migration
- Storybook toolbar updates

### PRP-07: State Management & Data
**Consolidates**: State Management Patterns + original Data Persistence
- Context providers for global state
- IndexedDB for complex data (beyond current theme storage)
- Sync strategies
- Offline queue enhancements

### PRP-08: Performance & Optimization
**Keeps original scope**
- Bundle optimization
- Code splitting
- Lazy loading
- Lighthouse score >95

### PRP-09: Developer Experience
**Consolidates**: Developer Tooling, CLI tools
- Component generator
- Theme validator
- Development scripts
- Documentation

### PRP-10: Deployment & Documentation
**Consolidates**: GitHub Pages Deployment + Documentation site
- Static export configuration
- GitHub Actions CI/CD
- Storybook deployment
- API documentation

### PRP-11: (Reserved for future use)

### PRP-12: Font Architecture
**Lower Priority**: Theme-aware font system
- CSS variable font system
- Theme-specific font pairings
- WCAG AA compliance for all combinations
- Font loading optimization

## Critical Issues to Address

### Theme Color Audit (High Priority)
- Fix semantic color hierarchies
- Primary > Secondary visual prominence
- Consistent meaning across light/dark modes

### Storybook Setup (Part of PRP-03)
- Must run after component creation
- Theme switcher in toolbar
- All 12 variants documented

## Timeline Estimate
- **Week 1-2**: Complete PRP-03 (Components)
- **Week 3**: PRP-06 (Theme/Mode Separation) - High priority UX improvement
- **Week 4**: PRP-04 (Testing Infrastructure)
- **Week 5**: PRP-05 (Effects) 
- **Week 6**: PRP-07 (State) + PRP-08 (Performance)
- **Week 7**: PRP-09 (DevEx) + PRP-10 (Deployment)
- **Week 8**: PRP-12 (Font Architecture) - Lower priority enhancement

## Notes
- Many original PRPs are already implemented
- Consolidation reduces 37 PRPs to 11 focused deliverables
- Each consolidated PRP maintains original goals but groups related work
- Priority on completing user-facing features before tooling