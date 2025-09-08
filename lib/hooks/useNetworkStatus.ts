'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';

// Store for network status
let listeners: Array<() => void> = [];
let isOnline = typeof window !== 'undefined' ? navigator.onLine : true;

function subscribe(listener: () => void) {
  listeners.push(listener);
  
  const handleOnline = () => {
    isOnline = true;
    listeners.forEach(l => l());
  };
  
  const handleOffline = () => {
    isOnline = false;
    listeners.forEach(l => l());
  };
  
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);
  
  return () => {
    listeners = listeners.filter(l => l !== listener);
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
}

function getSnapshot() {
  return isOnline;
}

function getServerSnapshot() {
  return true; // Always online during SSR
}

export function useNetworkStatus() {
  const online = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
  
  const [wasOffline, setWasOffline] = useState(false);
  
  useEffect(() => {
    if (!online) {
      setWasOffline(true);
    }
  }, [online]);
  
  // Detect when coming back online after being offline
  const justReconnected = wasOffline && online;
  
  useEffect(() => {
    if (justReconnected) {
      // Reset after a short delay
      const timer = setTimeout(() => setWasOffline(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [justReconnected]);
  
  return {
    isOnline: online,
    isOffline: !online,
    justReconnected,
  };
}