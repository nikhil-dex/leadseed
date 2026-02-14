'use client';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

interface TeamEmptyStateProps {
  headline: string;
  subtext: string;
  actionLabel: string;
  onAction: () => void;
  className?: string;
}

export function TeamEmptyState({
  headline,
  subtext,
  actionLabel,
  onAction,
  className,
}: TeamEmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-border bg-white p-10 text-center shadow-sm',
        className
      )}
    >
      <h2 className="text-xl font-semibold text-foreground">{headline}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{subtext}</p>
      <Button onClick={onAction} className="mt-6">
        {actionLabel}
      </Button>
    </div>
  );
}
