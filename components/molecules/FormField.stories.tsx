import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './FormField';

const meta = {
  title: 'Molecules/FormField',
  component: FormField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['bordered', 'ghost', 'filled'],
    },
    inputSize: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
    },
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'john@example.com',
    type: 'email',
  },
};

export const WithHint: Story = {
  args: {
    label: 'Username',
    placeholder: 'Choose a username',
    hint: 'This will be your display name',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'john@example.com',
    error: 'Please enter a valid email address',
    defaultValue: 'invalid-email',
  },
};

export const Required: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    required: true,
    hint: 'Must be at least 8 characters',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Account ID',
    defaultValue: 'ACC-12345',
    disabled: true,
    hint: 'This cannot be changed',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <FormField
        label="Normal Field"
        placeholder="Enter text"
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
        error="This field has an error"
        defaultValue="Invalid input"
      />
      
      <FormField
        label="Disabled Field"
        placeholder="Cannot edit"
        disabled
        defaultValue="Disabled value"
      />
    </div>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <FormField
        label="Extra Small"
        inputSize="xs"
        placeholder="XS input"
      />
      
      <FormField
        label="Small"
        inputSize="sm"
        placeholder="SM input"
      />
      
      <FormField
        label="Medium"
        inputSize="md"
        placeholder="MD input"
      />
      
      <FormField
        label="Large"
        inputSize="lg"
        placeholder="LG input"
      />
    </div>
  ),
};

export const InputTypes: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <FormField
        label="Email"
        type="email"
        placeholder="john@example.com"
        required
      />
      
      <FormField
        label="Password"
        type="password"
        placeholder="Enter password"
        required
      />
      
      <FormField
        label="Phone Number"
        type="tel"
        placeholder="+1 (555) 123-4567"
      />
      
      <FormField
        label="Website"
        type="url"
        placeholder="https://example.com"
      />
      
      <FormField
        label="Age"
        type="number"
        placeholder="25"
        min={0}
        max={120}
      />
    </div>
  ),
};