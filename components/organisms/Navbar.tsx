'use client';

import Link from 'next/link';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

export function Navbar() {
  return (
    <nav className="navbar bg-base-200 shadow-lg sticky top-0 z-50">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl font-bold">
          Punk Stack
        </Link>
        
        <div className="hidden md:flex ml-8 gap-4">
          <Link href="/" className="btn btn-ghost btn-sm">
            Home
          </Link>
          <Link href="/components" className="btn btn-ghost btn-sm">
            Components
          </Link>
          <Link href="/theme-test" className="btn btn-ghost btn-sm">
            Theme Test
          </Link>
        </div>
      </div>
      
      <div className="flex-none gap-2">
        <ThemeSwitcher />
      </div>
    </nav>
  );
}