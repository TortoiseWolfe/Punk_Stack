'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'ghost' | 'info' | 'success' | 'warning' | 'error';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  outline?: boolean;
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ variant, size = 'md', outline = false, className, children, ...props }, ref) => {
    const classes = clsx(
      'badge',
      variant && `badge-${variant}`,
      size !== 'md' && `badge-${size}`,
      outline && 'badge-outline',
      className
    );

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';