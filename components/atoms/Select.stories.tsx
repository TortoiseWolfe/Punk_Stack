import type { Meta, StoryObj } from '@storybook/nextjs';
import { Select } from './Select';

const meta = {
  title: 'Atoms/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['bordered', 'ghost', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'],
    },
    selectSize: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <option disabled selected>Choose an option</option>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </>
    ),
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Select variant="bordered">
        <option selected>Bordered</option>
        <option>Option 2</option>
      </Select>
      <Select variant="ghost">
        <option selected>Ghost</option>
        <option>Option 2</option>
      </Select>
      <Select variant="primary">
        <option selected>Primary</option>
        <option>Option 2</option>
      </Select>
      <Select variant="secondary">
        <option selected>Secondary</option>
        <option>Option 2</option>
      </Select>
      <Select variant="accent">
        <option selected>Accent</option>
        <option>Option 2</option>
      </Select>
      <Select variant="info">
        <option selected>Info</option>
        <option>Option 2</option>
      </Select>
      <Select variant="success">
        <option selected>Success</option>
        <option>Option 2</option>
      </Select>
      <Select variant="warning">
        <option selected>Warning</option>
        <option>Option 2</option>
      </Select>
      <Select variant="error">
        <option selected>Error</option>
        <option>Option 2</option>
      </Select>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Select selectSize="xs" variant="primary">
        <option selected>Extra Small</option>
        <option>Option 2</option>
      </Select>
      <Select selectSize="sm" variant="primary">
        <option selected>Small</option>
        <option>Option 2</option>
      </Select>
      <Select selectSize="md" variant="primary">
        <option selected>Medium</option>
        <option>Option 2</option>
      </Select>
      <Select selectSize="lg" variant="primary">
        <option selected>Large</option>
        <option>Option 2</option>
      </Select>
    </div>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Select variant="bordered" className="w-full max-w-xs">
      <option disabled selected>Select a category</option>
      <optgroup label="Fruits">
        <option>Apple</option>
        <option>Orange</option>
        <option>Banana</option>
      </optgroup>
      <optgroup label="Vegetables">
        <option>Carrot</option>
        <option>Broccoli</option>
        <option>Spinach</option>
      </optgroup>
      <optgroup label="Meats">
        <option>Chicken</option>
        <option>Beef</option>
        <option>Pork</option>
      </optgroup>
    </Select>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <Select variant="bordered">
        <option selected>Normal state</option>
        <option>Option 2</option>
      </Select>
      <Select variant="bordered" disabled>
        <option selected>Disabled state</option>
        <option>Option 2</option>
      </Select>
      <Select variant="error">
        <option selected>Error state</option>
        <option>Option 2</option>
      </Select>
      <Select variant="success">
        <option selected>Success state</option>
        <option>Option 2</option>
      </Select>
    </div>
  ),
};

export const Countries: Story = {
  render: () => (
    <Select variant="bordered" className="w-full max-w-xs">
      <option disabled selected>Select your country</option>
      <option value="us">🇺🇸 United States</option>
      <option value="ca">🇨🇦 Canada</option>
      <option value="uk">🇬🇧 United Kingdom</option>
      <option value="de">🇩🇪 Germany</option>
      <option value="fr">🇫🇷 France</option>
      <option value="jp">🇯🇵 Japan</option>
      <option value="au">🇦🇺 Australia</option>
      <option value="br">🇧🇷 Brazil</option>
    </Select>
  ),
};