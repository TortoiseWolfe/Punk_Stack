import type { Meta, StoryObj } from '@storybook/nextjs';
import { Badge } from './Badge';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'neutral', 'ghost', 'info', 'success', 'warning', 'error'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    outline: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="neutral">Neutral</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="xs" variant="primary">XS</Badge>
      <Badge size="sm" variant="primary">SM</Badge>
      <Badge size="md" variant="primary">MD</Badge>
      <Badge size="lg" variant="primary">LG</Badge>
    </div>
  ),
};

export const Outline: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge outline>Default</Badge>
      <Badge outline variant="primary">Primary</Badge>
      <Badge outline variant="secondary">Secondary</Badge>
      <Badge outline variant="accent">Accent</Badge>
      <Badge outline variant="info">Info</Badge>
      <Badge outline variant="success">Success</Badge>
      <Badge outline variant="warning">Warning</Badge>
      <Badge outline variant="error">Error</Badge>
    </div>
  ),
};

export const WithContent: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="info">New</Badge>
      <Badge variant="success">Active</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="error">Expired</Badge>
      <Badge variant="primary">v2.1.0</Badge>
      <Badge variant="secondary" size="lg">Premium</Badge>
      <Badge variant="accent" outline>Beta</Badge>
    </div>
  ),
};