'use client';

import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

interface TeamFeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function TeamFeatureCard({
  icon: Icon,
  title,
  description,
  className,
}: TeamFeatureCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md',
        className
      )}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-3 text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
