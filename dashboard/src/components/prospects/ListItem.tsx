'use client';

import { cn } from '@/lib/cn';

export interface ListItemProps {
  label: string;
  count: number;
  initial: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export function ListItem({
  label,
  count,
  initial,
  isActive = false,
  onClick,
  className,
}: ListItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors',
        'hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        isActive
          ? 'bg-primary/10 text-primary'
          : 'text-foreground hover:text-foreground',
        className
      )}
    >
      <span
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold',
          isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
        )}
      >
        {initial}
      </span>
      <span className="min-w-0 flex-1 truncate">{label}</span>
      <span
        className={cn(
          'shrink-0 rounded-full px-2 py-0.5 text-xs font-medium tabular-nums',
          isActive ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
        )}
      >
        {count}
      </span>
    </button>
  );
}
