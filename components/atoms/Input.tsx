'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'bordered' | 'ghost' | 'filled';
  inputSize?: 'xs' | 'sm' | 'md' | 'lg';
  error?: boolean;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    variant = 'bordered',
    inputSize = 'md',
    error = false,
    fullWidth = false,
    className,
    ...props 
  }, ref) => {
    const baseClasses = 'input';
    
    const variantClasses = {
      bordered: 'input-bordered',
      ghost: 'input-ghost',
      filled: 'bg-base-200',
    };
    
    const sizeClasses = {
      xs: 'input-xs',
      sm: 'input-sm',
      md: 'input-md',
      lg: 'input-lg',
    };
    
    const classes = clsx(
      baseClasses,
      variantClasses[variant],
      sizeClasses[inputSize],
      {
        'input-error': error,
        'w-full': fullWidth,
      },
      className
    );
    
    return (
      <input
        ref={ref}
        className={classes}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';