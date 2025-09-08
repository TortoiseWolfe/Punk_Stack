import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

// PRP-02: PWA Manifest Tests
describe('PWA Manifest', () => {
  const manifestPath = path.join(process.cwd(), 'public', 'manifest.json');
  
  it('should have a valid manifest.json file', () => {
    expect(fs.existsSync(manifestPath)).toBe(true);
  });

  it('should contain required manifest fields', () => {
    const manifestContent = fs.readFileSync(manifestPath, 'utf-8');
    const manifest = JSON.parse(manifestContent);
    
    // Required fields
    expect(manifest.name).toBeDefined();
    expect(manifest.short_name).toBeDefined();
    expect(manifest.start_url).toBeDefined();
    expect(manifest.display).toBeDefined();
    expect(manifest.icons).toBeDefined();
    expect(Array.isArray(manifest.icons)).toBe(true);
  });

  it('should have correct app metadata', () => {
    const manifestContent = fs.readFileSync(manifestPath, 'utf-8');
    const manifest = JSON.parse(manifestContent);
    
    expect(manifest.name).toBe('Punk Stack Design System');
    expect(manifest.short_name).toBe('PunkStack');
    expect(manifest.description).toContain('Offline-first design system');
    expect(manifest.start_url).toBe('/');
    expect(manifest.display).toBe('standalone');
  });

  it('should have valid icons configuration', () => {
    const manifestContent = fs.readFileSync(manifestPath, 'utf-8');
    const manifest = JSON.parse(manifestContent);
    
    expect(manifest.icons.length).toBeGreaterThan(0);
    
    manifest.icons.forEach((icon: any) => {
      expect(icon.src).toBeDefined();
      expect(icon.type).toBeDefined();
      expect(icon.type).toMatch(/^image\/(x-icon|png|svg\+xml)$/);
    });
  });

  it('should have theme and background colors', () => {
    const manifestContent = fs.readFileSync(manifestPath, 'utf-8');
    const manifest = JSON.parse(manifestContent);
    
    expect(manifest.theme_color).toBeDefined();
    expect(manifest.background_color).toBeDefined();
    expect(manifest.theme_color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(manifest.background_color).toMatch(/^#[0-9A-Fa-f]{6}$/);
  });

  it('should have proper orientation setting', () => {
    const manifestContent = fs.readFileSync(manifestPath, 'utf-8');
    const manifest = JSON.parse(manifestContent);
    
    expect(manifest.orientation).toBeDefined();
    expect(['portrait', 'landscape', 'any']).toContain(manifest.orientation);
  });

  it('should have shortcuts defined', () => {
    const manifestContent = fs.readFileSync(manifestPath, 'utf-8');
    const manifest = JSON.parse(manifestContent);
    
    expect(manifest.shortcuts).toBeDefined();
    expect(Array.isArray(manifest.shortcuts)).toBe(true);
    
    if (manifest.shortcuts.length > 0) {
      manifest.shortcuts.forEach((shortcut: any) => {
        expect(shortcut.name).toBeDefined();
        expect(shortcut.url).toBeDefined();
      });
    }
  });

  it('should have categories defined', () => {
    const manifestContent = fs.readFileSync(manifestPath, 'utf-8');
    const manifest = JSON.parse(manifestContent);
    
    expect(manifest.categories).toBeDefined();
    expect(Array.isArray(manifest.categories)).toBe(true);
    expect(manifest.categories).toContain('developer');
    expect(manifest.categories).toContain('design');
  });
});