/**
 * Leadseed content script - runs on LinkedIn profile pages (linkedin.com/in/*).
 * 1) Injects floating "Save Lead" button (user-triggered).
 * 2) On message EXTRACT_PROFILE, extracts name, headline, profile URL and returns to background.
 * Compliant: extraction only when user clicks or when task was created by user.
 */

// Must match server URL. Keep in sync with background.js and dashboard .env.local (NEXT_PUBLIC_API_URL).
const API_BASE = 'http://localhost:4000';

function getProfileUrl() {
  return window.location.href.split('?')[0];
}

function extractProfile() {
  const url = getProfileUrl();
  let name = '';
  let headline = '';

  // LinkedIn profile: name in h1, headline often in div below or in specific section
  const h1 = document.querySelector('h1');
  if (h1) name = (h1.textContent || '').trim();

  const headlineSelectors = [
    '.text-body-medium.break-words',
    '[data-test-id="headline"]',
    '.pv-top-card-v2-ctas ~ div .text-body-medium',
    '.pv-text-details__left-panel h2',
  ];
  for (const sel of headlineSelectors) {
    const el = document.querySelector(sel);
    if (el && el.closest('.pv-top-card') !== null) {
      headline = (el.textContent || '').trim();
      if (headline) break;
    }
  }
  if (!headline) {
    const sub = document.querySelector('.pv-top-card h2, .pv-top-card-v2-ctas + div');
    if (sub) headline = (sub.textContent || '').trim();
  }

  return { name, headline, profileUrl: url };
}

function createSaveLeadButton() {
  if (document.getElementById('leadseed-save-lead-btn')) return;

  const btn = document.createElement('button');
  btn.id = 'leadseed-save-lead-btn';
  btn.textContent = 'Save Lead';
  btn.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 9999;
    padding: 10px 16px;
    background: #0A66C2;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  `;
  btn.addEventListener('click', async () => {
    btn.disabled = true;
    btn.textContent = 'Saving...';
    try {
      const { token } = await chrome.storage.local.get('token');
      if (!token) {
        btn.textContent = 'Sign in first';
        setTimeout(() => { btn.textContent = 'Save Lead'; btn.disabled = false; }, 2000);
        return;
      }
      const res = await fetch(`${API_BASE}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ type: 'extract_profile', payload: {} }),
      });
      if (!res.ok) {
        btn.textContent = 'Failed';
        setTimeout(() => { btn.textContent = 'Save Lead'; btn.disabled = false; }, 2000);
        return;
      }
      btn.textContent = 'Saved!';
      setTimeout(() => { btn.textContent = 'Save Lead'; btn.disabled = false; }, 1500);
    } catch (e) {
      btn.textContent = 'Error';
      setTimeout(() => { btn.textContent = 'Save Lead'; btn.disabled = false; }, 2000);
    }
  });

  document.body.appendChild(btn);
}

// Inject floating button when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createSaveLeadButton);
} else {
  createSaveLeadButton();
}

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.action === 'EXTRACT_PROFILE') {
    const result = extractProfile();
    sendResponse({ result });
  }
  return true;
});
