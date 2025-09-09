import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta = {
  title: 'Atoms/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['bordered', 'ghost', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'],
    },
    textareaSize: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
    rows: {
      control: 'number',
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Type something...',
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: 'This is some text content in the textarea. You can edit it.',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Textarea variant="bordered" placeholder="Bordered" />
      <Textarea variant="ghost" placeholder="Ghost" />
      <Textarea variant="primary" placeholder="Primary" />
      <Textarea variant="secondary" placeholder="Secondary" />
      <Textarea variant="accent" placeholder="Accent" />
      <Textarea variant="info" placeholder="Info" />
      <Textarea variant="success" placeholder="Success" />
      <Textarea variant="warning" placeholder="Warning" />
      <Textarea variant="error" placeholder="Error" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Textarea textareaSize="xs" placeholder="Extra small textarea" />
      <Textarea textareaSize="sm" placeholder="Small textarea" />
      <Textarea textareaSize="md" placeholder="Medium textarea" />
      <Textarea textareaSize="lg" placeholder="Large textarea" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <Textarea variant="bordered" placeholder="Normal state" />
      <Textarea variant="bordered" placeholder="Disabled state" disabled />
      <Textarea variant="error" placeholder="Error state" />
      <Textarea variant="success" placeholder="Success state" />
      <Textarea variant="warning" placeholder="Warning state" />
    </div>
  ),
};

export const CustomRows: Story = {
  render: () => (
    <div className="space-y-4">
      <Textarea variant="bordered" placeholder="2 rows" rows={2} />
      <Textarea variant="bordered" placeholder="4 rows (default)" rows={4} />
      <Textarea variant="bordered" placeholder="8 rows" rows={8} />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <form className="space-y-4 w-full max-w-md">
      <div>
        <label htmlFor="bio" className="block text-sm font-medium mb-2">
          Bio
        </label>
        <Textarea
          id="bio"
          variant="bordered"
          placeholder="Tell us about yourself..."
          rows={4}
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message <span className="text-error">*</span>
        </label>
        <Textarea
          id="message"
          variant="bordered"
          placeholder="Your message here..."
          rows={6}
          required
        />
      </div>
      <div>
        <label htmlFor="notes" className="block text-sm font-medium mb-2">
          Additional Notes
        </label>
        <Textarea
          id="notes"
          variant="ghost"
          placeholder="Any additional information..."
          rows={3}
        />
      </div>
    </form>
  ),
};