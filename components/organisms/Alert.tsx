'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  dismissible?: boolean;
  onDismiss?: () => void;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ variant, dismissible = false, onDismiss, className, children, ...props }, ref) => {
    const classes = clsx(
      'alert',
      variant && `alert-${variant}`,
      className
    );

    return (
      <div ref={ref} role="alert" className={classes} {...props}>
        {children}
        {dismissible && (
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onDismiss}
            aria-label="Dismiss"
          >
            ✕
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export interface AlertIconProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const AlertIcon = forwardRef<HTMLElement, AlertIconProps>(
  ({ className, children, ...props }, ref) => {
    const classes = clsx('shrink-0', className);

    return (
      <span ref={ref} className={classes} {...props}>
        {children}
      </span>
    );
  }
);

AlertIcon.displayName = 'AlertIcon';

export interface AlertTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';
}

export const AlertTitle = forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ as: Component = 'span', className, children, ...props }, ref) => {
    const classes = clsx('font-semibold', className);

    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <Component ref={ref as any} className={classes} {...props}>
        {children}
      </Component>
    );
  }
);

AlertTitle.displayName = 'AlertTitle';

export type AlertDescriptionProps = HTMLAttributes<HTMLDivElement>

export const AlertDescription = forwardRef<HTMLDivElement, AlertDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    const classes = clsx('text-sm opacity-90', className);

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

AlertDescription.displayName = 'AlertDescription';