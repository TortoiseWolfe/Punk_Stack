import type { Meta, StoryObj } from '@storybook/nextjs';
import { Icon } from './Icon';

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'neutral', 'base', 'info', 'success', 'warning', 'error', 'current'],
    },
    spin: {
      control: 'boolean',
    },
    pulse: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

const StarPath = () => (
  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
);

const HeartPath = () => (
  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
);

const GearPath = () => (
  <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.65-.07-.97l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.08-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.32-.07.64-.07.97c0 .33.03.65.07.97l-2.11 1.63c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.39 1.06.73 1.69.98l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.25 1.17-.59 1.69-.98l2.49 1c.22.08.49 0 .61-.22l2-3.46c.13-.22.07-.49-.12-.64l-2.11-1.63Z" />
);

export const Default: Story = {
  args: {
    children: <StarPath />,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon size="xs"><StarPath /></Icon>
      <Icon size="sm"><StarPath /></Icon>
      <Icon size="md"><StarPath /></Icon>
      <Icon size="lg"><StarPath /></Icon>
      <Icon size="xl"><StarPath /></Icon>
      <Icon size="2xl"><StarPath /></Icon>
      <Icon size="3xl"><StarPath /></Icon>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon color="primary"><HeartPath /></Icon>
      <Icon color="secondary"><HeartPath /></Icon>
      <Icon color="accent"><HeartPath /></Icon>
      <Icon color="neutral"><HeartPath /></Icon>
      <Icon color="info"><HeartPath /></Icon>
      <Icon color="success"><HeartPath /></Icon>
      <Icon color="warning"><HeartPath /></Icon>
      <Icon color="error"><HeartPath /></Icon>
    </div>
  ),
};

export const Animated: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="text-center">
        <Icon size="2xl" spin><GearPath /></Icon>
        <p className="mt-2 text-sm">Spin</p>
      </div>
      <div className="text-center">
        <Icon size="2xl" color="error" pulse><HeartPath /></Icon>
        <p className="mt-2 text-sm">Pulse</p>
      </div>
    </div>
  ),
};