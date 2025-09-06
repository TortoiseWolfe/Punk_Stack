import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: 'bordered' | 'ghost' | 'primary' | 'secondary' | 'accent';
  inputSize?: 'xs' | 'sm' | 'md' | 'lg';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, variant = 'bordered', inputSize = 'md', className = '', ...props }, ref) => {
    const variantClasses = {
      bordered: 'input-bordered',
      ghost: 'input-ghost',
      primary: 'input-primary',
      secondary: 'input-secondary',
      accent: 'input-accent',
    };

    const sizeClasses = {
      xs: 'input-xs',
      sm: 'input-sm',
      md: '',
      lg: 'input-lg',
    };

    return (
      <div className="form-control w-full">
        {label && (
          <label className="label">
            <span className="label-text">{label}</span>
          </label>
        )}
        <input
          ref={ref}
          className={`input ${variantClasses[variant]} ${sizeClasses[inputSize]} ${error ? 'input-error' : ''} ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? 'input-error' : undefined}
          {...props}
        />
        {error && (
          <label className="label">
            <span className="label-text-alt text-error" id="input-error">
              {error}
            </span>
          </label>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';