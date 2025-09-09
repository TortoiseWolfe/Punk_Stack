import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from './Heading';

const meta = {
  title: 'Atoms/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'],
    },
    weight: {
      control: { type: 'select' },
      options: ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'accent', 'neutral', 'base', 'info', 'success', 'warning', 'error'],
    },
    font: {
      control: { type: 'select' },
      options: ['sans', 'serif', 'mono', 'display'],
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right', 'justify'],
    },
    gradient: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Heading',
    level: 'h2',
  },
};

export const AllLevels: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading level="h1">Heading Level 1</Heading>
      <Heading level="h2">Heading Level 2</Heading>
      <Heading level="h3">Heading Level 3</Heading>
      <Heading level="h4">Heading Level 4</Heading>
      <Heading level="h5">Heading Level 5</Heading>
      <Heading level="h6">Heading Level 6</Heading>
    </div>
  ),
};

export const WithGradient: Story = {
  args: {
    children: 'Gradient Heading',
    level: 'h1',
    gradient: true,
  },
};

export const CustomSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading level="h3" size="9xl">Massive Heading</Heading>
      <Heading level="h3" size="5xl">Large Heading</Heading>
      <Heading level="h3" size="2xl">Medium Heading</Heading>
      <Heading level="h3" size="base">Small Heading</Heading>
      <Heading level="h3" size="xs">Tiny Heading</Heading>
    </div>
  ),
};

export const ColorVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading level="h3" color="primary">Primary Heading</Heading>
      <Heading level="h3" color="secondary">Secondary Heading</Heading>
      <Heading level="h3" color="accent">Accent Heading</Heading>
      <Heading level="h3" color="success">Success Heading</Heading>
      <Heading level="h3" color="warning">Warning Heading</Heading>
      <Heading level="h3" color="error">Error Heading</Heading>
    </div>
  ),
};

export const FontVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading level="h2" font="display">Display Font Heading</Heading>
      <Heading level="h2" font="sans">Sans Font Heading</Heading>
      <Heading level="h2" font="serif">Serif Font Heading</Heading>
      <Heading level="h2" font="mono">Mono Font Heading</Heading>
    </div>
  ),
};

export const Centered: Story = {
  args: {
    children: 'Centered Heading',
    level: 'h2',
    align: 'center',
    gradient: true,
  },
};