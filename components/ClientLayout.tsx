'use client';

import { Navigation } from './Navigation';
import { InstallPrompt } from './InstallPrompt';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <div className="min-h-screen bg-base-100">
      <Navigation />
      {children}
      <InstallPrompt />
    </div>
  );
}