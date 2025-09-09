import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardBody, CardTitle, CardActions, CardImage } from './Card';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';

const meta = {
  title: 'Organisms/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['normal', 'compact', 'side', 'bordered'],
    },
    padding: {
      control: 'select',
      options: ['none', 'normal', 'compact'],
    },
    glass: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-96">
      <CardBody>
        <CardTitle>Card Title</CardTitle>
        <p>This is a basic card with some content. Cards are useful for grouping related information.</p>
        <CardActions>
          <Button variant="primary">Action</Button>
        </CardActions>
      </CardBody>
    </Card>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Card className="w-96">
      <CardImage 
        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" 
        alt="Shoes"
      />
      <CardBody>
        <CardTitle>Shoes!</CardTitle>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <CardActions>
          <Button variant="primary">Buy Now</Button>
        </CardActions>
      </CardBody>
    </Card>
  ),
};

export const SideImage: Story = {
  render: () => (
    <Card variant="side" className="max-w-2xl">
      <CardImage 
        src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp" 
        alt="Movie"
        className="w-48"
      />
      <CardBody>
        <CardTitle>New movie is released!</CardTitle>
        <p>Click the button to watch on Jetflix app.</p>
        <CardActions>
          <Button variant="primary">Watch</Button>
        </CardActions>
      </CardBody>
    </Card>
  ),
};

export const Compact: Story = {
  render: () => (
    <Card variant="compact" className="w-96">
      <CardImage 
        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" 
        alt="Shoes"
      />
      <CardBody padding="compact">
        <CardTitle>Compact Card</CardTitle>
        <p>This card has reduced padding for a more compact look.</p>
        <CardActions>
          <Button size="sm" variant="primary">Details</Button>
        </CardActions>
      </CardBody>
    </Card>
  ),
};

export const Glass: Story = {
  render: () => (
    <div className="p-8 bg-gradient-to-br from-primary to-secondary">
      <Card glass className="w-96">
        <CardBody>
          <CardTitle>Glass Card</CardTitle>
          <p>This card has a glass morphism effect that works well on colorful backgrounds.</p>
          <CardActions>
            <Button variant="ghost">Learn More</Button>
          </CardActions>
        </CardBody>
      </Card>
    </div>
  ),
};

export const WithBadges: Story = {
  render: () => (
    <Card className="w-96">
      <CardBody>
        <div className="flex gap-2 mb-2">
          <Badge variant="primary">New</Badge>
          <Badge variant="secondary">Popular</Badge>
        </div>
        <CardTitle>Product Name</CardTitle>
        <p>This card demonstrates how badges can be used to highlight important information.</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl font-bold">$99.99</span>
          <CardActions>
            <Button variant="primary">Add to Cart</Button>
          </CardActions>
        </div>
      </CardBody>
    </Card>
  ),
};

export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardBody>
          <CardTitle as="h3">Card 1</CardTitle>
          <p>First card in the grid.</p>
          <CardActions>
            <Button size="sm">Action</Button>
          </CardActions>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CardTitle as="h3">Card 2</CardTitle>
          <p>Second card in the grid.</p>
          <CardActions>
            <Button size="sm">Action</Button>
          </CardActions>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CardTitle as="h3">Card 3</CardTitle>
          <p>Third card in the grid.</p>
          <CardActions>
            <Button size="sm">Action</Button>
          </CardActions>
        </CardBody>
      </Card>
    </div>
  ),
};

export const Bordered: Story = {
  render: () => (
    <Card variant="bordered" className="w-96">
      <CardBody>
        <CardTitle>Bordered Card</CardTitle>
        <p>This card has a subtle border instead of a shadow.</p>
        <CardActions>
          <Button variant="outline">Cancel</Button>
          <Button variant="primary">Confirm</Button>
        </CardActions>
      </CardBody>
    </Card>
  ),
};