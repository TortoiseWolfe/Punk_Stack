# PRP-07: Theme and Mode Separation

## Status: QUEUED
## Created: 2025-01-09
## Priority: High
## Dependencies: PRP-01 (Theme System - Completed)

## Objective
Refactor the theme system to separate punk style selection from light/dark mode, providing a more intuitive user experience and better alignment with standard UI patterns.

## Current Problem
- 12 combined themes (6 styles × 2 modes) presented as a single choice
- Users must understand that "Cyberpunk Day" and "Cyberpunk Night" are related
- No quick toggle for light/dark mode
- Cannot leverage system dark mode preferences
- Cognitive overload with 12 options in a single dropdown

## Success Criteria
- [ ] Punk style (6 options) selectable independently from mode
- [ ] Light/Dark mode toggle separate from style selection
- [ ] System dark mode preference detection and respect
- [ ] Keyboard shortcut for quick mode toggle
- [ ] Maintain all existing 12 theme combinations
- [ ] Update Storybook controls to reflect separation
- [ ] Backwards compatible with saved theme preferences

## Technical Requirements

### Theme Context Refactor
```typescript
interface ThemeContextType {
  punkStyle: PunkStyle; // 'cyberpunk' | 'solarpunk' | etc.
  mode: ThemeMode; // 'light' | 'dark'
  setPunkStyle: (style: PunkStyle) => void;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  systemPreference: ThemeMode | null; // Detected system preference
  useSystemPreference: boolean; // Whether to follow system
}
```

### UI Components

#### Option 1: Separate Controls
- Style dropdown with 6 punk aesthetics
- Mode toggle button/switch for light/dark
- System preference checkbox

#### Option 2: Enhanced Dropdown
- Main dropdown sections:
  - Punk Style (6 radio options)
  - Appearance Mode (Light/Dark/System)
- Visual preview of current combination

### Storage Strategy
```javascript
// Migrate from single theme string to composite
localStorage.setItem('punk-stack-style', 'cyberpunk');
localStorage.setItem('punk-stack-mode', 'dark');
localStorage.setItem('punk-stack-use-system', 'false');

// Backwards compatibility
const legacyTheme = localStorage.getItem('punk-stack-theme');
if (legacyTheme) {
  // Parse 'neon-noir' -> style: 'cyberpunk', mode: 'dark'
  migrateThemePreference(legacyTheme);
}
```

### System Preference Detection
```javascript
// Watch for system dark mode changes
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
mediaQuery.addEventListener('change', (e) => {
  if (useSystemPreference) {
    setMode(e.matches ? 'dark' : 'light');
  }
});
```

### Keyboard Shortcuts
- `Ctrl+Shift+D` or `Cmd+Shift+D`: Toggle dark/light mode
- `Ctrl+Shift+T` or `Cmd+Shift+T`: Open theme selector

## Implementation Plan

### Phase 1: Context Refactor
1. Update `ThemeContext.tsx` with separated state
2. Add system preference detection
3. Implement preference migration
4. Maintain backwards compatibility

### Phase 2: UI Updates
1. Create new `ThemeControls` component
2. Add mode toggle button
3. Update existing `ThemeSwitcher` dropdown
4. Add keyboard shortcuts

### Phase 3: Storybook Integration
1. Add separate toolbar controls for style and mode
2. Update preview decorator
3. Ensure all stories work with new system

### Phase 4: Testing & Polish
1. Test preference migration
2. Verify all 12 combinations still work
3. Test system preference following
4. Add animations for smooth transitions
5. Update documentation

## UI/UX Considerations

### Visual Design
- Mode toggle: Sun/Moon icon button
- Style selector: Dropdown with theme previews
- Clear visual feedback for current selection
- Smooth transitions between modes

### Accessibility
- ARIA labels for all controls
- Keyboard navigation support
- Screen reader announcements
- Respect `prefers-reduced-motion`

### User Preferences
- Remember user choices
- Option to follow system preference
- Quick toggle without opening menu
- Preview on hover (optional)

## Migration Strategy
1. Deploy with backwards compatibility
2. Automatically migrate existing preferences
3. Show one-time tooltip explaining new controls
4. Maintain old localStorage keys for rollback

## Testing Requirements
- Unit tests for context logic
- Integration tests for preference migration
- E2E tests for user flows
- Visual regression tests for all combinations
- Performance tests for theme switching

## Performance Considerations
- Lazy load theme CSS if needed
- Optimize transition animations
- Cache system preference queries
- Debounce rapid toggle actions

## Documentation Updates
- Update README with new theme controls
- Add migration guide for developers
- Update Storybook documentation
- Create user guide for theme selection

## References
- Material Design Dark Theme Guidelines
- WCAG 2.1 Color Contrast Requirements
- System Dark Mode Detection API
- Current implementation: `/lib/theme/`, `/components/ThemeSwitcher.tsx`

## Acceptance Criteria
- [ ] Users can select punk style independently from mode
- [ ] Quick toggle for dark/light mode without opening dropdown
- [ ] System preference detection works correctly
- [ ] All existing theme combinations accessible
- [ ] Keyboard shortcuts functional
- [ ] Storybook shows separated controls
- [ ] No breaking changes for existing users
- [ ] Performance remains under 100ms for theme switch