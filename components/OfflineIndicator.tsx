'use client';

import { useNetworkStatus } from '@/lib/hooks/useNetworkStatus';
import { useEffect, useState } from 'react';

export function OfflineIndicator() {
  const { isOffline, justReconnected } = useNetworkStatus();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isOffline) {
      setMessage('You are offline');
      setShow(true);
    } else if (justReconnected) {
      setMessage('Back online!');
      setShow(true);
      // Hide after 3 seconds when reconnected
      const timer = setTimeout(() => setShow(false), 3000);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [isOffline, justReconnected]);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 animate-pulse">
      <div className={`alert ${isOffline ? 'alert-warning' : 'alert-success'} shadow-lg`}>
        <div className="flex items-center gap-2">
          {isOffline ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
          <span className="font-medium">{message}</span>
          {isOffline && (
            <span className="text-xs opacity-75">
              Some features may be limited
            </span>
          )}
        </div>
      </div>
    </div>
  );
}