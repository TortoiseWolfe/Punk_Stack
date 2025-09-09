'use client';

import { HTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

export interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  weight?: 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'base' | 'info' | 'success' | 'warning' | 'error' | 'muted';
  align?: 'left' | 'center' | 'right' | 'justify';
  leading?: 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose';
  truncate?: boolean | number;
  font?: 'sans' | 'serif' | 'mono';
  prose?: boolean;
}

export const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ 
    children,
    className,
    size = 'base',
    weight = 'normal',
    color = 'base',
    align = 'left',
    leading = 'normal',
    truncate = false,
    font,
    prose = false,
    ...props 
  }, ref) => {
    const classes = clsx(
      // Prose utility for article-like text
      prose && 'prose prose-base max-w-none',
      // Size classes
      !prose && {
        'text-xs': size === 'xs',
        'text-sm': size === 'sm',
        'text-base': size === 'base',
        'text-lg': size === 'lg',
        'text-xl': size === 'xl',
        'text-2xl': size === '2xl',
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
      // Line height
      {
        'leading-none': leading === 'none',
        'leading-tight': leading === 'tight',
        'leading-snug': leading === 'snug',
        'leading-normal': leading === 'normal',
        'leading-relaxed': leading === 'relaxed',
        'leading-loose': leading === 'loose',
      },
      // Truncation
      {
        'truncate': truncate === true,
        'line-clamp-1': truncate === 1,
        'line-clamp-2': truncate === 2,
        'line-clamp-3': truncate === 3,
        'line-clamp-4': truncate === 4,
        'line-clamp-5': truncate === 5,
        'line-clamp-6': truncate === 6,
      },
      // Font family
      {
        'font-sans': font === 'sans',
        'font-serif': font === 'serif',
        'font-mono': font === 'mono',
      },
      className
    );
    
    return (
      <p ref={ref} className={classes} {...props}>
        {children}
      </p>
    );
  }
);

Paragraph.displayName = 'Paragraph';