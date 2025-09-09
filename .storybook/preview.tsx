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
          <div className="min-h-screen bg-base-100 p-8">
            <Story />
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