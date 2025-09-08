'use client';

import { useContext, useState, useRef, useEffect } from 'react';
import { ALL_THEMES, PUNK_THEMES, DEFAULT_THEME } from '@/lib/theme/themes';

// Import the context directly to handle SSR gracefully
import { ThemeContext } from '@/lib/theme/ThemeContext';

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [previewTheme, setPreviewTheme] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const originalThemeRef = useRef<string>(DEFAULT_THEME);
  
  // Get context safely
  const context = useContext(ThemeContext);
  const theme = context?.theme || DEFAULT_THEME;
  const setTheme = context?.setTheme || (() => {});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        // Restore original theme if previewing
        if (previewTheme) {
          document.documentElement.setAttribute('data-theme', originalThemeRef.current);
          setPreviewTheme(null);
        }
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        // Restore original theme if previewing
        if (previewTheme) {
          document.documentElement.setAttribute('data-theme', originalThemeRef.current);
          setPreviewTheme(null);
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, previewTheme]);

  if (!mounted) {
    // Return a placeholder during SSR
    return (
      <button className="btn btn-ghost normal-case" disabled>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"/>
        </svg>
        <span className="ml-2">Loading...</span>
      </button>
    );
  }

  const currentThemeLabel = ALL_THEMES.find(t => t.name === theme)?.label || theme;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-ghost normal-case"
        aria-label="Theme selector"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"/>
        </svg>
        <span className="ml-2">{currentThemeLabel}</span>
        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-lg shadow-2xl bg-base-200 ring-1 ring-base-300 z-50">
          <div className="p-2">
            <div className="text-xs font-semibold text-base-content/60 px-2 py-1 uppercase tracking-wider">
              Select Theme
            </div>
            {Object.entries(PUNK_THEMES).map(([style, modes]) => (
              <div key={style} className="mb-2">
                <div className="text-xs font-medium text-base-content/70 px-2 py-1 capitalize">
                  {style}
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {Object.entries(modes).map(([mode, themeName]) => {
                    const themeData = ALL_THEMES.find(t => t.name === themeName);
                    return (
                      <button
                        key={themeName}
                        onClick={() => {
                          setTheme(themeName);
                          setIsOpen(false);
                          setPreviewTheme(null);
                        }}
                        onMouseEnter={() => {
                          // Store current theme before preview
                          if (!previewTheme) {
                            originalThemeRef.current = theme;
                          }
                          setPreviewTheme(themeName);
                          // Apply preview theme
                          document.documentElement.setAttribute('data-theme', themeName);
                        }}
                        onMouseLeave={() => {
                          // Restore original theme
                          if (previewTheme) {
                            document.documentElement.setAttribute('data-theme', originalThemeRef.current);
                            setPreviewTheme(null);
                          }
                        }}
                        className={`
                          px-3 py-2 text-sm rounded-md transition-all
                          hover:bg-primary/20 hover:text-primary-content
                          focus:outline-none focus:ring-2 focus:ring-primary
                          ${theme === themeName ? 'bg-primary text-primary-content' : 'text-base-content'}
                        `}
                        aria-label={`Switch to ${themeData?.label} theme`}
                      >
                        {mode}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}