'use client';

import { cn } from '@/lib/cn';

/**
 * Placeholder for future campaign card (e.g. in list/grid when GET /campaigns returns data).
 * Replace with real card content when campaign builder is connected.
 */
interface CampaignCardProps {
  className?: string;
  children?: React.ReactNode;
}

export function CampaignCard({ className, children }: CampaignCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-white p-6 shadow-sm',
        className
      )}
    >
      {children ?? null}
    </div>
  );
}
