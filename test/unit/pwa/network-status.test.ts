import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useNetworkStatus } from '@/lib/hooks/useNetworkStatus';

describe('useNetworkStatus', () => {
  let originalNavigator: typeof navigator;
  let onlineListeners: Array<() => void> = [];
  let offlineListeners: Array<() => void> = [];

  beforeEach(() => {
    // Save original navigator
    originalNavigator = global.navigator;
    
    // Mock navigator.onLine
    Object.defineProperty(global, 'navigator', {
      writable: true,
      value: {
        onLine: true,
      },
    });

    // Mock window event listeners with proper typing
    vi.spyOn(window, 'addEventListener').mockImplementation((
      event: string, 
      handler: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions
    ) => {
      const fn = typeof handler === 'function' ? handler : handler.handleEvent;
      if (event === 'online') onlineListeners.push(fn as () => void);
      if (event === 'offline') offlineListeners.push(fn as () => void);
    });

    vi.spyOn(window, 'removeEventListener').mockImplementation((
      event: string,
      handler: EventListenerOrEventListenerObject,
      options?: boolean | EventListenerOptions
    ) => {
      const fn = typeof handler === 'function' ? handler : handler.handleEvent;
      if (event === 'online') {
        onlineListeners = onlineListeners.filter(h => h !== fn);
      }
      if (event === 'offline') {
        offlineListeners = offlineListeners.filter(h => h !== fn);
      }
    });
  });

  afterEach(() => {
    // Restore original navigator
    global.navigator = originalNavigator;
    onlineListeners = [];
    offlineListeners = [];
    vi.clearAllMocks();
  });

  it('should detect initial online status', () => {
    const { result } = renderHook(() => useNetworkStatus());
    
    expect(result.current.isOnline).toBe(true);
    expect(result.current.isOffline).toBe(false);
    expect(result.current.justReconnected).toBe(false);
  });

  it('should detect when going offline', () => {
    const { result } = renderHook(() => useNetworkStatus());
    
    act(() => {
      Object.defineProperty(global.navigator, 'onLine', {
        writable: true,
        value: false,
      });
      offlineListeners.forEach(handler => handler());
    });

    expect(result.current.isOnline).toBe(false);
    expect(result.current.isOffline).toBe(true);
  });

  it('should detect when coming back online', () => {
    const { result } = renderHook(() => useNetworkStatus());
    
    // Go offline first
    act(() => {
      Object.defineProperty(global.navigator, 'onLine', {
        writable: true,
        value: false,
      });
      offlineListeners.forEach(handler => handler());
    });

    // Then come back online
    act(() => {
      Object.defineProperty(global.navigator, 'onLine', {
        writable: true,
        value: true,
      });
      onlineListeners.forEach(handler => handler());
    });

    expect(result.current.isOnline).toBe(true);
    expect(result.current.isOffline).toBe(false);
    expect(result.current.justReconnected).toBe(true);
  });

  it('should reset justReconnected after timeout', async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useNetworkStatus());
    
    // Go offline then online
    act(() => {
      Object.defineProperty(global.navigator, 'onLine', {
        writable: true,
        value: false,
      });
      offlineListeners.forEach(handler => handler());
    });

    act(() => {
      Object.defineProperty(global.navigator, 'onLine', {
        writable: true,
        value: true,
      });
      onlineListeners.forEach(handler => handler());
    });

    expect(result.current.justReconnected).toBe(true);

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.justReconnected).toBe(false);
    
    vi.useRealTimers();
  });

  it('should cleanup event listeners on unmount', () => {
    const { unmount } = renderHook(() => useNetworkStatus());
    
    expect(window.addEventListener).toHaveBeenCalledWith('online', expect.any(Function));
    expect(window.addEventListener).toHaveBeenCalledWith('offline', expect.any(Function));
    
    unmount();
    
    expect(window.removeEventListener).toHaveBeenCalledWith('online', expect.any(Function));
    expect(window.removeEventListener).toHaveBeenCalledWith('offline', expect.any(Function));
  });
});