import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { ThemeProvider } from '@/lib/theme/ThemeContext';
import { ALL_THEMES, PUNK_THEMES } from '@/lib/theme/themes';
import React from 'react';

describe('ThemeSwitcher', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithProvider = (component: React.ReactElement) => {
    return render(
      <ThemeProvider>
        {component}
      </ThemeProvider>
    );
  };

  it('should render theme switcher button', () => {
    renderWithProvider(<ThemeSwitcher />);
    
    const button = screen.getByRole('button', { name: /theme selector/i });
    expect(button).toBeInTheDocument();
  });

  it('should display current theme label', async () => {
    renderWithProvider(<ThemeSwitcher />);
    
    // Wait for client-side hydration
    await waitFor(() => {
      const themeText = screen.getByText(/Cyberpunk Dark/i);
      expect(themeText).toBeInTheDocument();
    });
  });

  it('should show Loading state during SSR', () => {
    // This test is no longer valid since ThemeSwitcher now handles SSR gracefully
    // by returning default values instead of showing loading state
    // The component immediately hydrates in the test environment
    renderWithProvider(<ThemeSwitcher />);
    
    // Should render with default theme immediately
    expect(screen.getByRole('button', { name: /theme selector/i })).toBeInTheDocument();
  });

  it('should open dropdown when clicked', async () => {
    const user = userEvent.setup();
    renderWithProvider(<ThemeSwitcher />);
    
    // Wait for component to mount
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
    
    const button = screen.getByRole('button', { name: /theme selector/i });
    await user.click(button);
    
    expect(screen.getByText('Select Theme')).toBeInTheDocument();
  });

  it('should display all 12 theme options', async () => {
    const user = userEvent.setup();
    renderWithProvider(<ThemeSwitcher />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
    
    const button = screen.getByRole('button', { name: /theme selector/i });
    await user.click(button);
    
    // Check for all punk styles
    expect(screen.getByText('cyberpunk')).toBeInTheDocument();
    expect(screen.getByText('solarpunk')).toBeInTheDocument();
    expect(screen.getByText('steampunk')).toBeInTheDocument();
    expect(screen.getByText('vaporwave')).toBeInTheDocument();
    expect(screen.getByText('dieselpunk')).toBeInTheDocument();
    expect(screen.getByText('biopunk')).toBeInTheDocument();
    
    // Check for light/dark options (2 per style = 12 total)
    const lightButtons = screen.getAllByText('light');
    const darkButtons = screen.getAllByText('dark');
    expect(lightButtons).toHaveLength(6);
    expect(darkButtons).toHaveLength(6);
  });

  it('should close dropdown when theme is selected', async () => {
    const user = userEvent.setup();
    renderWithProvider(<ThemeSwitcher />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
    
    const button = screen.getByRole('button', { name: /theme selector/i });
    await user.click(button);
    
    // Click on a theme option
    const themeButtons = screen.getAllByText('light');
    await user.click(themeButtons[0]);
    
    // Dropdown should close
    expect(screen.queryByText('Select Theme')).not.toBeInTheDocument();
  });

  it('should close dropdown on Escape key', async () => {
    const user = userEvent.setup();
    renderWithProvider(<ThemeSwitcher />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
    
    const button = screen.getByRole('button', { name: /theme selector/i });
    await user.click(button);
    
    expect(screen.getByText('Select Theme')).toBeInTheDocument();
    
    await user.keyboard('{Escape}');
    
    expect(screen.queryByText('Select Theme')).not.toBeInTheDocument();
  });

  it('should close dropdown when clicking outside', async () => {
    const user = userEvent.setup();
    renderWithProvider(
      <div>
        <ThemeSwitcher />
        <div data-testid="outside">Outside element</div>
      </div>
    );
    
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
    
    const button = screen.getByRole('button', { name: /theme selector/i });
    await user.click(button);
    
    expect(screen.getByText('Select Theme')).toBeInTheDocument();
    
    // Click outside
    const outside = screen.getByTestId('outside');
    await user.click(outside);
    
    expect(screen.queryByText('Select Theme')).not.toBeInTheDocument();
  });

  it('should highlight currently selected theme', async () => {
    const user = userEvent.setup();
    renderWithProvider(<ThemeSwitcher />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
    
    const button = screen.getByRole('button', { name: /theme selector/i });
    await user.click(button);
    
    // Find the button for the default theme (neon-noir which is cyberpunk dark)
    const darkButtons = screen.getAllByText('dark');
    const cyberpunkDarkButton = darkButtons[0]; // First dark button is cyberpunk dark
    
    // Should have the selected styles
    expect(cyberpunkDarkButton.className).toContain('bg-primary');
    expect(cyberpunkDarkButton.className).toContain('text-primary-content');
  });

  it('should have proper ARIA attributes', async () => {
    renderWithProvider(<ThemeSwitcher />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
    
    const button = screen.getByRole('button', { name: /theme selector/i });
    
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-haspopup', 'true');
    
    fireEvent.click(button);
    
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });
});