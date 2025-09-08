'use client';

import { ThemeSwitcher } from './ThemeSwitcher';

export function Navigation() {
  return (
    <nav className="navbar bg-base-200 shadow-lg">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl font-bold">Punk Stack</a>
      </div>
      <div className="flex-none">
        <ThemeSwitcher />
      </div>
    </nav>
  );
}