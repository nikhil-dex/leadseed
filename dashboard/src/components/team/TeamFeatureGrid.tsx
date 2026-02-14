'use client';

import { type ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface TeamFeatureGridProps {
  children: ReactNode;
  className?: string;
}

export function TeamFeatureGrid({ children, className }: TeamFeatureGridProps) {
  return (
    <div
      className={cn(
        'grid gap-6 grid-cols-1 md:grid-cols-2',
        className
      )}
    >
      {children}
    </div>
  );
}
