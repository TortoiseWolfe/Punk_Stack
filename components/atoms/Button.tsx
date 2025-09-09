'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'ghost' | 'link' | 'outline' | 'neutral';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  shape?: 'normal' | 'circle' | 'square';
  loading?: boolean;
  wide?: boolean;
  block?: boolean;
  active?: boolean;
  glass?: boolean;
  noAnimation?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children,
    className,
    variant,
    size = 'md',
    shape = 'normal',
    loading = false,
    wide = false,
    block = false,
    active = false,
    glass = false,
    noAnimation = false,
    disabled,
    type = 'button',
    ...props 
  }, ref) => {
    const classes = clsx(
      'btn',
      {
        'btn-primary': variant === 'primary',
        'btn-secondary': variant === 'secondary',
        'btn-accent': variant === 'accent',
        'btn-info': variant === 'info',
        'btn-success': variant === 'success',
        'btn-warning': variant === 'warning',
        'btn-error': variant === 'error',
        'btn-ghost': variant === 'ghost',
        'btn-link': variant === 'link',
        'btn-outline': variant === 'outline',
        'btn-neutral': variant === 'neutral',
        'btn-xs': size === 'xs',
        'btn-sm': size === 'sm',
        'btn-md': size === 'md',
        'btn-lg': size === 'lg',
        'btn-circle': shape === 'circle',
        'btn-square': shape === 'square',
        'btn-wide': wide,
        'btn-block': block,
        'btn-active': active,
        'glass': glass,
        'no-animation': noAnimation,
        'loading': loading,
      },
      className
    );
    
    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        type={type}
        {...props}
      >
        {loading && <span className="loading loading-spinner"></span>}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';