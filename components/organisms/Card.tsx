'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'normal' | 'compact' | 'side' | 'bordered';
  padding?: 'none' | 'normal' | 'compact';
  glass?: boolean;
  imagePosition?: 'top' | 'bottom' | 'overlay';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'normal', glass = false, className, children, ...props }, ref) => {
    const classes = clsx(
      'card',
      variant === 'compact' && 'card-compact',
      variant === 'side' && 'card-side',
      variant === 'bordered' && 'card-bordered',
      glass && 'glass',
      'bg-base-100',
      'shadow-xl',
      className
    );

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'normal' | 'compact';
}

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ padding = 'normal', className, children, ...props }, ref) => {
    const classes = clsx(
      'card-body',
      padding === 'compact' && 'p-4',
      padding === 'none' && 'p-0',
      className
    );

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ as: Component = 'h2', className, children, ...props }, ref) => {
    const classes = clsx('card-title', className);

    return (
      <Component ref={ref} className={classes} {...props}>
        {children}
      </Component>
    );
  }
);

CardTitle.displayName = 'CardTitle';

export interface CardActionsProps extends HTMLAttributes<HTMLDivElement> {
  justify?: 'start' | 'center' | 'end';
}

export const CardActions = forwardRef<HTMLDivElement, CardActionsProps>(
  ({ justify = 'end', className, children, ...props }, ref) => {
    const classes = clsx(
      'card-actions',
      justify === 'start' && 'justify-start',
      justify === 'center' && 'justify-center',
      justify === 'end' && 'justify-end',
      className
    );

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

CardActions.displayName = 'CardActions';

export interface CardImageProps extends HTMLAttributes<HTMLElement> {
  src: string;
  alt: string;
  overlay?: boolean;
}

export const CardImage = forwardRef<HTMLElement, CardImageProps>(
  ({ src, alt, overlay = false, className, children, ...props }, ref) => {
    const classes = clsx(
      overlay && 'image-full',
      className
    );

    return (
      <figure ref={ref} className={classes} {...props}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} />
        {children}
      </figure>
    );
  }
);

CardImage.displayName = 'CardImage';