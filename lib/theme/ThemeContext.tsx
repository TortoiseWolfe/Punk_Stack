'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { DEFAULT_THEME } from './themes';

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<string>(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedTheme = localStorage.getItem('punk-stack-theme');
      if (savedTheme) {
        setTheme(savedTheme);
      }
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      const startTime = performance.now();
      
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Disable transitions if user prefers reduced motion
      if (prefersReducedMotion) {
        document.documentElement.style.transition = 'none';
      }
      
      document.documentElement.setAttribute('data-theme', theme);
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('punk-stack-theme', theme);
      }
      
      // Re-enable transitions after a frame
      if (prefersReducedMotion) {
        requestAnimationFrame(() => {
          document.documentElement.style.transition = '';
        });
      }
      
      // Log performance for PRP-01 requirement (<100ms)
      const switchTime = performance.now() - startTime;
      if (switchTime > 100) {
        console.warn(`Theme switch took ${switchTime.toFixed(2)}ms (target: <100ms)`);
      } else {
        console.debug(`Theme switch completed in ${switchTime.toFixed(2)}ms ✓`);
      }
      
      // Announce to screen readers
      const announcement = document.createElement('div');
      announcement.setAttribute('role', 'status');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = `Theme changed to ${theme}`;
      document.body.appendChild(announcement);
      setTimeout(() => announcement.remove(), 1000);
      
      // Broadcast theme change to other tabs
      try {
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'punk-stack-theme',
          newValue: theme,
          url: window.location.href,
          storageArea: localStorage
        }));
      } catch {
        // Fallback for environments where StorageEvent doesn't work properly
        window.dispatchEvent(new CustomEvent('theme-change', {
          detail: { theme }
        }));
      }
    }
  }, [theme, mounted]);

  // Listen for theme changes from other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'punk-stack-theme' && e.newValue) {
        setTheme(e.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return <div suppressHydrationWarning>{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Return a default value during SSR
    if (typeof window === 'undefined') {
      return { theme: DEFAULT_THEME, setTheme: () => {} };
    }
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}