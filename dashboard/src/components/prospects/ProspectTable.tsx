'use client';

import { cn } from '@/lib/cn';

/**
 * Placeholder for future prospect table.
 * Replace with real table when GET /leads or list-specific API is connected.
 */
interface ProspectTableProps {
  className?: string;
}

export function ProspectTable({ className }: ProspectTableProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-white shadow-sm',
        className
      )}
      role="region"
      aria-label="Prospects table"
    >
      {/* Empty placeholder – table content will be added when API is connected */}
      <div className="p-6 text-center text-sm text-muted-foreground">
        Table content placeholder
      </div>
    </div>
  );
}
