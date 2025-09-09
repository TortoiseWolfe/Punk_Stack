'use client';

export default function ClientPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero min-h-[60vh] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Punk Stack Design System
            </h1>
            <p className="py-6 text-base-content/80">
              12 distinct themes across 6 punk aesthetics. Switch themes instantly with sub-100ms performance.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </section>

      {/* Component Showcase */}
      <section className="container mx-auto p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Component Showcase</h2>
        
        {/* Buttons */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4">Buttons</h3>
          <div className="flex flex-wrap gap-4 mb-4">
            <button className="btn">Default</button>
            <button className="btn btn-primary">Primary</button>
            <button className="btn btn-secondary">Secondary</button>
            <button className="btn btn-accent">Accent</button>
            <button className="btn btn-ghost">Ghost</button>
            <button className="btn btn-link">Link</button>
          </div>
          <div className="flex flex-wrap gap-4 mb-4">
            <button className="btn btn-outline">Outline</button>
            <button className="btn btn-outline btn-primary">Outline Primary</button>
            <button className="btn btn-outline btn-secondary">Outline Secondary</button>
            <button className="btn btn-outline btn-accent">Outline Accent</button>
          </div>
          <div className="flex flex-wrap gap-4">
            <button className="btn btn-sm">Small</button>
            <button className="btn">Normal</button>
            <button className="btn btn-lg">Large</button>
            <button className="btn btn-disabled">Disabled</button>
            <button className="btn btn-primary loading">Loading</button>
          </div>
        </div>

        {/* Cards */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4">Cards</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-primary">Primary Card</h2>
                <p>This card showcases the primary color of the current theme.</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary btn-sm">Action</button>
                </div>
              </div>
            </div>
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-secondary">Secondary Card</h2>
                <p>This card showcases the secondary color of the current theme.</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-secondary btn-sm">Action</button>
                </div>
              </div>
            </div>
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-accent">Accent Card</h2>
                <p>This card showcases the accent color of the current theme.</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-accent btn-sm">Action</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Forms */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4">Form Elements</h3>
          <div className="max-w-md space-y-6">
            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text text-base font-medium">Email</span>
              </label>
              <input type="email" placeholder="email@example.com" className="input input-bordered w-full" />
            </div>
            
            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text text-base font-medium">Message</span>
              </label>
              <textarea className="textarea textarea-bordered h-24 w-full" placeholder="Your message"></textarea>
            </div>
            
            <div className="divider">Settings</div>
            
            <div className="form-control">
              <label className="label cursor-pointer justify-between">
                <span className="label-text font-medium">Enable notifications</span>
                <input type="checkbox" className="toggle toggle-primary toggle-lg" defaultChecked />
              </label>
            </div>
            
            <div className="form-control">
              <label className="label cursor-pointer justify-between">
                <span className="label-text font-medium">Subscribe to newsletter</span>
                <input type="checkbox" className="checkbox checkbox-primary checkbox-lg" />
              </label>
            </div>
            
            <div className="form-control">
              <label className="label cursor-pointer justify-between">
                <span className="label-text font-medium">Dark mode preference</span>
                <input type="checkbox" className="toggle toggle-accent toggle-lg" />
              </label>
            </div>
            
            <div className="divider">Toggle Variants</div>
            
            <div className="flex flex-wrap gap-4 items-center">
              <input type="checkbox" className="toggle" />
              <input type="checkbox" className="toggle toggle-primary" defaultChecked />
              <input type="checkbox" className="toggle toggle-secondary" defaultChecked />
              <input type="checkbox" className="toggle toggle-accent" defaultChecked />
              <input type="checkbox" className="toggle toggle-success" defaultChecked />
              <input type="checkbox" className="toggle toggle-warning" defaultChecked />
              <input type="checkbox" className="toggle toggle-error" defaultChecked />
            </div>
            
            <div className="flex gap-2">
              <button className="btn btn-primary flex-1">Submit</button>
              <button className="btn btn-outline btn-secondary flex-1">Cancel</button>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4">Alerts</h3>
          <div className="space-y-4 max-w-2xl">
            <div className="alert">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>Default alert with neutral styling</span>
            </div>
            <div className="alert alert-info">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>Info alert for informational messages</span>
            </div>
            <div className="alert alert-success">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Success! Your action was completed.</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4">Stats</h3>
          <div className="stats shadow bg-base-200">
            <div className="stat">
              <div className="stat-figure text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <div className="stat-title">Performance</div>
              <div className="stat-value text-primary">{"<100ms"}</div>
              <div className="stat-desc">Theme switching speed</div>
            </div>
            
            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
              </div>
              <div className="stat-title">Themes</div>
              <div className="stat-value text-secondary">12</div>
              <div className="stat-desc">6 styles × 2 modes</div>
            </div>
            
            <div className="stat">
              <div className="stat-figure text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <div className="stat-title">Accessibility</div>
              <div className="stat-value text-accent">AA</div>
              <div className="stat-desc">WCAG compliance</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-200 text-base-content">
        <div>
          <p className="font-bold">
            Punk Stack Design System
          </p>
          <p>Built with Next.js, Tailwind CSS, and DaisyUI</p>
        </div>
      </footer>
    </>
  );
}