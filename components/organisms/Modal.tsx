'use client';

import { HTMLAttributes, forwardRef, useEffect, useRef } from 'react';
import { clsx } from 'clsx';

export interface ModalProps extends HTMLAttributes<HTMLDialogElement> {
  open?: boolean;
  onClose?: () => void;
  position?: 'top' | 'middle' | 'bottom';
  backdrop?: boolean;
}

export const Modal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ open = false, onClose, position = 'middle', backdrop = true, className, children, ...props }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const modalRef = ref || dialogRef;

    useEffect(() => {
      const dialog = typeof modalRef === 'function' ? null : modalRef?.current;
      if (!dialog) return;

      if (open) {
        dialog.showModal();
      } else {
        dialog.close();
      }
    }, [open, modalRef]);

    const handleClick = (e: React.MouseEvent<HTMLDialogElement>) => {
      const dialog = e.currentTarget;
      const rect = dialog.getBoundingClientRect();
      const isInDialog = (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      );
      
      if (!isInDialog && backdrop && onClose) {
        onClose();
      }
    };

    const classes = clsx(
      'modal',
      position === 'top' && 'modal-top',
      position === 'bottom' && 'modal-bottom',
      className
    );

    return (
      <dialog
        ref={modalRef}
        className={classes}
        onClick={handleClick}
        {...props}
      >
        {children}
      </dialog>
    );
  }
);

Modal.displayName = 'Modal';

export interface ModalBoxProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const ModalBox = forwardRef<HTMLDivElement, ModalBoxProps>(
  ({ size = 'md', className, children, ...props }, ref) => {
    const sizeClasses = {
      xs: 'max-w-xs',
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      full: 'max-w-full',
    };

    const classes = clsx(
      'modal-box',
      sizeClasses[size],
      className
    );

    return (
      <div ref={ref} className={classes} onClick={(e) => e.stopPropagation()} {...props}>
        {children}
      </div>
    );
  }
);

ModalBox.displayName = 'ModalBox';

export interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, children, ...props }, ref) => {
    const classes = clsx('flex justify-between items-center mb-4', className);

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

ModalHeader.displayName = 'ModalHeader';

export interface ModalTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const ModalTitle = forwardRef<HTMLHeadingElement, ModalTitleProps>(
  ({ as: Component = 'h3', className, children, ...props }, ref) => {
    const classes = clsx('text-lg font-bold', className);

    return (
      <Component ref={ref} className={classes} {...props}>
        {children}
      </Component>
    );
  }
);

ModalTitle.displayName = 'ModalTitle';

export interface ModalActionsProps extends HTMLAttributes<HTMLDivElement> {
  justify?: 'start' | 'center' | 'end';
}

export const ModalActions = forwardRef<HTMLDivElement, ModalActionsProps>(
  ({ justify = 'end', className, children, ...props }, ref) => {
    const classes = clsx(
      'modal-action',
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

ModalActions.displayName = 'ModalActions';