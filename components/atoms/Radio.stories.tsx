import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';

const meta = {
  title: 'Atoms/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    defaultChecked: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'demo',
  },
};

export const Checked: Story = {
  args: {
    name: 'demo',
    defaultChecked: true,
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Radio name="variant" defaultChecked />
      <Radio name="variant" variant="primary" />
      <Radio name="variant" variant="secondary" />
      <Radio name="variant" variant="accent" />
      <Radio name="variant" variant="info" />
      <Radio name="variant" variant="success" />
      <Radio name="variant" variant="warning" />
      <Radio name="variant" variant="error" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Radio name="size" size="xs" />
      <Radio name="size" size="sm" />
      <Radio name="size" size="md" defaultChecked />
      <Radio name="size" size="lg" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Radio name="state" />
        <span>Unchecked</span>
      </div>
      <div className="flex items-center gap-4">
        <Radio name="state" defaultChecked />
        <span>Checked</span>
      </div>
      <div className="flex items-center gap-4">
        <Radio name="state" disabled />
        <span>Disabled</span>
      </div>
      <div className="flex items-center gap-4">
        <Radio name="state" disabled defaultChecked />
        <span>Disabled Checked</span>
      </div>
    </div>
  ),
};

export const RadioGroup: Story = {
  render: () => (
    <fieldset className="space-y-2">
      <legend className="font-semibold mb-2">Select a plan:</legend>
      <label className="flex items-center gap-2 cursor-pointer">
        <Radio name="plan" variant="primary" defaultChecked />
        <span>Free</span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <Radio name="plan" variant="primary" />
        <span>Pro ($9/month)</span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <Radio name="plan" variant="primary" />
        <span>Enterprise ($29/month)</span>
      </label>
    </fieldset>
  ),
};

export const HorizontalGroup: Story = {
  render: () => (
    <fieldset>
      <legend className="font-semibold mb-2">Theme preference:</legend>
      <div className="flex gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <Radio name="theme" variant="accent" defaultChecked />
          <span>Light</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <Radio name="theme" variant="accent" />
          <span>Dark</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <Radio name="theme" variant="accent" />
          <span>System</span>
        </label>
      </div>
    </fieldset>
  ),
};