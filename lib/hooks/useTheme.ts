'use client';

import { useContext } from 'react';
import { ThemeContext } from '@/components/theme/ThemeProvider';
import { defaultTheme, themeNames } from '@/lib/themes';

export function useTheme() {
  const context = useContext(ThemeContext);
  
  // Return default values during SSR or if context not available
  if (!context) {
    return {
      theme: defaultTheme,
      setTheme: () => console.warn('ThemeProvider not mounted'),
      availableThemes: themeNames,
      isLoading: false,
    };
  }
  
  return context;
}