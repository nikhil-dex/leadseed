'use client';

import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

interface ProgressCardProps {
  label: string;
  value: number | string;
  subtitle?: string;
  progress?: number;
  percentageLabel?: string;
  icon?: LucideIcon;
  className?: string;
}

export function ProgressCard({
  label,
  value,
  subtitle,
  progress = 0,
  percentageLabel,
  icon: Icon,
  className,
}: ProgressCardProps) {
  const progressPercent = Math.min(100, Math.max(0, progress));

  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-white p-6 shadow-sm',
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-2xl font-semibold tabular-nums text-foreground">{value}</p>
          <p className="mt-1 text-sm font-medium text-foreground">{label}</p>
          {subtitle && (
            <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <span className="rounded-lg bg-muted/50 p-2 text-muted-foreground">
            <Icon className="h-5 w-5" />
          </span>
        )}
      </div>
      {progress !== undefined && (
        <div className="mt-4">
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          {percentageLabel != null && (
            <p className="mt-1.5 text-xs text-muted-foreground">{percentageLabel}</p>
          )}
        </div>
      )}
    </div>
  );
}
