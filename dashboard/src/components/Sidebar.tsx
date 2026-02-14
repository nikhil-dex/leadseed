'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/cn';
import {
  LayoutDashboard,
  Users,
  UserSearch,
  ListTodo,
  User,
  LogOut,
  Megaphone,
  UsersRound,
  Menu,
  X,
} from 'lucide-react';

const nav = [
  { href: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { href: '/dashboard/prospects', label: 'Prospects', icon: UserSearch },
  { href: '/dashboard/leads', label: 'Leads', icon: Users },
  { href: '/dashboard/campaigns', label: 'Campaigns', icon: Megaphone },
  { href: '/dashboard/team', label: 'Team', icon: UsersRound },
  { href: '/dashboard/tasks', label: 'Tasks', icon: ListTodo },
  { href: '/dashboard/profile', label: 'Profile', icon: User },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  function handleLogout() {
    localStorage.removeItem('leadseed_token');
    router.replace('/login');
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-white border border-border shadow-sm hover:bg-accent transition-colors"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          'w-56 border-r border-border bg-white flex flex-col min-h-screen',
          'lg:relative lg:translate-x-0',
          'fixed inset-y-0 left-0 z-50 transition-transform duration-300',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="p-4 border-b border-border flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-lg text-foreground">
            <Image src="/seed.png" alt="Leadseed" width={28} height={28} className="rounded" />
            Leadseed
          </Link>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-accent transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 p-2 space-y-0.5">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                pathname === href
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-2 border-t border-border">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
