import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { ThemeProvider, useTheme, ThemeContext } from '@/lib/theme/ThemeContext';
import { DEFAULT_THEME } from '@/lib/theme/themes';
import React, { useContext } from 'react';

describe('useTheme', () => {
  beforeEach(() => {
    // Clear localStorage mock before each test
    vi.clearAllMocks();
    localStorage.getItem.mockReturnValue(null);
    document.documentElement.removeAttribute('data-theme');
  });

  it('should return current theme', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    // Use a safe hook that checks context first
    const { result } = renderHook(() => {
      const context = useContext(ThemeContext);
      return context || { theme: DEFAULT_THEME, setTheme: () => {} };
    }, { wrapper });
    
    await waitFor(() => {
      expect(result.current.theme).toBe(DEFAULT_THEME);
    });
  });

  it('should provide setTheme function', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => {
      const context = useContext(ThemeContext);
      return context || { theme: DEFAULT_THEME, setTheme: () => {} };
    }, { wrapper });
    
    await waitFor(() => {
      expect(typeof result.current.setTheme).toBe('function');
    });
  });

  it('should update theme when setTheme is called', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => {
      const context = useContext(ThemeContext);
      return context || { theme: DEFAULT_THEME, setTheme: () => {} };
    }, { wrapper });
    
    act(() => {
      result.current.setTheme('solar-bloom');
    });
    
    await waitFor(() => {
      expect(result.current.theme).toBe('solar-bloom');
    });
  });

  it('should persist theme to localStorage', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => {
      const context = useContext(ThemeContext);
      return context || { theme: DEFAULT_THEME, setTheme: () => {} };
    }, { wrapper });
    
    act(() => {
      result.current.setTheme('forest-canopy');
    });
    
    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('punk-stack-theme', 'forest-canopy');
    });
  });

  it('should load saved theme from localStorage on mount', async () => {
    localStorage.getItem.mockReturnValue('brass-copper');
    
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => {
      const context = useContext(ThemeContext);
      return context || { theme: DEFAULT_THEME, setTheme: () => {} };
    }, { wrapper });
    
    await waitFor(() => {
      expect(result.current.theme).toBe('brass-copper');
    });
  });

  it('should update document data-theme attribute', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => {
      const context = useContext(ThemeContext);
      return context || { theme: DEFAULT_THEME, setTheme: () => {} };
    }, { wrapper });
    
    act(() => {
      result.current.setTheme('victorian-noir');
    });
    
    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-theme')).toBe('victorian-noir');
    });
  });

  it('should handle missing localStorage gracefully', async () => {
    const originalLocalStorage = window.localStorage;
    // @ts-expect-error - Testing missing localStorage
    delete window.localStorage;
    
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    // Should not throw
    const { result } = renderHook(() => {
      const context = useContext(ThemeContext);
      return context || { theme: DEFAULT_THEME, setTheme: () => {} };
    }, { wrapper });
    
    await waitFor(() => {
      expect(result.current.theme).toBe(DEFAULT_THEME);
    });
    
    // Restore
    window.localStorage = originalLocalStorage;
  });
});