'use client';

import { cn } from '@/lib/cn';

interface SectionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function SectionCard({ children, className, ...props }: SectionCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-white p-6 shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
