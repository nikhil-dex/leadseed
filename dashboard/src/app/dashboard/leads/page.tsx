'use client';

import { useEffect, useState } from 'react';
import { leadsApi, type Lead } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Check, Minus, ExternalLink, Loader2 } from 'lucide-react';
import { cn } from '@/lib/cn';

type OutreachKey = keyof import('@/lib/api').LeadOutreach;

const OUTREACH_COLUMNS: { key: OutreachKey; label: string }[] = [
  { key: 'messageSent', label: 'Message sent' },
  { key: 'invitationSent', label: 'Invitation sent' },
  { key: 'profileVisit', label: 'Profile visit' },
  { key: 'acceptInvitation', label: 'Accept invitation' },
  { key: 'answeredMessage', label: 'Answered message' },
];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState<string | null>(null);

  function loadLeads() {
    setLoading(true);
    leadsApi
      .getLeads({ limit: 100, skip: 0 })
      .then((res) => {
        setLeads(res.leads);
        setTotal(res.total);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadLeads();
  }, []);

  async function toggleStat(lead: Lead, key: OutreachKey) {
    if (toggling) return;
    const value = !(lead[key] as boolean);
    setToggling(`${lead._id}-${key}`);
    try {
      await leadsApi.updateLead(lead._id, { [key]: value });
      setLeads((prev) =>
        prev.map((l) => (l._id === lead._id ? { ...l, [key]: value } : l))
      );
    } catch {
      // revert on error
      setLeads((prev) => prev.map((l) => (l._id === lead._id ? { ...l } : l)));
    } finally {
      setToggling(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <p className="text-muted-foreground">Loading leads...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-foreground">Leads</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          Track outreach: message sent, invitations, profile visits, acceptances, and replies ({total} total)
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Outreach overview</CardTitle>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Click a cell to mark an action as done. Use the extension or your CRM to perform the actual outreach.
          </p>
        </CardHeader>
        <CardContent>
          {leads.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No leads yet. Use the extension &quot;Save Lead&quot; on a LinkedIn profile or &quot;Extract Current Profile&quot; from the dashboard.
            </p>
          ) : (
            <div className="overflow-x-auto -mx-2 sm:-mx-4">
              <table className="w-full text-xs sm:text-sm min-w-[720px]">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
                    <th className="pb-2 sm:pb-3 pr-2 sm:pr-4 font-medium whitespace-nowrap text-xs sm:text-sm">Name</th>
                    {OUTREACH_COLUMNS.map(({ key, label }) => (
                      <th key={key} className="pb-2 sm:pb-3 px-1 sm:px-2 font-medium text-center whitespace-nowrap text-xs sm:text-sm">
                        <span className="hidden sm:inline">{label}</span>
                        <span className="sm:hidden">{label.split(' ')[0]}</span>
                      </th>
                    ))}
                    <th className="pb-2 sm:pb-3 pl-1 sm:pl-2 font-medium whitespace-nowrap text-xs sm:text-sm">Profile</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead._id} className="border-b border-border last:border-0 hover:bg-muted/50">
                      <td className="py-2 sm:py-3 pr-2 sm:pr-4 font-medium text-xs sm:text-sm">{lead.name || '—'}</td>
                      {OUTREACH_COLUMNS.map(({ key }) => {
                        const value = lead[key] as boolean | undefined;
                        const isOn = !!value;
                        const cellId = `${lead._id}-${key}`;
                        const busy = toggling === cellId;
                        return (
                          <td
                            key={key}
                            className="px-1 sm:px-2 py-2 sm:py-3 text-center"
                          >
                            <button
                              type="button"
                              onClick={() => toggleStat(lead, key)}
                              disabled={!!toggling}
                              className={cn(
                                'inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-md transition-colors',
                                isOn
                                  ? 'bg-primary/10 text-primary'
                                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                              )}
                              title={isOn ? 'Mark as not done' : 'Mark as done'}
                            >
                              {busy ? (
                                <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                              ) : isOn ? (
                                <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                              ) : (
                                <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                              )}
                            </button>
                          </td>
                        );
                      })}
                      <td className="py-2 sm:py-3 pl-1 sm:pl-2">
                        {lead.profileUrl ? (
                          <a
                            href={lead.profileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-0.5 sm:gap-1 text-primary hover:underline text-xs sm:text-sm"
                          >
                            View <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : (
                          '—'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
