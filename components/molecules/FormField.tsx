'use client';

import { forwardRef } from 'react';
import { Input, InputProps } from '@/components/atoms/Input';
import { Label } from '@/components/atoms/Label';
import { clsx } from 'clsx';

export interface FormFieldProps extends InputProps {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ 
    label,
    error,
    hint,
    required,
    id,
    className,
    fullWidth = true,
    ...inputProps 
  }, ref) => {
    // Generate ID if not provided
    const fieldId = id || `field-${Math.random().toString(36).slice(2, 9)}`;
    
    return (
      <div className={clsx('form-control', { 'w-full': fullWidth }, className)}>
        {label && (
          <Label htmlFor={fieldId} required={required} error={!!error}>
            {label}
          </Label>
        )}
        
        <Input
          ref={ref}
          id={fieldId}
          error={!!error}
          fullWidth={fullWidth}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined
          }
          {...inputProps}
        />
        
        {(error || hint) && (
          <div className="label">
            {error ? (
              <span id={`${fieldId}-error`} className="label-text-alt text-error">
                {error}
              </span>
            ) : (
              <span id={`${fieldId}-hint`} className="label-text-alt">
                {hint}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';