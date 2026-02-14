'use client';

import { type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

interface CampaignEmptyStateProps {
  icon: LucideIcon;
  title: string;
  actionLabel: string;
  onAction: () => void;
  className?: string;
}

export function CampaignEmptyState({
  icon: Icon,
  title,
  actionLabel,
  onAction,
  className,
}: CampaignEmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-border bg-muted/30 p-10 text-center shadow-sm',
        className
      )}
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Icon className="h-7 w-7" />
      </span>
      <h3 className="mt-4 text-base font-semibold text-foreground">{title}</h3>
      <Button onClick={onAction} className="mt-6">
        {actionLabel}
      </Button>
    </div>
  );
}
