'use client';

import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  className?: string;
}

export function EmptyState({ icon: Icon, title, subtitle, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-border bg-muted/30 px-6 py-12 text-center',
        className
      )}
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Icon className="h-7 w-7" />
      </span>
      <h3 className="mt-4 text-base font-semibold text-foreground">{title}</h3>
      {subtitle && (
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}
