'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Search, Download } from 'lucide-react';
import { cn } from '@/lib/cn';

interface ProspectsHeaderProps {
  selectedListName: string;
  totalCount: number;
  listDescription?: string;
  className?: string;
}

export function ProspectsHeader({
  selectedListName,
  totalCount,
  listDescription,
  className,
}: ProspectsHeaderProps) {
  const description =
    listDescription ?? `${totalCount} — this list contains all the prospects`;

  return (
    <header className={cn('flex flex-col gap-4', className)}>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Prospects</h1>
        <p className="text-base font-semibold text-foreground">{selectedListName}</p>
        <p className="text-sm sm:text-base text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-9 w-9 shrink-0 p-0"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="outline" disabled className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
        <Link
          href="#"
          className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          How to import prospects?
        </Link>
      </div>
    </header>
  );
}
