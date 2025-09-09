import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './Toggle';

const meta = {
  title: 'Atoms/Toggle',
  component: Toggle,
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
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Toggle defaultChecked />
      <Toggle variant="primary" defaultChecked />
      <Toggle variant="secondary" defaultChecked />
      <Toggle variant="accent" defaultChecked />
      <Toggle variant="info" defaultChecked />
      <Toggle variant="success" defaultChecked />
      <Toggle variant="warning" defaultChecked />
      <Toggle variant="error" defaultChecked />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Toggle size="xs" defaultChecked />
      <Toggle size="sm" defaultChecked />
      <Toggle size="md" defaultChecked />
      <Toggle size="lg" defaultChecked />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Toggle />
        <span>Unchecked</span>
      </div>
      <div className="flex items-center gap-4">
        <Toggle defaultChecked />
        <span>Checked</span>
      </div>
      <div className="flex items-center gap-4">
        <Toggle disabled />
        <span>Disabled</span>
      </div>
      <div className="flex items-center gap-4">
        <Toggle disabled defaultChecked />
        <span>Disabled Checked</span>
      </div>
    </div>
  ),
};

export const WithLabels: Story = {
  render: () => (
    <div className="space-y-4">
      <label className="flex items-center gap-2 cursor-pointer">
        <Toggle variant="primary" />
        <span>Enable notifications</span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <Toggle variant="success" defaultChecked />
        <span>Auto-save enabled</span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <Toggle variant="warning" />
        <span>Dark mode</span>
      </label>
    </div>
  ),
};