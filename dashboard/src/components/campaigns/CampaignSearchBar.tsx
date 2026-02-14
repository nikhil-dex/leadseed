'use client';

import { cn } from '@/lib/cn';

interface CampaignSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function CampaignSearchBar({
  value,
  onChange,
  placeholder = 'Search',
  className,
}: CampaignSearchBarProps) {
  return (
    <input
      type="search"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        'w-full max-w-sm rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        className
      )}
      aria-label="Search campaigns"
    />
  );
}
