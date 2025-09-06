export function hexToHSL(hex: string): string {
  // Remove # if present
  hex = hex.replace(/^#/, '');
  
  // Parse RGB values
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;
  
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  
  if (diff !== 0) {
    s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);
    
    switch (max) {
      case r:
        h = ((g - b) / diff + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / diff + 2) / 6;
        break;
      case b:
        h = ((r - g) / diff + 4) / 6;
        break;
    }
  }
  
  // Convert to DaisyUI HSL format (degrees, percentage, percentage)
  const hDegrees = Math.round(h * 360);
  const sPercent = Math.round(s * 100);
  const lPercent = Math.round(l * 100);
  
  return `${hDegrees} ${sPercent}% ${lPercent}%`;
}

export function applyThemeColors(themeName: string, colors: Record<string, string>) {
  // Convert hex colors to HSL and apply as CSS variables
  const cssVarMap: Record<string, string> = {
    'primary': 'p',
    'secondary': 's',
    'accent': 'a',
    'neutral': 'n',
    'base-100': 'b1',
    'base-200': 'b2',
    'base-300': 'b3',
    'info': 'in',
    'success': 'su',
    'warning': 'wa',
    'error': 'er'
  };
  
  Object.entries(colors).forEach(([key, hexValue]) => {
    const cssVar = cssVarMap[key];
    if (cssVar) {
      const hslValue = hexToHSL(hexValue);
      document.documentElement.style.setProperty(`--${cssVar}`, hslValue);
    }
  });
}