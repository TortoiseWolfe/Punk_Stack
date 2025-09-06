import { themes } from './index';

// Convert our theme definitions to DaisyUI format
export const daisyuiThemes = Object.values(themes).map(theme => ({
  [theme.name]: {
    ...theme.colors,
    '--rounded-box': '1rem',
    '--rounded-btn': '0.5rem',
    '--rounded-badge': '1.9rem',
    '--animation-btn': '0.25s',
    '--animation-input': '0.2s',
    '--btn-text-case': 'uppercase',
    '--btn-focus-scale': '0.95',
    '--border-btn': '1px',
    '--tab-border': '1px',
    '--tab-radius': '0.5rem',
  },
}));

// Export as object for DaisyUI config
export const daisyuiConfig = {
  themes: daisyuiThemes.reduce((acc, theme) => ({ ...acc, ...theme }), {}),
};