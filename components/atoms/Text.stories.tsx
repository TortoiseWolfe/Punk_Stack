import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta = {
  title: 'Atoms/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'],
    },
    weight: {
      control: { type: 'select' },
      options: ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'accent', 'neutral', 'base', 'info', 'success', 'warning', 'error', 'muted'],
    },
    font: {
      control: { type: 'select' },
      options: ['sans', 'serif', 'mono', 'display'],
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right', 'justify'],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-2">
      <Text size="xs">Extra Small Text</Text><br />
      <Text size="sm">Small Text</Text><br />
      <Text size="base">Base Text</Text><br />
      <Text size="lg">Large Text</Text><br />
      <Text size="xl">Extra Large Text</Text><br />
      <Text size="2xl">2XL Text</Text><br />
      <Text size="3xl">3XL Text</Text><br />
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div className="space-y-2">
      <Text weight="thin">Thin Weight</Text><br />
      <Text weight="light">Light Weight</Text><br />
      <Text weight="normal">Normal Weight</Text><br />
      <Text weight="medium">Medium Weight</Text><br />
      <Text weight="semibold">Semibold Weight</Text><br />
      <Text weight="bold">Bold Weight</Text><br />
      <Text weight="extrabold">Extrabold Weight</Text><br />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-2">
      <Text color="primary">Primary Color</Text><br />
      <Text color="secondary">Secondary Color</Text><br />
      <Text color="accent">Accent Color</Text><br />
      <Text color="neutral">Neutral Color</Text><br />
      <Text color="info">Info Color</Text><br />
      <Text color="success">Success Color</Text><br />
      <Text color="warning">Warning Color</Text><br />
      <Text color="error">Error Color</Text><br />
      <Text color="muted">Muted Color</Text><br />
    </div>
  ),
};

export const Fonts: Story = {
  render: () => (
    <div className="space-y-2">
      <Text font="sans" size="lg">Sans Font - Modern and clean</Text><br />
      <Text font="serif" size="lg">Serif Font - Classic and elegant</Text><br />
      <Text font="mono" size="lg">Mono Font - Technical and precise</Text><br />
      <Text font="display" size="lg">Display Font - Bold and expressive</Text><br />
    </div>
  ),
};

export const Styles: Story = {
  render: () => (
    <div className="space-y-2">
      <Text italic>Italic text for emphasis</Text><br />
      <Text underline>Underlined text for links</Text><br />
      <Text strikethrough>Strikethrough for removed content</Text><br />
      <Text uppercase weight="bold">Uppercase bold text</Text><br />
      <Text capitalize>Capitalized Text For Titles</Text><br />
    </div>
  ),
};