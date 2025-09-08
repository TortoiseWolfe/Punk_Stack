import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { InstallPrompt } from '@/components/InstallPrompt';

// PRP-02: PWA Installation Prompt Tests
describe('InstallPrompt', () => {
  let mockDeferredPrompt: any;

  beforeEach(() => {
    // Clear localStorage
    localStorage.clear();
    
    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    // Mock beforeinstallprompt event
    mockDeferredPrompt = {
      prompt: vi.fn().mockResolvedValue(undefined),
      userChoice: Promise.resolve({ outcome: 'accepted' }),
      preventDefault: vi.fn(),
    };
  });

  describe('Installation Detection', () => {
    it('should not render when app is already installed', () => {
      // Mock standalone display mode (installed)
      window.matchMedia = vi.fn().mockImplementation(query => ({
        matches: query === '(display-mode: standalone)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const { container } = render(<InstallPrompt />);
      expect(container.firstChild).toBeNull();
    });

    it('should render when beforeinstallprompt event is fired', async () => {
      render(<InstallPrompt />);
      
      // Initially should not be visible
      expect(screen.queryByText('Install Punk Stack')).toBeNull();
      
      // Fire the beforeinstallprompt event
      const event = new Event('beforeinstallprompt');
      Object.assign(event, mockDeferredPrompt);
      window.dispatchEvent(event);
      
      // Should now be visible
      await waitFor(() => {
        expect(screen.getByText('Install Punk Stack')).toBeInTheDocument();
      });
    });
  });

  describe('User Interactions', () => {
    it('should trigger install prompt when Install button is clicked', async () => {
      render(<InstallPrompt />);
      
      // Fire the beforeinstallprompt event
      const event = new Event('beforeinstallprompt');
      Object.assign(event, mockDeferredPrompt);
      window.dispatchEvent(event);
      
      // Wait for prompt to appear
      await waitFor(() => {
        expect(screen.getByText('Install Punk Stack')).toBeInTheDocument();
      });
      
      // Click install button
      const installButton = screen.getByRole('button', { name: /install punk stack/i });
      fireEvent.click(installButton);
      
      // Verify prompt was called
      await waitFor(() => {
        expect(mockDeferredPrompt.prompt).toHaveBeenCalled();
      });
    });

    it('should dismiss prompt and save preference', async () => {
      render(<InstallPrompt />);
      
      // Fire the beforeinstallprompt event
      const event = new Event('beforeinstallprompt');
      Object.assign(event, mockDeferredPrompt);
      window.dispatchEvent(event);
      
      // Wait for prompt to appear
      await waitFor(() => {
        expect(screen.getByText('Install Punk Stack')).toBeInTheDocument();
      });
      
      // Click dismiss button
      const dismissButton = screen.getByRole('button', { name: /not now/i });
      fireEvent.click(dismissButton);
      
      // Verify prompt is hidden
      await waitFor(() => {
        expect(screen.queryByText('Install Punk Stack')).toBeNull();
      });
      
      // Verify dismissal was saved to localStorage
      expect(localStorage.getItem('pwa-install-dismissed')).toBeTruthy();
    });
  });

  describe('Dismissal Persistence', () => {
    it('should not show prompt if dismissed recently', () => {
      // Set dismissal time to 1 hour ago
      const oneHourAgo = Date.now() - (60 * 60 * 1000);
      localStorage.setItem('pwa-install-dismissed', oneHourAgo.toString());
      
      render(<InstallPrompt />);
      
      // Fire the beforeinstallprompt event
      const event = new Event('beforeinstallprompt');
      Object.assign(event, mockDeferredPrompt);
      window.dispatchEvent(event);
      
      // Should not show because dismissed recently
      expect(screen.queryByText('Install Punk Stack')).toBeNull();
    });

    it('should show prompt if dismissed more than 7 days ago', async () => {
      // Set dismissal time to 8 days ago
      const eightDaysAgo = Date.now() - (8 * 24 * 60 * 60 * 1000);
      localStorage.setItem('pwa-install-dismissed', eightDaysAgo.toString());
      
      render(<InstallPrompt />);
      
      // Fire the beforeinstallprompt event
      const event = new Event('beforeinstallprompt');
      Object.assign(event, mockDeferredPrompt);
      window.dispatchEvent(event);
      
      // Should show because dismissal was long ago
      await waitFor(() => {
        expect(screen.getByText('Install Punk Stack')).toBeInTheDocument();
      });
    });
  });

  describe('App Installation', () => {
    it('should hide prompt when app is installed', async () => {
      render(<InstallPrompt />);
      
      // Fire the beforeinstallprompt event
      const beforeInstallEvent = new Event('beforeinstallprompt');
      Object.assign(beforeInstallEvent, mockDeferredPrompt);
      window.dispatchEvent(beforeInstallEvent);
      
      // Wait for prompt to appear
      await waitFor(() => {
        expect(screen.getByText('Install Punk Stack')).toBeInTheDocument();
      });
      
      // Fire the appinstalled event
      const appInstalledEvent = new Event('appinstalled');
      window.dispatchEvent(appInstalledEvent);
      
      // Prompt should disappear
      await waitFor(() => {
        expect(screen.queryByText('Install Punk Stack')).toBeNull();
      });
    });
  });
});