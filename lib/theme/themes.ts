export const PUNK_THEMES = {
  cyberpunk: {
    light: 'neon-day',
    dark: 'neon-noir'
  },
  solarpunk: {
    light: 'solar-bloom',
    dark: 'forest-canopy'
  },
  steampunk: {
    light: 'brass-copper',
    dark: 'victorian-noir'
  },
  vaporwave: {
    light: 'miami-sunrise',
    dark: 'retro-night'
  },
  dieselpunk: {
    light: 'art-deco',
    dark: 'noir-industrial'
  },
  biopunk: {
    light: 'lab-bright',
    dark: 'toxic-glow'
  }
} as const;

export type PunkStyle = keyof typeof PUNK_THEMES;
export type ThemeMode = 'light' | 'dark';
export type ThemeName = typeof PUNK_THEMES[PunkStyle][ThemeMode];

export const ALL_THEMES = Object.entries(PUNK_THEMES).flatMap(([style, modes]) =>
  Object.entries(modes).map(([mode, theme]) => ({
    style: style as PunkStyle,
    mode: mode as ThemeMode,
    name: theme,
    label: `${style.charAt(0).toUpperCase() + style.slice(1)} ${mode.charAt(0).toUpperCase() + mode.slice(1)}`
  }))
);

export const DEFAULT_THEME = PUNK_THEMES.cyberpunk.dark;