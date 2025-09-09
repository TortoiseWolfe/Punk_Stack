'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ variant, size = 'md', indeterminate = false, className, ...props }, ref) => {
    const classes = clsx(
      'checkbox',
      variant && `checkbox-${variant}`,
      size !== 'md' && `checkbox-${size}`,
      className
    );

    return (
      <input
        ref={(el) => {
          if (typeof ref === 'function') ref(el);
          else if (ref) ref.current = el;
          if (el) el.indeterminate = indeterminate;
        }}
        type="checkbox"
        className={classes}
        {...props}
      />
    );
  }
);

Checkbox.displayName = 'Checkbox';