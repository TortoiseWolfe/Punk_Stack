'use client';

import { SVGProps, forwardRef } from 'react';
import { clsx } from 'clsx';

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  color?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'base' | 'info' | 'success' | 'warning' | 'error' | 'current';
  spin?: boolean;
  pulse?: boolean;
}

const sizeMap = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8',
  '2xl': 'h-10 w-10',
  '3xl': 'h-12 w-12',
};

const colorMap = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  neutral: 'text-neutral',
  base: 'text-base-content',
  info: 'text-info',
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
  current: 'currentColor',
};

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ size = 'md', color = 'current', spin = false, pulse = false, className, children, ...props }, ref) => {
    const classes = clsx(
      sizeMap[size],
      color !== 'current' && colorMap[color],
      spin && 'animate-spin',
      pulse && 'animate-pulse',
      className
    );

    return (
      <svg
        ref={ref}
        className={classes}
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        {children}
      </svg>
    );
  }
);

Icon.displayName = 'Icon';