'use client';

import { useEffect, useState } from 'react';
import { Workbox } from 'workbox-window';

export function UpdateNotification() {
  const [showReload, setShowReload] = useState(false);
  const [workbox, setWorkbox] = useState<Workbox | null>(null);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      process.env.NODE_ENV === 'production'
    ) {
      const wb = new Workbox('/sw.js');

      // Add event listener for waiting state
      wb.addEventListener('waiting', () => {
        setShowReload(true);
      });

      // Register the service worker
      wb.register();
      setWorkbox(wb);
    }
  }, []);

  const handleUpdate = () => {
    if (workbox) {
      // Tell waiting service worker to take control
      workbox.messageSkipWaiting();
      
      // Reload once the new service worker takes control
      workbox.addEventListener('controlling', () => {
        window.location.reload();
      });
    }
  };

  const handleDismiss = () => {
    setShowReload(false);
    // Store dismissal in session storage
    sessionStorage.setItem('update-dismissed', 'true');
  };

  if (!showReload) return null;

  return (
    <div className="toast toast-top toast-center z-50">
      <div className="alert alert-info">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-current shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>
          <h3 className="font-bold">New version available!</h3>
          <div className="text-xs">Click reload to update</div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleDismiss}
            className="btn btn-sm btn-ghost"
            aria-label="Dismiss update"
          >
            Later
          </button>
          <button 
            onClick={handleUpdate}
            className="btn btn-sm btn-primary"
            aria-label="Reload to update"
          >
            Reload
          </button>
        </div>
      </div>
    </div>
  );
}