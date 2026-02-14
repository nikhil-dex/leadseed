'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';
import { Bell, Search, User, ChevronDown, Menu } from 'lucide-react';

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/prospects': 'Prospects',
  '/dashboard/leads': 'Leads',
  '/dashboard/campaigns': 'Campaigns',
  '/dashboard/team': 'Team',
  '/dashboard/tasks': 'Tasks',
  '/dashboard/profile': 'Profile',
};

interface NavbarProps {
  onMenuClick?: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const pathname = usePathname();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const pageTitle = PAGE_TITLES[pathname] || 'Dashboard';

  return (
    <nav className="sticky top-0 z-30 border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onMenuClick}
            className="lg:hidden h-9 w-9 rounded-xl border border-border bg-white hover:bg-accent transition-colors flex items-center justify-center"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-semibold text-foreground truncate">
            {pageTitle}
          </h2>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="hidden sm:flex items-center gap-2 h-9 rounded-xl border border-border bg-muted/50 px-3 text-sm text-muted-foreground hover:bg-accent transition-colors min-w-[200px]"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
            <span>Search...</span>
          </button>

          <button
            type="button"
            className="sm:hidden relative h-9 w-9 rounded-xl border border-border bg-white hover:bg-accent transition-colors flex items-center justify-center"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>

          <button
            type="button"
            className="relative h-9 w-9 rounded-xl border border-border bg-white hover:bg-accent transition-colors flex items-center justify-center"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={cn(
                "flex items-center gap-2 h-9 rounded-xl border border-border bg-white hover:bg-accent transition-colors px-2",
                showUserMenu && "bg-accent"
              )}
              aria-label="User menu"
            >
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
              <ChevronDown className="h-3 w-3 text-muted-foreground hidden sm:block" />
            </button>

            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                  aria-hidden="true"
                />
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-white shadow-lg z-50 py-1">
                  <div className="px-3 py-2 border-b border-border">
                    <p className="text-sm font-medium text-foreground">My Account</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Manage your profile</p>
                  </div>
                  <div className="py-1">
                    <button
                      type="button"
                      className="w-full px-3 py-2 text-left text-sm text-foreground hover:bg-accent transition-colors"
                    >
                      Profile Settings
                    </button>
                    <button
                      type="button"
                      className="w-full px-3 py-2 text-left text-sm text-foreground hover:bg-accent transition-colors"
                    >
                      Billing
                    </button>
                    <button
                      type="button"
                      className="w-full px-3 py-2 text-left text-sm text-foreground hover:bg-accent transition-colors"
                    >
                      Help & Support
                    </button>
                  </div>
                  <div className="border-t border-border py-1">
                    <button
                      type="button"
                      className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
                      onClick={() => {
                        localStorage.removeItem('leadseed_token');
                        window.location.href = '/login';
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
