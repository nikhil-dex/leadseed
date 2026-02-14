'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';

const statusBadgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
  {
    variants: {
      status: {
        active: 'bg-green-100 text-green-800',
        inactive: 'bg-muted text-muted-foreground',
        pending: 'bg-amber-100 text-amber-800',
      },
    },
    defaultVariants: {
      status: 'inactive',
    },
  }
);

interface StatusBadgeProps extends VariantProps<typeof statusBadgeVariants> {
  children: React.ReactNode;
  className?: string;
}

export function StatusBadge({ status, children, className }: StatusBadgeProps) {
  return (
    <span className={cn(statusBadgeVariants({ status }), className)}>
      {children}
    </span>
  );
}
