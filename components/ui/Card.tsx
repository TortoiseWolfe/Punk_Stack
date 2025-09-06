import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  compact?: boolean;
  bordered?: boolean;
}

export function Card({ 
  children, 
  className = '', 
  compact = false,
  bordered = false 
}: CardProps) {
  return (
    <div className={`card bg-base-100 shadow-xl ${compact ? 'card-compact' : ''} ${bordered ? 'card-bordered' : ''} ${className}`}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

Card.Header = function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`card-body ${className}`}>
      <h2 className="card-title">{children}</h2>
    </div>
  );
};

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

Card.Body = function CardBody({ children, className = '' }: CardBodyProps) {
  return <div className={`card-body ${className}`}>{children}</div>;
};

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

Card.Footer = function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`card-actions justify-end p-4 ${className}`}>
      {children}
    </div>
  );
};