import type { Meta, StoryObj } from '@storybook/nextjs';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
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
    indeterminate: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Checkbox>;

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
      <Checkbox defaultChecked />
      <Checkbox variant="primary" defaultChecked />
      <Checkbox variant="secondary" defaultChecked />
      <Checkbox variant="accent" defaultChecked />
      <Checkbox variant="info" defaultChecked />
      <Checkbox variant="success" defaultChecked />
      <Checkbox variant="warning" defaultChecked />
      <Checkbox variant="error" defaultChecked />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Checkbox size="xs" defaultChecked />
      <Checkbox size="sm" defaultChecked />
      <Checkbox size="md" defaultChecked />
      <Checkbox size="lg" defaultChecked />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Checkbox />
        <span>Unchecked</span>
      </div>
      <div className="flex items-center gap-4">
        <Checkbox defaultChecked />
        <span>Checked</span>
      </div>
      <div className="flex items-center gap-4">
        <Checkbox indeterminate />
        <span>Indeterminate</span>
      </div>
      <div className="flex items-center gap-4">
        <Checkbox disabled />
        <span>Disabled</span>
      </div>
      <div className="flex items-center gap-4">
        <Checkbox disabled defaultChecked />
        <span>Disabled Checked</span>
      </div>
    </div>
  ),
};

export const WithLabels: Story = {
  render: () => (
    <div className="space-y-4">
      <label className="flex items-center gap-2 cursor-pointer">
        <Checkbox variant="primary" />
        <span>I agree to the terms</span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <Checkbox variant="success" defaultChecked />
        <span>Remember me</span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <Checkbox variant="accent" />
        <span>Send me notifications</span>
      </label>
    </div>
  ),
};

export const CheckboxGroup: Story = {
  render: () => (
    <fieldset className="space-y-2">
      <legend className="font-semibold mb-2">Select features:</legend>
      <label className="flex items-center gap-2 cursor-pointer">
        <Checkbox variant="primary" defaultChecked />
        <span>Dark mode</span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <Checkbox variant="primary" defaultChecked />
        <span>Auto-save</span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <Checkbox variant="primary" />
        <span>Notifications</span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <Checkbox variant="primary" />
        <span>Analytics</span>
      </label>
    </fieldset>
  ),
};