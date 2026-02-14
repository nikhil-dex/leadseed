'use client';

import { useEffect, useState } from 'react';
import {
  MetricCard,
  StatusBadge,
  ProgressCard,
  SectionHeader,
} from '@/components/dashboard';
import { Button } from '@/components/ui/Button';
import {
  Users,
  Search,
  BarChart3,
  UserPlus,
  Send,
  MessageSquare,
  Eye,
  UserCheck,
  Reply,
} from 'lucide-react';
import { cn } from '@/lib/cn';

export type DashboardStats = {
  followers: number;
  searchAppearances: number;
  postImpressions: number;
  connections: number;
  activeCampaigns: number;
  queuedActions: number;
  invitationsSent: number;
  invitationProgress: number;
  messagesSent: number;
  messageProgress: number;
  profileVisits: number;
  visitProgress: number;
  acceptedInvitations: number;
  acceptanceRate: number;
  answeredMessages: number;
  responseRate: number;
  profileName: string;
  profileConnections: number;
  profilePending: number;
  profileViews: number;
};

const DEFAULT_DASHBOARD_STATS: DashboardStats = {
  followers: 0,
  searchAppearances: 0,
  postImpressions: 0,
  connections: 0,
  activeCampaigns: 0,
  queuedActions: 0,
  invitationsSent: 0,
  invitationProgress: 0,
  messagesSent: 0,
  messageProgress: 0,
  profileVisits: 0,
  visitProgress: 0,
  acceptedInvitations: 0,
  acceptanceRate: 0,
  answeredMessages: 0,
  responseRate: 0,
  profileName: 'Nikhil',
  profileConnections: 0,
  profilePending: 0,
  profileViews: 0,
};

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>(DEFAULT_DASHBOARD_STATS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Auth guard: layout already redirects if no token; here we just load data.
    // TODO: Replace with real API e.g. dashboardApi.getStats().then(setStats)
    setStats(DEFAULT_DASHBOARD_STATS);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
          Hello, {stats.profileName} 👋
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Here's an overview of your LinkedIn activity and campaigns
        </p>
      </div>

      {/* Row 1 — LinkedIn Metrics Cards */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Followers"
          value={stats.followers}
          icon={Users}
        />
        <MetricCard
          label="Search Appearances"
          value={stats.searchAppearances}
          icon={Search}
        />
        <MetricCard
          label="Post Impressions"
          value={stats.postImpressions}
          icon={BarChart3}
        />
        <MetricCard
          label="Connections"
          value={stats.connections}
          icon={UserPlus}
        />
      </div>

      {/* Prospecting Status Section */}
      <div className="grid gap-6 lg:gap-6 lg:grid-cols-2">
        <div className="space-y-4 sm:space-y-6">
          <SectionHeader
            title="Prospecting Status"
            subtitle="Campaign and queue overview"
          />
          <div className="rounded-2xl border border-border bg-white p-4 sm:p-6 shadow-sm">
            <div className="flex flex-wrap items-center gap-4">
              <StatusBadge status="inactive">Inactive</StatusBadge>
            </div>
            <dl className="mt-4 sm:mt-6 grid gap-4 grid-cols-2">
              <div>
                <dt className="text-xs sm:text-sm font-medium text-muted-foreground">
                  Active Campaigns
                </dt>
                <dd className="mt-1 text-xl sm:text-2xl font-semibold tabular-nums text-foreground">
                  {stats.activeCampaigns}
                </dd>
              </div>
              <div>
                <dt className="text-xs sm:text-sm font-medium text-muted-foreground">
                  Queued Actions
                </dt>
                <dd className="mt-1 text-xl sm:text-2xl font-semibold tabular-nums text-foreground">
                  {stats.queuedActions}
                </dd>
              </div>
            </dl>
            <Button
              className="mt-4 sm:mt-6 w-full sm:w-auto"
              disabled
            >
              Create Campaign
            </Button>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6 lg:pt-11">
          <SectionHeader title="Profile Summary" />
          <div className="rounded-2xl border border-border bg-white p-4 sm:p-6 shadow-sm">
            <p className="text-base sm:text-lg font-semibold text-foreground">
              {stats.profileName}
            </p>
            <dl className="mt-3 sm:mt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <dt className="text-muted-foreground">Connections</dt>
                <dd className="font-medium tabular-nums">{stats.profileConnections}</dd>
              </div>
              <div className="flex justify-between text-sm">
                <dt className="text-muted-foreground">Pending</dt>
                <dd className="font-medium tabular-nums">{stats.profilePending}</dd>
              </div>
              <div className="flex justify-between text-sm">
                <dt className="text-muted-foreground">Profile Views</dt>
                <dd className="font-medium tabular-nums">{stats.profileViews}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Campaign Details Section */}
      <div>
        <SectionHeader
          title="Campaign Details"
          subtitle="Metrics for selected campaign"
        />
        <div className="mb-4 sm:mb-6">
          <label htmlFor="campaign-select" className="sr-only">
            Select Campaign
          </label>
          <select
            id="campaign-select"
            disabled
            className={cn(
              'w-full max-w-xs rounded-xl border border-border bg-white px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-foreground',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-60'
            )}
            defaultValue=""
          >
            <option value="">No Campaign</option>
          </select>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
          <ProgressCard
            label="Invitations Sent"
            value={stats.invitationsSent}
            progress={stats.invitationProgress}
            percentageLabel={`${stats.invitationProgress}% of goal`}
            icon={Send}
          />
          <ProgressCard
            label="Messages Sent"
            value={stats.messagesSent}
            progress={stats.messageProgress}
            percentageLabel={`${stats.messageProgress}% of goal`}
            icon={MessageSquare}
          />
          <ProgressCard
            label="Profile Visits"
            value={stats.profileVisits}
            progress={stats.visitProgress}
            percentageLabel={`${stats.visitProgress}% of goal`}
            icon={Eye}
          />
          <ProgressCard
            label="Accepted Invitations"
            value={stats.acceptedInvitations}
            subtitle={`${stats.acceptanceRate}% Acceptance Rate`}
            icon={UserCheck}
          />
          <ProgressCard
            label="Answered Messages"
            value={stats.answeredMessages}
            subtitle={`${stats.responseRate}% Response Rate`}
            icon={Reply}
          />
        </div>
      </div>
    </div>
  );
}
