'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';
  weight?: 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
  color?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'base' | 'info' | 'success' | 'warning' | 'error';
  align?: 'left' | 'center' | 'right' | 'justify';
  uppercase?: boolean;
  lowercase?: boolean;
  capitalize?: boolean;
  truncate?: boolean;
  font?: 'sans' | 'serif' | 'mono' | 'display';
  gradient?: boolean;
}

const defaultSizes: Record<HeadingLevel, string> = {
  h1: '5xl',
  h2: '4xl',
  h3: '3xl',
  h4: '2xl',
  h5: 'xl',
  h6: 'lg',
};

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ 
    level = 'h2',
    children,
    className,
    size,
    weight = 'bold',
    color,
    align,
    uppercase = false,
    lowercase = false,
    capitalize = false,
    truncate = false,
    font,
    gradient = false,
    ...props 
  }, ref) => {
    const Component = level;
    const effectiveSize = size || defaultSizes[level];
    
    const classes = clsx(
      // Size classes
      {
        'text-xs': effectiveSize === 'xs',
        'text-sm': effectiveSize === 'sm',
        'text-base': effectiveSize === 'base',
        'text-lg': effectiveSize === 'lg',
        'text-xl': effectiveSize === 'xl',
        'text-2xl': effectiveSize === '2xl',
        'text-3xl': effectiveSize === '3xl',
        'text-4xl': effectiveSize === '4xl',
        'text-5xl': effectiveSize === '5xl',
        'text-6xl': effectiveSize === '6xl',
        'text-7xl': effectiveSize === '7xl',
        'text-8xl': effectiveSize === '8xl',
        'text-9xl': effectiveSize === '9xl',
      },
      // Weight classes
      {
        'font-thin': weight === 'thin',
        'font-extralight': weight === 'extralight',
        'font-light': weight === 'light',
        'font-normal': weight === 'normal',
        'font-medium': weight === 'medium',
        'font-semibold': weight === 'semibold',
        'font-bold': weight === 'bold',
        'font-extrabold': weight === 'extrabold',
        'font-black': weight === 'black',
      },
      // Color classes (only if not gradient)
      !gradient && {
        'text-primary': color === 'primary',
        'text-secondary': color === 'secondary',
        'text-accent': color === 'accent',
        'text-neutral': color === 'neutral',
        'text-base-content': color === 'base',
        'text-info': color === 'info',
        'text-success': color === 'success',
        'text-warning': color === 'warning',
        'text-error': color === 'error',
      },
      // Gradient effect
      gradient && 'bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent',
      // Alignment
      {
        'text-left': align === 'left',
        'text-center': align === 'center',
        'text-right': align === 'right',
        'text-justify': align === 'justify',
      },
      // Style modifiers
      {
        'uppercase': uppercase,
        'lowercase': lowercase,
        'capitalize': capitalize,
        'truncate': truncate,
      },
      // Font family
      {
        'font-sans': font === 'sans',
        'font-serif': font === 'serif',
        'font-mono': font === 'mono',
        'font-display': font === 'display',
      },
      // Default leading for headings
      'leading-tight',
      className
    );
    
    return (
      <Component ref={ref} className={classes} {...props}>
        {children}
      </Component>
    );
  }
);

Heading.displayName = 'Heading';