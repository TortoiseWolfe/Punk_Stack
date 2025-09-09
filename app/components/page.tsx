'use client';

import { FormField } from '@/components/molecules/FormField';
import { Input } from '@/components/atoms/Input';
import { Label } from '@/components/atoms/Label';
import { Button } from '@/components/atoms/Button';
import { Text } from '@/components/atoms/Text';
import { Heading } from '@/components/atoms/Heading';
import { Paragraph } from '@/components/atoms/Paragraph';
import { useState } from 'react';

export default function ComponentsPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    search: '',
    username: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateEmail = () => {
    if (!formData.email) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }));
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email' }));
    }
  };

  return (
    <div className="min-h-screen bg-base-100 p-8">
      <div className="max-w-6xl mx-auto">
        <Heading level="h1" gradient className="mb-8">Component Library</Heading>
        
        {/* Typography Section */}
        <section className="mb-12">
          <Heading level="h2" color="secondary" className="mb-6">Typography</Heading>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Headings */}
            <div className="card bg-base-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Headings</h3>
              <div className="space-y-3">
                <Heading level="h1" font="display">H1 Display Font</Heading>
                <Heading level="h2" font="sans">H2 Sans Font</Heading>
                <Heading level="h3" font="serif">H3 Serif Font</Heading>
                <Heading level="h4" font="mono">H4 Mono Font</Heading>
                <Heading level="h5" color="primary">H5 Primary Color</Heading>
                <Heading level="h6" color="secondary">H6 Secondary Color</Heading>
              </div>
            </div>
            
            {/* Text Styles */}
            <div className="card bg-base-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Text Variations</h3>
              <div className="space-y-3">
                <Text size="xs" color="muted">Extra small muted text</Text>
                <Text size="sm">Small regular text</Text>
                <Text size="base" weight="medium">Base medium weight</Text>
                <Text size="lg" weight="semibold">Large semibold text</Text>
                <Text size="xl" weight="bold" color="primary">Extra large bold primary</Text>
                <Text size="2xl" italic>2XL italic text</Text>
                <Text underline color="accent">Underlined accent text</Text>
                <Text uppercase weight="bold">Uppercase bold text</Text>
                <Text font="mono" color="info">Monospace info text</Text>
              </div>
            </div>
            
            {/* Paragraphs */}
            <div className="card bg-base-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Paragraphs</h3>
              <div className="space-y-4">
                <Paragraph size="sm" color="muted">
                  This is a small muted paragraph demonstrating how body text appears with reduced emphasis. Perfect for captions or secondary information.
                </Paragraph>
                
                <Paragraph>
                  This is a default paragraph with normal size and weight. It represents the standard body text that would be used throughout the application for main content areas.
                </Paragraph>
                
                <Paragraph size="lg" leading="relaxed">
                  This is a large paragraph with relaxed line height for improved readability. The increased spacing between lines makes longer passages more comfortable to read.
                </Paragraph>
                
                <Paragraph font="serif" align="justify">
                  This paragraph uses a serif font with justified alignment. Notice how the theme-specific font choice changes the character and readability of the text. Each punk theme brings its own typographic personality.
                </Paragraph>
              </div>
            </div>
            
            {/* Font Showcase */}
            <div className="card bg-base-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Theme Fonts</h3>
              <div className="space-y-3">
                <div>
                  <Text size="xs" weight="bold" color="neutral" uppercase>Sans Font</Text>
                  <Text font="sans" size="lg">The quick brown fox jumps over the lazy dog</Text>
                </div>
                
                <div>
                  <Text size="xs" weight="bold" color="neutral" uppercase>Serif Font</Text>
                  <Text font="serif" size="lg">The quick brown fox jumps over the lazy dog</Text>
                </div>
                
                <div>
                  <Text size="xs" weight="bold" color="neutral" uppercase>Mono Font</Text>
                  <Text font="mono" size="lg">The quick brown fox jumps over the lazy dog</Text>
                </div>
                
                <div>
                  <Text size="xs" weight="bold" color="neutral" uppercase>Display Font</Text>
                  <Text font="display" size="lg">The quick brown fox jumps over the lazy dog</Text>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Atomic Components Section */}
        <section className="mb-12">
          <Heading level="h2" color="secondary" className="mb-6">Form Atoms</Heading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Input Variants */}
            <div className="card bg-base-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Input Variants</h3>
              <div className="space-y-4">
                <div>
                  <Label>Bordered Input</Label>
                  <Input 
                    variant="bordered" 
                    placeholder="Type something..." 
                    fullWidth
                  />
                </div>
                
                <div>
                  <Label>Ghost Input</Label>
                  <Input 
                    variant="ghost" 
                    placeholder="Ghost variant" 
                    fullWidth
                  />
                </div>
                
                <div>
                  <Label>Filled Input</Label>
                  <Input 
                    variant="filled" 
                    placeholder="Filled variant" 
                    fullWidth
                  />
                </div>
                
                <div>
                  <Label error>Error State</Label>
                  <Input 
                    variant="bordered" 
                    placeholder="This has an error" 
                    error
                    fullWidth
                  />
                </div>
              </div>
            </div>
            
            {/* Input Sizes */}
            <div className="card bg-base-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Input Sizes</h3>
              <div className="space-y-4">
                <Input 
                  inputSize="xs" 
                  placeholder="Extra small (xs)" 
                  fullWidth
                />
                <Input 
                  inputSize="sm" 
                  placeholder="Small (sm)" 
                  fullWidth
                />
                <Input 
                  inputSize="md" 
                  placeholder="Medium (md) - default" 
                  fullWidth
                />
                <Input 
                  inputSize="lg" 
                  placeholder="Large (lg)" 
                  fullWidth
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Molecule Components Section */}
        <section className="mb-12">
          <Heading level="h2" color="secondary" className="mb-6">Molecules</Heading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Form Fields */}
            <div className="card bg-base-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Form Fields</h3>
              <div className="space-y-4">
                <FormField
                  label="Email Address"
                  type="email"
                  placeholder="john@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange('email')}
                  onBlur={validateEmail}
                  error={errors.email}
                  hint={!errors.email ? "We'll never share your email" : undefined}
                />
                
                <FormField
                  label="Password"
                  type="password"
                  placeholder="Enter password"
                  required
                  value={formData.password}
                  onChange={handleChange('password')}
                  hint="Must be at least 8 characters"
                />
                
                <FormField
                  label="Username"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={handleChange('username')}
                />
              </div>
            </div>
            
            {/* Different States */}
            <div className="card bg-base-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Field States</h3>
              <div className="space-y-4">
                <FormField
                  label="Normal Field"
                  placeholder="Everything is fine"
                  hint="This is a helpful hint"
                />
                
                <FormField
                  label="Required Field"
                  placeholder="This is required"
                  required
                  hint="You must fill this out"
                />
                
                <FormField
                  label="Field with Error"
                  placeholder="Something went wrong"
                  error="This field has an error message"
                  defaultValue="Invalid input"
                />
                
                <FormField
                  label="Disabled Field"
                  placeholder="Cannot edit"
                  disabled
                  defaultValue="Disabled value"
                />
              </div>
            </div>
            
            {/* Buttons */}
            <div className="card bg-base-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Button Variants</h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="accent">Accent</Button>
                <Button variant="info">Info</Button>
                <Button variant="success">Success</Button>
                <Button variant="warning">Warning</Button>
                <Button variant="error">Error</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="neutral">Neutral</Button>
              </div>
              
              <h3 className="text-lg font-semibold mt-6 mb-4">Button Sizes</h3>
              <div className="flex items-center gap-2">
                <Button size="xs" variant="primary">Extra Small</Button>
                <Button size="sm" variant="primary">Small</Button>
                <Button size="md" variant="primary">Medium</Button>
                <Button size="lg" variant="primary">Large</Button>
              </div>
              
              <h3 className="text-lg font-semibold mt-6 mb-4">Button States</h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="primary" loading>Loading</Button>
                <Button variant="secondary" disabled>Disabled</Button>
                <Button variant="accent" active>Active</Button>
                <Button variant="info" wide>Wide Button</Button>
                <Button variant="success" glass>Glass Effect</Button>
              </div>
              
              <h3 className="text-lg font-semibold mt-6 mb-4">Button Shapes</h3>
              <div className="flex gap-2">
                <Button variant="primary" shape="square">□</Button>
                <Button variant="secondary" shape="circle">●</Button>
                <Button variant="accent">Normal</Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Theme Showcase */}
        <section className="mb-12">
          <Heading level="h2" color="secondary" className="mb-6">Theme Responsiveness</Heading>
          <div className="alert alert-info">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Switch themes using the theme switcher in the navbar to see how these components adapt to each of the 12 punk themes!</span>
          </div>
        </section>
      </div>
    </div>
  );
}