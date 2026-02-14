'use client';

import { useState, useCallback } from 'react';
import {
  CampaignStatusCard,
  CampaignTabs,
  CampaignSearchBar,
  CampaignEmptyState,
} from '@/components/campaigns';
import type { CampaignTabId } from '@/components/campaigns';
import { Button } from '@/components/ui/Button';
import {
  PlayCircle,
  PauseCircle,
  FileEdit,
  Archive,
  Rocket,
} from 'lucide-react';

export type CampaignStats = {
  active: number;
  paused: number;
  draft: number;
  archived: number;
};

export type Campaign = {
  id: string;
  name: string;
  status: keyof CampaignStats;
  createdAt: string;
  // Extend when API is defined
};

const MOCK_CAMPAIGN_STATS: CampaignStats = {
  active: 0,
  paused: 0,
  draft: 0,
  archived: 0,
};

const MOCK_CAMPAIGNS: Campaign[] = [];

export default function CampaignsPage() {
  const [activeTab, setActiveTab] = useState<CampaignTabId>('campaigns');
  const [stats] = useState<CampaignStats>(MOCK_CAMPAIGN_STATS);
  const [campaigns] = useState<Campaign[]>(MOCK_CAMPAIGNS);
  const [search, setSearch] = useState('');

  const hasCampaigns = campaigns.length > 0;

  const handleCreateCampaign = useCallback(() => {
    // TODO: Connect to POST /campaigns or open campaign builder modal
  }, []);

  const handleStartCampaign = useCallback(() => {
    // TODO: Same as create – open builder or POST /campaigns
    handleCreateCampaign();
  }, [handleCreateCampaign]);

  return (
    <div className="space-y-6">
      {/* Top Section */}
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-foreground">
          Campaign List
        </h1>
        <CampaignTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          className="mt-4"
        />
      </div>

      {/* Status summary cards */}
      {activeTab === 'campaigns' && (
        <>
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <CampaignStatusCard
              label="Active"
              value={stats.active}
              icon={PlayCircle}
            />
            <CampaignStatusCard
              label="Paused"
              value={stats.paused}
              icon={PauseCircle}
            />
            <CampaignStatusCard
              label="Draft"
              value={stats.draft}
              icon={FileEdit}
            />
            <CampaignStatusCard
              label="Archived"
              value={stats.archived}
              icon={Archive}
            />
          </div>

          {/* Actions row */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CampaignSearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search"
            />
            <Button onClick={handleCreateCampaign} className="w-full sm:w-auto sm:shrink-0">
              Create Campaign
            </Button>
          </div>

          {/* Content: empty state or campaign list */}
          {hasCampaigns ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* TODO: Map campaigns to CampaignCard when GET /campaigns is connected */}
            </div>
          ) : (
            <CampaignEmptyState
              icon={Rocket}
              title="Start a campaign to grow your network"
              actionLabel="Start Campaign"
              onAction={handleStartCampaign}
            />
          )}
        </>
      )}

      {/* Message Template tab content placeholder */}
      {activeTab === 'templates' && (
        <div className="rounded-2xl border border-border bg-muted/30 p-10 text-center text-sm text-muted-foreground">
          Message Template section — coming soon.
        </div>
      )}
    </div>
  );
}
