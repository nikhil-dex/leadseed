'use client';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

interface TeamUpgradeCTAProps {
  title: string;
  subtitle: string;
  actionLabel: string;
  onAction: () => void;
  className?: string;
}

export function TeamUpgradeCTA({
  title,
  subtitle,
  actionLabel,
  onAction,
  className,
}: TeamUpgradeCTAProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-border bg-white p-10 text-center shadow-sm',
        className
      )}
    >
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
      <Button onClick={onAction} className="mt-6">
        {actionLabel}
      </Button>
    </div>
  );
}
