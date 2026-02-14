/**
 * Leadseed extension - Service worker (Manifest V3).
 * Polls backend for pending tasks every 10s; executes extract_profile on current tab.
 * All automation is user-triggered (task created from dashboard or "Save Lead" button).
 */

const POLL_INTERVAL_MS = 10 * 1000;
// Must match server URL (dashboard uses NEXT_PUBLIC_API_URL). For production, use your API origin.
const API_BASE = 'http://localhost:4000';

async function getStoredToken() {
  const { token } = await chrome.storage.local.get('token');
  return token || null;
}

async function fetchPendingTasks(token) {
  const res = await fetch(`${API_BASE}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.tasks || [];
}

async function completeTask(taskId, token, result) {
  const res = await fetch(`${API_BASE}/tasks/${taskId}/complete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ result }),
  });
  if (!res.ok) {
    throw new Error(`Complete task failed: ${res.status}`);
  }
}

/**
 * Task executor: switch on task.type for scalability.
 * Add new cases here for future automation (e.g. extract_company, send_message).
 */
async function executeTask(task, token) {
  switch (task.type) {
    case 'extract_profile': {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab?.id || !tab.url?.startsWith('https://www.linkedin.com/in/')) {
        return; // Cannot extract: not on a profile page
      }
      const results = await chrome.tabs.sendMessage(tab.id, { action: 'EXTRACT_PROFILE' });
      const result = results?.result;
      if (result) {
        await completeTask(task._id, token, result);
      }
      break;
    }
    default:
      console.warn('Unknown task type:', task.type);
  }
}

async function pollOnce() {
  const token = await getStoredToken();
  if (!token) return;

  const tasks = await fetchPendingTasks(token).catch(() => []);
  for (const task of tasks) {
    try {
      await executeTask(task, token);
    } catch (err) {
      console.error('Task execution failed:', task._id, err);
    }
  }
}

function startPolling() {
  pollOnce();
  setInterval(pollOnce, POLL_INTERVAL_MS);
}

chrome.runtime.onInstalled.addListener(() => {
  startPolling();
});

chrome.runtime.onStartup.addListener(() => {
  startPolling();
});
