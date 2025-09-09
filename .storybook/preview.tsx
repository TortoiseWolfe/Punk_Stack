import type { Preview } from '@storybook/nextjs'
import React, { useEffect } from 'react'
import { ThemeProvider } from '../lib/theme/ThemeContext'
import '../app/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
      ],
    },
  },
  decorators: [
    (Story, context) => {
      // Apply the theme from the toolbar
      useEffect(() => {
        const theme = context.globals.theme || 'neon-noir';
        document.documentElement.setAttribute('data-theme', theme);
      }, [context.globals.theme]);

      return (
        <ThemeProvider>
          <div className="min-h-screen bg-base-100">
            <div className="navbar bg-base-200 shadow-lg sticky top-0 z-50">
              <div className="flex-1">
                <a href="/" className="btn btn-ghost text-xl font-bold">
                  ← Back to App
                </a>
              </div>
              <div className="flex-none gap-2">
                <span className="text-sm opacity-70">Punk Stack Storybook</span>
                <a 
                  href="https://github.com/TurtleWolfe/Punk_Stack" 
                  className="btn btn-ghost btn-circle btn-sm"
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="GitHub Repository"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div className="p-8">
              <Story />
            </div>
          </div>
        </ThemeProvider>
      );
    },
  ],
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Punk theme switcher',
      defaultValue: 'neon-noir',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'neon-day', title: 'Cyberpunk Day' },
          { value: 'neon-noir', title: 'Cyberpunk Night' },
          { value: 'solar-bloom', title: 'Solarpunk Day' },
          { value: 'forest-canopy', title: 'Solarpunk Night' },
          { value: 'brass-copper', title: 'Steampunk Day' },
          { value: 'victorian-noir', title: 'Steampunk Night' },
          { value: 'miami-sunrise', title: 'Vaporwave Day' },
          { value: 'retro-night', title: 'Vaporwave Night' },
          { value: 'art-deco', title: 'Dieselpunk Day' },
          { value: 'noir-industrial', title: 'Dieselpunk Night' },
          { value: 'lab-bright', title: 'Biopunk Day' },
          { value: 'toxic-glow', title: 'Biopunk Night' },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;