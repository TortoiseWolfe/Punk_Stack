import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal, ModalBox, ModalHeader, ModalTitle, ModalActions } from './Modal';
import { Button } from '../atoms/Button';

const meta = {
  title: 'Organisms/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
    },
    position: {
      control: 'select',
      options: ['top', 'middle', 'bottom'],
    },
    backdrop: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const ModalDemo = ({ position = 'middle', size = 'md' }: { position?: 'top' | 'middle' | 'bottom', size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full' }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} position={position}>
        <ModalBox size={size}>
          <ModalHeader>
            <ModalTitle>Modal Title</ModalTitle>
            <Button 
              size="sm" 
              variant="ghost" 
              className="btn-circle"
              onClick={() => setOpen(false)}
            >
              ✕
            </Button>
          </ModalHeader>
          <p>This is the modal content. Click outside or the X button to close.</p>
          <ModalActions>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Confirm
            </Button>
          </ModalActions>
        </ModalBox>
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: () => <ModalDemo />,
};

export const Positions: Story = {
  render: () => (
    <div className="flex gap-4">
      <ModalDemo position="top" />
      <ModalDemo position="middle" />
      <ModalDemo position="bottom" />
    </div>
  ),
};

const SizesDemo = () => {
  const [openSize, setOpenSize] = useState<string | null>(null);
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full'] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {sizes.map(size => (
        <div key={size}>
          <Button variant="primary" onClick={() => setOpenSize(size)}>
            Open {size.toUpperCase()}
          </Button>
          <Modal open={openSize === size} onClose={() => setOpenSize(null)}>
            <ModalBox size={size}>
              <ModalHeader>
                <ModalTitle>Size: {size}</ModalTitle>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="btn-circle"
                  onClick={() => setOpenSize(null)}
                >
                  ✕
                </Button>
              </ModalHeader>
              <p>This modal has size: {size}</p>
              <ModalActions>
                <Button variant="primary" onClick={() => setOpenSize(null)}>
                  Close
                </Button>
              </ModalActions>
            </ModalBox>
          </Modal>
        </div>
      ))}
    </div>
  );
};

export const Sizes: Story = {
  render: () => <SizesDemo />,
};

const FormModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open Form Modal
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalBox size="lg">
          <ModalHeader>
            <ModalTitle>Create Account</ModalTitle>
            <Button 
              size="sm" 
              variant="ghost" 
              className="btn-circle"
              onClick={() => setOpen(false)}
            >
              ✕
            </Button>
          </ModalHeader>
          <form className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" placeholder="Enter your name" className="input input-bordered w-full" />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="Enter your email" className="input input-bordered w-full" />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="Enter password" className="input input-bordered w-full" />
            </div>
          </form>
          <ModalActions>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Create Account
            </Button>
          </ModalActions>
        </ModalBox>
      </Modal>
    </>
  );
};

export const WithForm: Story = {
  render: () => <FormModal />,
};

const ConfirmModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="error" onClick={() => setOpen(true)}>
        Delete Item
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalBox size="sm">
          <ModalTitle>Confirm Deletion</ModalTitle>
          <p className="py-4">Are you sure you want to delete this item? This action cannot be undone.</p>
          <ModalActions>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="error" onClick={() => setOpen(false)}>
              Delete
            </Button>
          </ModalActions>
        </ModalBox>
      </Modal>
    </>
  );
};

export const Confirmation: Story = {
  render: () => <ConfirmModal />,
};

const LongContentModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open Long Content
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalBox size="lg">
          <ModalHeader>
            <ModalTitle>Terms and Conditions</ModalTitle>
            <Button 
              size="sm" 
              variant="ghost" 
              className="btn-circle"
              onClick={() => setOpen(false)}
            >
              ✕
            </Button>
          </ModalHeader>
          <div className="max-h-96 overflow-y-auto">
            <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p className="mb-4">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p className="mb-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            <p className="mb-4">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p className="mb-4">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p className="mb-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
          <ModalActions>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Decline
            </Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Accept
            </Button>
          </ModalActions>
        </ModalBox>
      </Modal>
    </>
  );
};

export const ScrollableContent: Story = {
  render: () => <LongContentModal />,
};