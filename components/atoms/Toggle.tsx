'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ variant, size = 'md', className, ...props }, ref) => {
    const classes = clsx(
      'toggle',
      variant && `toggle-${variant}`,
      size !== 'md' && `toggle-${size}`,
      className
    );

    return (
      <input
        ref={ref}
        type="checkbox"
        className={classes}
        {...props}
      />
    );
  }
);

Toggle.displayName = 'Toggle';