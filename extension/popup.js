/**
 * Popup: persist JWT in chrome.storage for background and content scripts.
 * User copies token from dashboard (e.g. from a "Copy token for extension" control) and pastes here.
 */

document.getElementById('save').addEventListener('click', async () => {
  const input = document.getElementById('token');
  const status = document.getElementById('status');
  let token = (input.value || '').trim();
  if (token.startsWith('Bearer ')) token = token.slice(7).trim();
  if (!token) {
    status.textContent = 'Enter a token.';
    status.className = 'status error';
    return;
  }
  await chrome.storage.local.set({ token });
  status.textContent = 'Token saved. You can close this.';
  status.className = 'status';
  input.value = '';
});

chrome.storage.local.get('token', (data) => {
  if (data.token) {
    document.getElementById('status').textContent = 'Token already set. Replace above if needed.';
  }
});
