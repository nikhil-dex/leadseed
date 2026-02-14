'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('leadseed_token') : null;
    if (!token) router.replace('/login');
  }, [router]);

  return (
    <div className="flex min-h-screen bg-muted/30">
      <Sidebar />
      <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 pt-16 lg:pt-6">{children}</main>
    </div>
  );
}
