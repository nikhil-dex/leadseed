'use client';

import { cn } from '@/lib/cn';

export type CampaignTabId = 'campaigns' | 'templates';

interface CampaignTab {
  id: CampaignTabId;
  label: string;
}

const TABS: CampaignTab[] = [
  { id: 'campaigns', label: 'My Campaigns' },
  { id: 'templates', label: 'Message Template' },
];

interface CampaignTabsProps {
  activeTab: CampaignTabId;
  onTabChange: (tab: CampaignTabId) => void;
  className?: string;
}

export function CampaignTabs({
  activeTab,
  onTabChange,
  className,
}: CampaignTabsProps) {
  return (
    <nav
      className={cn('flex gap-1 border-b border-border', className)}
      aria-label="Campaign sub-navigation"
    >
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'border-b-2 px-4 py-2.5 text-sm font-medium transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
            activeTab === tab.id
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          )}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
