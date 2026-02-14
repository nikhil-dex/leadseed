'use client';

import { useState, useCallback } from 'react';
import {
  TeamEmptyState,
  TeamFeatureCard,
  TeamFeatureGrid,
  TeamUpgradeCTA,
} from '@/components/team';
import {
  Users2,
  LayoutDashboard,
  Share2,
  ShieldCheck,
  HandHelping,
} from 'lucide-react';

// Mock state – replace with GET /team when API is ready
const MOCK_HAS_TEAM = false;

const FEATURES = [
  {
    id: 'collaborate',
    icon: Users2,
    title: 'Collaborate & Share',
    description: 'Choose plan and seats for you and your team.',
  },
  {
    id: 'centralized',
    icon: LayoutDashboard,
    title: 'Centralized account management',
    description: 'All your data in one place.',
  },
  {
    id: 'import',
    icon: Share2,
    title: 'Cross-account lead import',
    description: 'Share prospects easily.',
  },
  {
    id: 'anti-dupe',
    icon: ShieldCheck,
    title: 'Anti-Duplication Security',
    description: 'This person looks familiar...',
  },
  {
    id: 'access',
    icon: HandHelping,
    title: 'Access to other Team accounts',
    description: 'To help your teammate if they struggle.',
  },
] as const;

export default function TeamPage() {
  const [hasTeam] = useState(MOCK_HAS_TEAM);

  const handleCreateTeam = useCallback(() => {
    // TODO: Connect to POST /team or open invite flow
  }, []);

  const handleUpgrade = useCallback(() => {
    // TODO: Connect to upgrade flow or POST /team
    handleCreateTeam();
  }, [handleCreateTeam]);

  return (
    <div className="space-y-6">
      <h1 className="text-xl sm:text-2xl font-semibold text-foreground">Team</h1>

      {!hasTeam && (
        <TeamEmptyState
          headline="You don't have a Team 👀"
          subtext="Add members to your Team ➡️ & exceed your objectives!"
          actionLabel="Create Team"
          onAction={handleCreateTeam}
        />
      )}

      {/* Feature highlight section */}
      <section aria-label="Team features">
        <TeamFeatureGrid>
          {FEATURES.map((feature) => (
            <TeamFeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </TeamFeatureGrid>
      </section>

      {/* Bottom CTA */}
      <TeamUpgradeCTA
        title="Upgrade and Create your Team"
        subtitle="Get started with team"
        actionLabel="Upgrade & Create Team"
        onAction={handleUpgrade}
      />
    </div>
  );
}
