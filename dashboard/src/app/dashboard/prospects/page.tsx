'use client';

import { useState, useCallback } from 'react';
import {
  ListsSidebar,
  ProspectsHeader,
  EmptyState,
  ProspectTable,
} from '@/components/prospects';
import type { ProspectList } from '@/components/prospects';
import { Users } from 'lucide-react';

// Mock data – replace with GET /lists and GET /leads when API is ready
const MOCK_LISTS: ProspectList[] = [
  { id: 'all', name: 'All Prospects', count: 0 },
  { id: 'default', name: 'Default list (Leadlite)', count: 0 },
];

const MOCK_PROSPECTS: unknown[] = [];

export default function ProspectsPage() {
  const [lists] = useState<ProspectList[]>(MOCK_LISTS);
  const [prospects] = useState<unknown[]>(MOCK_PROSPECTS);
  const [selectedListId, setSelectedListId] = useState<string | null>('all');

  const selectedList = lists.find((l) => l.id === selectedListId) ?? lists[0];
  const selectedListName = selectedList?.name ?? 'All Prospects';
  const totalCount = selectedListId === 'all'
    ? prospects.length
    : selectedList?.count ?? 0;
  const hasProspects = prospects.length > 0;

  const handleSelectList = useCallback((id: string) => {
    setSelectedListId(id);
  }, []);

  const handleAddList = useCallback(() => {
    // TODO: Connect to POST /lists or modal
  }, []);

  return (
    <div className="flex h-full min-h-0 flex-col md:flex-row">
      <ListsSidebar
        lists={lists}
        selectedListId={selectedListId}
        onSelectList={handleSelectList}
        onAddList={handleAddList}
      />
      <section className="flex min-h-0 flex-1 flex-col gap-6 overflow-auto pl-0 md:pl-6" aria-label="Prospects content">
        <ProspectsHeader
          selectedListName={selectedListName}
          totalCount={selectedListId === 'all' ? prospects.length : selectedList?.count ?? 0}
          listDescription={
            selectedListId === 'all'
              ? `${prospects.length} — this list contains all the prospects`
              : undefined
          }
        />
        {hasProspects ? (
          <ProspectTable />
        ) : (
          <EmptyState
            icon={Users}
            title="Looks like you don't have any prospects yet"
            subtitle="Start by saving a LinkedIn profile."
          />
        )}
      </section>
    </div>
  );
}
