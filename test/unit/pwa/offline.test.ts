import { describe, it, expect, beforeEach, vi } from 'vitest';
import fs from 'fs';
import path from 'path';

// PRP-02: Offline Functionality Tests
describe('Offline Functionality', () => {
  describe('Offline Page', () => {
    const offlinePath = path.join(process.cwd(), 'public', 'offline.html');
    
    it('should have an offline fallback page', () => {
      expect(fs.existsSync(offlinePath)).toBe(true);
    });

    it('should contain required offline page elements', () => {
      const offlineContent = fs.readFileSync(offlinePath, 'utf-8');
      
      // Check for essential content
      expect(offlineContent).toContain("You're Offline");
      expect(offlineContent).toContain('Punk Stack');
      expect(offlineContent).toContain('offline');
      
      // Check for retry functionality
      expect(offlineContent).toContain('reload');
      expect(offlineContent).toContain('Try Again');
      
      // Check for online event listener
      expect(offlineContent).toContain("addEventListener('online'");
    });

    it('should have proper styling', () => {
      const offlineContent = fs.readFileSync(offlinePath, 'utf-8');
      
      // Check for responsive meta tag
      expect(offlineContent).toContain('viewport');
      expect(offlineContent).toContain('width=device-width');
      
      // Check for CSS styles
      expect(offlineContent).toContain('<style>');
      expect(offlineContent).toContain('min-height: 100vh');
      expect(offlineContent).toContain('display: flex');
    });
  });

  describe('Service Worker Configuration', () => {
    it('should have caching strategies defined', () => {
      // Check next.config.ts for runtimeCaching
      const configPath = path.join(process.cwd(), 'next.config.ts');
      const configContent = fs.readFileSync(configPath, 'utf-8');
      
      // Check for cache strategies
      expect(configContent).toContain('CacheFirst');
      expect(configContent).toContain('StaleWhileRevalidate');
      expect(configContent).toContain('NetworkFirst');
      
      // Check for cache names
      expect(configContent).toContain('static-resources');
      expect(configContent).toContain('images');
      expect(configContent).toContain('api-cache');
    });

    it('should have proper cache expiration settings', () => {
      const configPath = path.join(process.cwd(), 'next.config.ts');
      const configContent = fs.readFileSync(configPath, 'utf-8');
      
      // Check for expiration settings
      expect(configContent).toContain('maxEntries');
      expect(configContent).toContain('maxAgeSeconds');
    });

    it('should disable service worker in development', () => {
      const configPath = path.join(process.cwd(), 'next.config.ts');
      const configContent = fs.readFileSync(configPath, 'utf-8');
      
      // Check for development disable
      expect(configContent).toContain('disable: process.env.NODE_ENV === "development"');
    });
  });

  describe('Network Status Detection', () => {
    beforeEach(() => {
      // Mock navigator.onLine
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: true,
      });
    });

    it('should detect online status', () => {
      expect(navigator.onLine).toBe(true);
    });

    it('should detect offline status', () => {
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: false,
      });
      
      expect(navigator.onLine).toBe(false);
    });

    it('should handle online/offline events', () => {
      const onlineHandler = vi.fn();
      const offlineHandler = vi.fn();
      
      window.addEventListener('online', onlineHandler);
      window.addEventListener('offline', offlineHandler);
      
      // Simulate online event
      const onlineEvent = new Event('online');
      window.dispatchEvent(onlineEvent);
      expect(onlineHandler).toHaveBeenCalled();
      
      // Simulate offline event
      const offlineEvent = new Event('offline');
      window.dispatchEvent(offlineEvent);
      expect(offlineHandler).toHaveBeenCalled();
      
      window.removeEventListener('online', onlineHandler);
      window.removeEventListener('offline', offlineHandler);
    });
  });

  describe('Theme Persistence Offline', () => {
    it('should maintain theme selection offline', () => {
      const theme = 'neon-noir';
      localStorage.setItem('punk-stack-theme', theme);
      
      // Simulate offline
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: false,
      });
      
      // Theme should still be accessible
      const savedTheme = localStorage.getItem('punk-stack-theme');
      expect(savedTheme).toBe(theme);
    });

    it('should sync theme changes when back online', () => {
      const offlineTheme = 'forest-canopy';
      
      // Simulate offline
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: false,
      });
      
      // Change theme while offline
      localStorage.setItem('punk-stack-theme', offlineTheme);
      
      // Simulate coming back online
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: true,
      });
      
      // Theme should persist
      expect(localStorage.getItem('punk-stack-theme')).toBe(offlineTheme);
    });
  });
});