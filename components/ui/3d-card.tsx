'use client';

import React from 'react';
import clsx from 'clsx';

export const CardContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={clsx('perspective-[1000px]', className)}>{children}</div>;
};

export const CardBody = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div
      className={clsx(
        'transform transition-transform duration-300 hover:rotate-y-3 hover:rotate-x-3',
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardItem = ({
  children,
  translateZ,
  as = 'div',
  className,
}: {
  children: React.ReactNode;
  translateZ?: number;
  as?: 'div' | 'p' | 'button';
  className?: string;
}) => {
  const Component = as;
  return (
    <Component
      style={{ transform: translateZ ? `translateZ(${translateZ}px)` : undefined }}
      className={clsx(className)}
    >
      {children}
    </Component>
  );
};
