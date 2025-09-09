import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
  title: 'Atoms/Input',
  component: Input,
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
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Type something...',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <Input variant="bordered" placeholder="Bordered input" fullWidth />
      <Input variant="ghost" placeholder="Ghost input" fullWidth />
      <Input variant="filled" placeholder="Filled input" fullWidth />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <Input inputSize="xs" placeholder="Extra small" fullWidth />
      <Input inputSize="sm" placeholder="Small" fullWidth />
      <Input inputSize="md" placeholder="Medium (default)" fullWidth />
      <Input inputSize="lg" placeholder="Large" fullWidth />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <Input placeholder="Normal input" fullWidth />
      <Input placeholder="Error state" error fullWidth />
      <Input placeholder="Disabled input" disabled fullWidth />
      <Input placeholder="Read only" readOnly defaultValue="Can't edit this" fullWidth />
    </div>
  ),
};

export const Types: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <Input type="text" placeholder="Text input" fullWidth />
      <Input type="email" placeholder="Email input" fullWidth />
      <Input type="password" placeholder="Password input" fullWidth />
      <Input type="number" placeholder="Number input" fullWidth />
      <Input type="search" placeholder="Search input" fullWidth />
      <Input type="tel" placeholder="Phone input" fullWidth />
      <Input type="url" placeholder="URL input" fullWidth />
    </div>
  ),
};

export const WithValue: Story = {
  args: {
    defaultValue: 'Pre-filled value',
    fullWidth: true,
  },
};