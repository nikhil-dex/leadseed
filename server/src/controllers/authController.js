/**
 * Auth controller: LinkedIn OAuth and callback.
 */
import { getLinkedInAuthUrl, handleLinkedInCallback } from '../services/authService.js';
import { env } from '../config/env.js';

export function linkedInAuth(req, res) {
  const url = getLinkedInAuthUrl();
  res.redirect(url);
}

export async function linkedInCallback(req, res) {
  const { code, error } = req.query;
  if (error) {
    return res.redirect(`${env.dashboardUrl}/login?error=${encodeURIComponent(error)}`);
  }
  if (!code) {
    return res.redirect(`${env.dashboardUrl}/login?error=no_code`);
  }
  try {
    const { user, token } = await handleLinkedInCallback(code);
    res.redirect(`${env.dashboardUrl}/auth/callback?token=${encodeURIComponent(token)}`);
  } catch (err) {
    console.error('LinkedIn callback error:', err.message);
    res.redirect(`${env.dashboardUrl}/login?error=callback_failed`);
  }
}
