'use client';

export default function ThemeTest() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Theme Contrast Test</h1>
      
      {/* Color swatches */}
      <div className="grid grid-cols-4 gap-4">
        <div>
          <div className="w-full h-20 bg-base-100 border-2 border-base-content"></div>
          <p className="text-sm">base-100 / base-content</p>
        </div>
        <div>
          <div className="w-full h-20 bg-primary flex items-center justify-center">
            <span className="text-primary-content">Primary</span>
          </div>
          <p className="text-sm">primary / primary-content</p>
        </div>
        <div>
          <div className="w-full h-20 bg-secondary flex items-center justify-center">
            <span className="text-secondary-content">Secondary</span>
          </div>
          <p className="text-sm">secondary / secondary-content</p>
        </div>
        <div>
          <div className="w-full h-20 bg-accent flex items-center justify-center">
            <span className="text-accent-content">Accent</span>
          </div>
          <p className="text-sm">accent / accent-content</p>
        </div>
      </div>

      {/* Form elements */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Form Elements</h2>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Label Text (should be visible)</span>
          </label>
          <input type="text" placeholder="Placeholder text" className="input input-bordered" />
        </div>

        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Toggle with label</span>
            <input type="checkbox" className="toggle toggle-primary" />
          </label>
        </div>

        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Checkbox with label</span>
            <input type="checkbox" className="checkbox checkbox-primary" />
          </label>
        </div>

        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Radio with label</span>
            <input type="radio" name="radio-test" className="radio radio-primary" />
          </label>
        </div>
      </div>

      {/* Text on different backgrounds */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Text on Backgrounds</h2>
        
        <div className="p-4 bg-base-100">
          <p>Text on base-100 (using base-content)</p>
        </div>
        
        <div className="p-4 bg-base-200">
          <p>Text on base-200 (using base-content)</p>
        </div>
        
        <div className="p-4 bg-base-300">
          <p>Text on base-300 (using base-content)</p>
        </div>
        
        <div className="p-4 bg-neutral text-neutral-content">
          <p>Text on neutral (using neutral-content)</p>
        </div>
      </div>

      {/* Alert states */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Alert States</h2>
        
        <div className="alert alert-info">
          <span>Info alert text</span>
        </div>
        
        <div className="alert alert-success">
          <span>Success alert text</span>
        </div>
        
        <div className="alert alert-warning">
          <span>Warning alert text</span>
        </div>
        
        <div className="alert alert-error">
          <span>Error alert text</span>
        </div>
      </div>
    </div>
  );
}