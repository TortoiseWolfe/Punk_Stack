'use client';

import { LabelHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  error?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, required, error, className, ...props }, ref) => {
    const classes = clsx(
      'label',
      {
        'text-error': error,
      },
      className
    );
    
    return (
      <label ref={ref} className={classes} {...props}>
        <span className="label-text">
          {children}
          {required && <span className="text-error ml-1">*</span>}
        </span>
      </label>
    );
  }
);

Label.displayName = 'Label';