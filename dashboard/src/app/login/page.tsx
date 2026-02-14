'use client';

import { Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { getAuthUrl } from '@/lib/api';

function LoginContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-white p-8 shadow-sm">
        <div className="flex justify-center mb-2">
          <Image src="/seed.png" alt="Leadseed" width={48} height={48} className="rounded" />
        </div>
        <h1 className="text-2xl font-semibold text-center text-foreground">Leadseed</h1>
        <p className="text-center text-muted-foreground mt-2 text-sm">
          Sign in to manage leads and tasks
        </p>
        {error && (
          <div className="mt-4 text-sm text-red-600 bg-red-50 rounded-lg p-3 space-y-1">
            {error === 'no_code' && <p>Missing authorization code.</p>}
            {error === 'callback_failed' && <p>LinkedIn sign-in failed. Try again.</p>}
            {error === 'invalid_scope_error' && (
              <>
                <p className="font-medium">LinkedIn scope not authorized.</p>
                <p className="mt-1 text-xs">
                  Enable &quot;Sign In with LinkedIn using OpenID Connect&quot; in your app: LinkedIn Developer Portal → My Apps → your app → <strong>Products</strong> → request/add that product. Then try again.
                </p>
              </>
            )}
            {!['no_code', 'callback_failed', 'invalid_scope_error'].includes(error) && (
              <p>Error: {error}</p>
            )}
          </div>
        )}
        <a
          href={getAuthUrl()}
          className="mt-6 flex items-center justify-center gap-2 w-full rounded-lg bg-[#0A66C2] text-white py-3 px-4 font-medium hover:bg-[#004182] transition-colors"
        >
          <LinkedInIcon />
          Sign in with LinkedIn
        </a>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          By signing in you agree to use Leadseed in compliance with LinkedIn&apos;s terms.
        </p>
      </div>
    </div>
  );
}

function LinkedInIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
