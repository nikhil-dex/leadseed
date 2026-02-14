'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function ProfilePage() {
  const [copied, setCopied] = useState(false);

  function copyToken() {
    const token = typeof window !== 'undefined' ? localStorage.getItem('leadseed_token') : null;
    if (token) {
      navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Profile</h1>
        <p className="text-muted-foreground mt-1">Account linked with LinkedIn</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            You are signed in with LinkedIn. Use the Chrome extension on LinkedIn to extract and save leads. All actions are user-triggered and compliant.
          </p>
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Chrome extension</p>
            <p className="text-sm text-muted-foreground mb-2">
              Copy your token and paste it in the extension popup to connect.
            </p>
            <Button onClick={copyToken}>{copied ? 'Copied!' : 'Copy token for extension'}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
