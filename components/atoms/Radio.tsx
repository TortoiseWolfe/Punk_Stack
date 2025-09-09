'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ variant, size = 'md', className, ...props }, ref) => {
    const classes = clsx(
      'radio',
      variant && `radio-${variant}`,
      size !== 'md' && `radio-${size}`,
      className
    );

    return (
      <input
        ref={ref}
        type="radio"
        className={classes}
        {...props}
      />
    );
  }
);

Radio.displayName = 'Radio';