'use client';

import React, { createContext, useEffect, useState, useCallback, useMemo } from 'react';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { themes, defaultTheme, themeNames } from '@/lib/themes';

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
  availableThemes: string[];
  isLoading: boolean;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Default context value for SSR
const defaultContextValue: ThemeContextType = {
  theme: defaultTheme,
  setTheme: () => {},
  availableThemes: themeNames,
  isLoading: false,
};

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: string;
}

export function ThemeProvider({ 
  children, 
  defaultTheme: initialTheme = defaultTheme 
}: ThemeProviderProps) {
  const [savedTheme, setSavedTheme] = useLocalStorage('punk-stack-theme', initialTheme);
  const [currentTheme, setCurrentTheme] = useState(initialTheme);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Apply theme to HTML element
  const applyTheme = useCallback((themeName: string) => {
    // Map our theme names to DaisyUI's built-in themes
    const daisyThemeMap: Record<string, string> = {
      'neon-day': 'cyberpunk',
      'neon-noir': 'synthwave',
      'solar-bloom': 'emerald',
      'forest-canopy': 'forest',
      'brass-copper': 'autumn',
      'victorian-noir': 'coffee',
      'miami-sunrise': 'valentine',
      'retro-night': 'night',
      'art-deco': 'luxury',
      'noir-industrial': 'business',
      'lab-bright': 'corporate',
      'toxic-glow': 'halloween'
    };

    const daisyTheme = daisyThemeMap[themeName] || 'dark';
    setIsLoading(true);
    
    // Set the data-theme attribute for DaisyUI
    document.documentElement.setAttribute('data-theme', daisyTheme);
    
    // Update meta theme-color
    const theme = themes[themeName];
    if (theme) {
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', theme.colors['base-100']);
      }
    }

    requestAnimationFrame(() => {
      setIsLoading(false);
    });
  }, []);

  // Set theme handler
  const setTheme = useCallback((themeName: string) => {
    console.log('ThemeProvider.setTheme called with:', themeName);
    
    if (!themeNames.includes(themeName as any)) {
      console.error(`Invalid theme: ${themeName}`);
      return;
    }
    
    console.log('Setting theme to:', themeName);
    setCurrentTheme(themeName);
    setSavedTheme(themeName);
    applyTheme(themeName);
    
    // Announce to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Theme changed to ${themes[themeName]?.label || themeName}`;
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
  }, [applyTheme, setSavedTheme]);

  // Initialize theme on mount
  useEffect(() => {
    setMounted(true);
    const themeToApply = savedTheme || initialTheme;
    setCurrentTheme(themeToApply);
    applyTheme(themeToApply);
  }, []);

  // Sync with localStorage changes from other tabs
  useEffect(() => {
    if (!mounted) return;
    
    if (savedTheme && savedTheme !== currentTheme) {
      setCurrentTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, [savedTheme, mounted]);

  const contextValue = useMemo(
    () => ({
      theme: currentTheme,
      setTheme,
      availableThemes: themeNames,
      isLoading,
    }),
    [currentTheme, setTheme, isLoading]
  );

  // Prevent hydration mismatch
  if (!mounted) {
    return <div suppressHydrationWarning>{children}</div>;
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}