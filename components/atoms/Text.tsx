'use client';

import { HTMLAttributes, ElementType, forwardRef } from 'react';
import { clsx } from 'clsx';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  weight?: 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
  color?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'base' | 'info' | 'success' | 'warning' | 'error' | 'muted';
  align?: 'left' | 'center' | 'right' | 'justify';
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  uppercase?: boolean;
  lowercase?: boolean;
  capitalize?: boolean;
  truncate?: boolean;
  nowrap?: boolean;
  font?: 'sans' | 'serif' | 'mono' | 'display';
}

export const Text = forwardRef<HTMLElement, TextProps>(
  ({ 
    as: Component = 'span',
    children,
    className,
    size = 'base',
    weight = 'normal',
    color,
    align,
    italic = false,
    underline = false,
    strikethrough = false,
    uppercase = false,
    lowercase = false,
    capitalize = false,
    truncate = false,
    nowrap = false,
    font,
    ...props 
  }, ref) => {
    const classes = clsx(
      // Size classes
      {
        'text-xs': size === 'xs',
        'text-sm': size === 'sm',
        'text-base': size === 'base',
        'text-lg': size === 'lg',
        'text-xl': size === 'xl',
        'text-2xl': size === '2xl',
        'text-3xl': size === '3xl',
        'text-4xl': size === '4xl',
        'text-5xl': size === '5xl',
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
      // Color classes
      {
        'text-primary': color === 'primary',
        'text-secondary': color === 'secondary',
        'text-accent': color === 'accent',
        'text-neutral': color === 'neutral',
        'text-base-content': color === 'base',
        'text-base-content/70': color === 'muted',
        'text-info': color === 'info',
        'text-success': color === 'success',
        'text-warning': color === 'warning',
        'text-error': color === 'error',
      },
      // Alignment
      {
        'text-left': align === 'left',
        'text-center': align === 'center',
        'text-right': align === 'right',
        'text-justify': align === 'justify',
      },
      // Style modifiers
      {
        'italic': italic,
        'underline': underline,
        'line-through': strikethrough,
        'uppercase': uppercase,
        'lowercase': lowercase,
        'capitalize': capitalize,
        'truncate': truncate,
        'whitespace-nowrap': nowrap,
      },
      // Font family
      {
        'font-sans': font === 'sans',
        'font-serif': font === 'serif',
        'font-mono': font === 'mono',
        'font-display': font === 'display',
      },
      className
    );
    
    return (
      <Component ref={ref} className={classes} {...props}>
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';