import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { Alert, AlertIcon, AlertTitle, AlertDescription } from './Alert';
import { Icon } from '../atoms/Icon';

const meta = {
  title: 'Organisms/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
    dismissible: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

const InfoIcon = () => (
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
);

const SuccessIcon = () => (
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
);

const WarningIcon = () => (
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
);

const ErrorIcon = () => (
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
);

export const Default: Story = {
  render: () => (
    <Alert>
      <span>Default alert with no variant specified</span>
    </Alert>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="info">
        <AlertIcon>
          <Icon size="lg" fill="none" stroke="currentColor">
            <InfoIcon />
          </Icon>
        </AlertIcon>
        <span>Info: New software update available</span>
      </Alert>
      <Alert variant="success">
        <AlertIcon>
          <Icon size="lg" fill="none" stroke="currentColor">
            <SuccessIcon />
          </Icon>
        </AlertIcon>
        <span>Success: Your purchase has been confirmed!</span>
      </Alert>
      <Alert variant="warning">
        <AlertIcon>
          <Icon size="lg" fill="none" stroke="currentColor">
            <WarningIcon />
          </Icon>
        </AlertIcon>
        <span>Warning: Your session will expire in 5 minutes</span>
      </Alert>
      <Alert variant="error">
        <AlertIcon>
          <Icon size="lg" fill="none" stroke="currentColor">
            <ErrorIcon />
          </Icon>
        </AlertIcon>
        <span>Error: Invalid username or password</span>
      </Alert>
    </div>
  ),
};

export const WithTitleAndDescription: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="info">
        <AlertIcon>
          <Icon size="lg" fill="none" stroke="currentColor">
            <InfoIcon />
          </Icon>
        </AlertIcon>
        <div>
          <AlertTitle>Information</AlertTitle>
          <AlertDescription>
            A new version of the application is available. Please refresh to get the latest features.
          </AlertDescription>
        </div>
      </Alert>
      <Alert variant="success">
        <AlertIcon>
          <Icon size="lg" fill="none" stroke="currentColor">
            <SuccessIcon />
          </Icon>
        </AlertIcon>
        <div>
          <AlertTitle>Payment Successful</AlertTitle>
          <AlertDescription>
            Your payment of $99.99 has been processed successfully. Check your email for the receipt.
          </AlertDescription>
        </div>
      </Alert>
    </div>
  ),
};

const DismissibleAlert = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <button 
        className="btn btn-primary"
        onClick={() => setVisible(true)}
      >
        Show Alert Again
      </button>
    );
  }

  return (
    <Alert variant="info" dismissible onDismiss={() => setVisible(false)}>
      <AlertIcon>
        <Icon size="lg" fill="none" stroke="currentColor">
          <InfoIcon />
        </Icon>
      </AlertIcon>
      <span>This alert can be dismissed by clicking the X button</span>
    </Alert>
  );
};

export const Dismissible: Story = {
  render: () => <DismissibleAlert />,
};

export const SimpleAlerts: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="info">
        <span>Simple info message</span>
      </Alert>
      <Alert variant="success">
        <span>Operation completed successfully</span>
      </Alert>
      <Alert variant="warning">
        <span>Please review before continuing</span>
      </Alert>
      <Alert variant="error">
        <span>An error occurred</span>
      </Alert>
    </div>
  ),
};

export const ComplexContent: Story = {
  render: () => (
    <Alert variant="warning">
      <AlertIcon>
        <Icon size="lg" fill="none" stroke="currentColor">
          <WarningIcon />
        </Icon>
      </AlertIcon>
      <div className="flex-1">
        <AlertTitle>Storage Almost Full</AlertTitle>
        <AlertDescription>
          You have used 9.5 GB of your 10 GB storage quota.
        </AlertDescription>
        <div className="mt-2">
          <button className="btn btn-sm btn-warning">Upgrade Storage</button>
          <button className="btn btn-sm btn-ghost ml-2">Manage Files</button>
        </div>
      </div>
    </Alert>
  ),
};

const NotificationStackComponent = () => {
  const [alerts, setAlerts] = useState([
    { id: 1, variant: 'success' as const, message: 'File uploaded successfully' },
    { id: 2, variant: 'info' as const, message: '3 new messages in your inbox' },
    { id: 3, variant: 'warning' as const, message: 'Low disk space warning' },
  ]);

  const removeAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return (
    <div className="space-y-2">
      {alerts.map(alert => (
        <Alert 
          key={alert.id} 
          variant={alert.variant} 
          dismissible 
          onDismiss={() => removeAlert(alert.id)}
        >
          <span>{alert.message}</span>
        </Alert>
      ))}
      {alerts.length === 0 && (
        <button 
          className="btn btn-primary"
          onClick={() => setAlerts([
            { id: 1, variant: 'success', message: 'File uploaded successfully' },
            { id: 2, variant: 'info', message: '3 new messages in your inbox' },
            { id: 3, variant: 'warning', message: 'Low disk space warning' },
          ])}
        >
          Reset Alerts
        </button>
      )}
    </div>
  );
};

export const NotificationStack: Story = {
  render: () => <NotificationStackComponent />,
};