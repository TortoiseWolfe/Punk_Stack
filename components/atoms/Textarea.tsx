'use client';

import { TextareaHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'bordered' | 'ghost' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
  textareaSize?: 'xs' | 'sm' | 'md' | 'lg';
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ variant = 'bordered', textareaSize = 'md', className, ...props }, ref) => {
    const classes = clsx(
      'textarea',
      variant && `textarea-${variant}`,
      textareaSize !== 'md' && `textarea-${textareaSize}`,
      className
    );

    return (
      <textarea ref={ref} className={classes} {...props} />
    );
  }
);

Textarea.displayName = 'Textarea';