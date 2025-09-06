'use client';

import { ThemeSwitcher } from '@/components/theme/ThemeSwitcher';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { themes } from '@/lib/themes';
import { useTheme } from '@/lib/hooks/useTheme';

export function ThemeShowcase() {
  const { theme } = useTheme();
  const currentTheme = themes[theme];

  return (
    <div className="min-h-screen bg-base-200">
      {/* Navigation */}
      <nav className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Punk Stack</a>
        </div>
        <div className="flex-none">
          <ThemeSwitcher />
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero min-h-[50vh] bg-base-100">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">
              {currentTheme?.label || theme}
            </h1>
            <p className="py-6">
              Experience 12 distinct themes across 6 punk aesthetics. 
              Each theme is carefully crafted with unique color palettes and styling.
            </p>
            <div className="badge badge-primary">{currentTheme?.category}</div>
            <div className="badge badge-secondary ml-2">{currentTheme?.mode} mode</div>
          </div>
        </div>
      </div>

      {/* Component Showcase */}
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-bold mb-8">Component Showcase</h2>
        
        {/* Theme Grid Selector */}
        <Card className="mb-8">
          <Card.Body>
            <h3 className="text-2xl font-semibold mb-4">All Themes</h3>
            <ThemeSwitcher variant="grid" />
          </Card.Body>
        </Card>

        {/* Buttons */}
        <Card className="mb-8">
          <Card.Body>
            <h3 className="text-2xl font-semibold mb-4">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="accent">Accent</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              <Button size="xs">Extra Small</Button>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
            </div>
          </Card.Body>
        </Card>

        {/* Forms */}
        <Card className="mb-8">
          <Card.Body>
            <h3 className="text-2xl font-semibold mb-4">Form Elements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Default Input" placeholder="Type something..." />
              <Input label="Primary Input" variant="primary" placeholder="Primary styled" />
              <Input label="With Error" error="This field is required" placeholder="Error state" />
              <Input label="Ghost Input" variant="ghost" placeholder="Ghost styled" />
            </div>
          </Card.Body>
        </Card>

        {/* Color Palette */}
        <Card className="mb-8">
          <Card.Body>
            <h3 className="text-2xl font-semibold mb-4">Current Theme Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {currentTheme && Object.entries(currentTheme.colors).map(([name, color]) => (
                <div key={name} className="text-center">
                  <div 
                    className="w-full h-20 rounded-lg shadow-md mb-2"
                    style={{ backgroundColor: color }}
                  />
                  <p className="text-sm font-medium">{name}</p>
                  <p className="text-xs opacity-60">{color}</p>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>

        {/* Stats */}
        <div className="stats shadow w-full mb-8">
          <div className="stat">
            <div className="stat-figure text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <div className="stat-title">Themes</div>
            <div className="stat-value text-primary">12</div>
            <div className="stat-desc">6 punk styles × 2 modes</div>
          </div>
          
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div className="stat-title">Performance</div>
            <div className="stat-value text-secondary">&lt;100ms</div>
            <div className="stat-desc">Theme switch time</div>
          </div>
          
          <div className="stat">
            <div className="stat-figure text-accent">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <div className="stat-title">Accessibility</div>
            <div className="stat-value text-accent">WCAG AA</div>
            <div className="stat-desc">Compliant</div>
          </div>
        </div>
      </div>
    </div>
  );
}