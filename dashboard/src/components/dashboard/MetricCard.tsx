'use client';

import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

interface MetricCardProps {
  label: string;
  value: number | string;
  icon?: LucideIcon;
  className?: string;
}

export function MetricCard({ label, value, icon: Icon, className }: MetricCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md',
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-2xl font-semibold tabular-nums text-foreground">{value}</p>
          <p className="mt-1 text-sm text-muted-foreground">{label}</p>
        </div>
        {Icon && (
          <span className="rounded-lg bg-muted/50 p-2 text-muted-foreground">
            <Icon className="h-5 w-5" />
          </span>
        )}
      </div>
    </div>
  );
}
