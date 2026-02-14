'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ListItem } from './ListItem';
import { cn } from '@/lib/cn';

export interface ProspectList {
  id: string;
  name: string;
  count: number;
}

interface ListsSidebarProps {
  lists: ProspectList[];
  selectedListId: string | null;
  onSelectList: (id: string) => void;
  onAddList?: () => void;
  className?: string;
}

export function ListsSidebar({
  lists,
  selectedListId,
  onSelectList,
  onAddList,
  className,
}: ListsSidebarProps) {
  const [search, setSearch] = useState('');

  const filteredLists = search.trim()
    ? lists.filter((list) =>
        list.name.toLowerCase().includes(search.toLowerCase())
      )
    : lists;

  return (
    <aside
      className={cn(
        'flex w-full flex-col border-r border-border bg-white md:w-[280px] md:shrink-0',
        className
      )}
    >
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-foreground">Lists</h2>
          <Button
            onClick={onAddList}
            className="shrink-0 px-3 py-1.5 text-xs"
          >
            Add List
          </Button>
        </div>
        <input
          type="search"
          placeholder="Search lists..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={cn(
            'w-full rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
          )}
          aria-label="Search lists"
        />
      </div>
      <nav className="flex-1 overflow-auto px-2 pb-4" aria-label="Prospect lists">
        <ul className="space-y-0.5">
          {filteredLists.map((list) => (
            <li key={list.id}>
              <ListItem
                label={list.name}
                count={list.count}
                initial={list.name.charAt(0).toUpperCase()}
                isActive={selectedListId === list.id}
                onClick={() => onSelectList(list.id)}
              />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
