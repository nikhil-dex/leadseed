'use client';

import { useEffect, useState } from 'react';
import { tasksApi } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

type Task = { _id: string; type: string; status: string; createdAt: string; result?: unknown };

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tasksApi.getRecent(30).then((res) => {
      setTasks((res.tasks as Task[]) || []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <p className="text-muted-foreground">Loading tasks...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Tasks</h1>
        <p className="text-muted-foreground mt-1">Recent automation tasks (user-triggered)</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent tasks</CardTitle>
        </CardHeader>
        <CardContent>
          {tasks.length === 0 ? (
            <p className="text-muted-foreground text-sm">No tasks yet.</p>
          ) : (
            <ul className="space-y-2">
              {tasks.map((t) => (
                <li
                  key={t._id}
                  className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-sm"
                >
                  <span className="font-medium">{t.type}</span>
                  <span className={t.status === 'completed' ? 'text-green-600' : 'text-amber-600'}>
                    {t.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
