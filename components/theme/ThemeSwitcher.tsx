'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/lib/hooks/useTheme';
import { themes } from '@/lib/themes';

type ThemeSwitcherVariant = 'dropdown' | 'grid' | 'inline';

interface ThemeSwitcherProps {
  variant?: ThemeSwitcherVariant;
  className?: string;
  onThemeChange?: (theme: string) => void;
}

export function ThemeSwitcher({ 
  variant = 'dropdown', 
  className = '',
  onThemeChange 
}: ThemeSwitcherProps) {
  const { theme, setTheme, availableThemes, isLoading } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // All useEffect hooks must be called before any conditional returns
  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredThemes = availableThemes.filter(themeName =>
    themeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    themes[themeName]?.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    themes[themeName]?.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedThemes = filteredThemes.reduce((acc, themeName) => {
    const category = themes[themeName]?.category || 'other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(themeName);
    return acc;
  }, {} as Record<string, string[]>);

  const handleThemeSelect = (themeName: string) => {
    if (!mounted) return;
    
    console.log('Selecting theme:', themeName);
    setTheme(themeName);
    setSearchQuery('');
    onThemeChange?.(themeName);
  };

  // Don't render until mounted on client
  if (!mounted) {
    return (
      <button className={`btn m-1 ${className}`} disabled>
        Loading...
      </button>
    );
  }

  if (variant === 'grid') {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}>
        {Object.entries(groupedThemes).map(([category, themeList]) => (
          <div key={category} className="col-span-full">
            <h3 className="text-lg font-bold capitalize mb-2">{category}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {themeList.map(themeName => (
                <button
                  key={themeName}
                  onClick={() => handleThemeSelect(themeName)}
                  disabled={isLoading}
                  className={`
                    btn btn-sm
                    ${theme === themeName ? 'btn-primary' : 'btn-ghost'}
                    ${isLoading ? 'loading' : ''}
                  `}
                  aria-label={`Select ${themes[themeName]?.label} theme`}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {['primary', 'secondary', 'accent'].map(color => (
                        <div
                          key={color}
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: themes[themeName]?.colors[color as keyof typeof themes[typeof themeName]['colors']] }}
                        />
                      ))}
                    </div>
                    <span className="text-xs">{themes[themeName]?.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {availableThemes.map(themeName => (
          <button
            key={themeName}
            onClick={() => handleThemeSelect(themeName)}
            disabled={isLoading}
            className={`
              btn btn-sm
              ${theme === themeName ? 'btn-primary' : 'btn-ghost'}
              ${isLoading ? 'loading' : ''}
            `}
            aria-label={`Select ${themes[themeName]?.label} theme`}
          >
            {themes[themeName]?.label}
          </button>
        ))}
      </div>
    );
  }

  // Default dropdown variant - use DaisyUI's native dropdown behavior
  return (
    <div className={`dropdown dropdown-end ${className}`} ref={dropdownRef}>
      <label
        tabIndex={0}
        className={`btn m-1 ${isLoading ? 'loading' : ''}`}
        aria-label="Select theme"
      >
        {themes[theme]?.label || theme}
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </label>
      
      <div 
        tabIndex={0} 
        className="dropdown-content menu p-2 shadow-2xl bg-base-300 rounded-box w-72 max-h-96 overflow-y-auto z-[100]"
      >
        <input
          type="text"
          placeholder="Search themes..."
          className="input input-sm w-full mb-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search themes"
        />
        
        <ul role="listbox" aria-label="Theme options">
          {Object.entries(groupedThemes).map(([category, themeList]) => (
            <li key={category}>
              <div className="menu-title">
                <span className="text-xs font-bold uppercase opacity-60">{category}</span>
              </div>
              <ul>
                {themeList.map(themeName => (
                  <li key={themeName}>
                    <button
                      onClick={() => handleThemeSelect(themeName)}
                      className={`flex items-center gap-3 p-2 hover:bg-base-200 rounded ${
                        theme === themeName ? 'bg-primary text-primary-content' : ''
                      }`}
                      role="option"
                      aria-selected={theme === themeName}
                      disabled={isLoading}
                    >
                      <div className="flex gap-1">
                        {['primary', 'secondary', 'accent'].map(color => (
                          <div
                            key={color}
                            className="w-3 h-3 rounded-full border border-base-content/20"
                            style={{ backgroundColor: themes[themeName]?.colors[color as keyof typeof themes[typeof themeName]['colors']] }}
                          />
                        ))}
                      </div>
                      <span>{themes[themeName]?.label}</span>
                      {theme === themeName && (
                        <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}