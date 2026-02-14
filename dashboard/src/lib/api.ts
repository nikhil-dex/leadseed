/**
 * API client for Leadseed backend.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('leadseed_token');
}

export async function api<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (token) (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || res.statusText);
  }
  return res.json();
}

export function getAuthUrl(): string {
  return `${API_URL}/auth/linkedin`;
}

export const tasksApi = {
  getPending: () => api<{ tasks: unknown[] }>('/tasks'),
  getRecent: (limit = 10) => api<{ tasks: unknown[] }>(`/tasks/recent?limit=${limit}`),
  create: (type: string, payload?: object) =>
    api<{ _id: string; type: string; status: string }>('/tasks', {
      method: 'POST',
      body: JSON.stringify({ type, payload: payload || {} }),
    }),
};

export type LeadOutreach = {
  messageSent?: boolean;
  invitationSent?: boolean;
  profileVisit?: boolean;
  acceptInvitation?: boolean;
  answeredMessage?: boolean;
};

export type Lead = {
  _id: string;
  name: string;
  headline: string;
  profileUrl: string;
  createdAt: string;
  messageSent?: boolean;
  invitationSent?: boolean;
  profileVisit?: boolean;
  acceptInvitation?: boolean;
  answeredMessage?: boolean;
};

export const leadsApi = {
  getLeads: (params?: { limit?: number; skip?: number }) => {
    const sp = new URLSearchParams();
    if (params?.limit) sp.set('limit', String(params.limit));
    if (params?.skip) sp.set('skip', String(params.skip));
    return api<{ leads: Lead[]; total: number }>(`/leads?${sp.toString()}`);
  },
  updateLead: (id: string, updates: LeadOutreach) =>
    api<Lead>(`/leads/${id}`, { method: 'PATCH', body: JSON.stringify(updates) }),
  getStats: () =>
    api<{
      total: number;
      messageSent: number;
      invitationSent: number;
      profileVisit: number;
      acceptInvitation: number;
      answeredMessage: number;
    }>('/leads/stats'),
};
