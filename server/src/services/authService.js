/**
 * Auth service: LinkedIn OAuth and JWT issuance.
 * Flow: dashboard redirects to LinkedIn -> callback exchanges code for token,
 * fetches profile, upserts user, returns JWT.
 */
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { User } from '../models/User.js';

const LINKEDIN_TOKEN_URL = 'https://www.linkedin.com/oauth/v2/accessToken';
const LINKEDIN_PROFILE_URL = 'https://api.linkedin.com/v2/userinfo';

/**
 * Exchange authorization code for access token and fetch user profile.
 */
export async function handleLinkedInCallback(code) {
  const { data: tokenData } = await axios.post(
    LINKEDIN_TOKEN_URL,
    new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id: env.linkedin.clientId,
      client_secret: env.linkedin.clientSecret,
      redirect_uri: env.linkedin.callbackUrl,
    }).toString(),
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
  );

  const { data: profile } = await axios.get(LINKEDIN_PROFILE_URL, {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });

  let user;
  try {
    user = await User.findOneAndUpdate(
      { linkedinId: profile.sub },
      {
        linkedinId: profile.sub,
        name: profile.name || '',
        email: profile.email || '',
        profilePicture: profile.picture || '',
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
  } catch (err) {
    const isEmailDuplicate =
      err.code === 11000 &&
      (err.keyPattern?.email || /email_1|dup key.*email/i.test(String(err.message)));
    if (isEmailDuplicate) {
      throw new Error(
        'Duplicate email: another account already uses this email. The app identifies users by LinkedIn ID; remove the unique index on email (e.g. run User.syncIndexes() after connect or drop index email_1 in MongoDB).'
      );
    }
    throw err;
  }

  const token = jwt.sign(
    { userId: user._id.toString() },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );

  return { user, token };
}

/**
 * Build LinkedIn OAuth authorization URL for "Sign in with LinkedIn".
 * Requires the app to have "Sign In with LinkedIn using OpenID Connect" under Products in the LinkedIn Developer Portal; otherwise LinkedIn returns invalid_scope_error.
 */
export function getLinkedInAuthUrl() {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: env.linkedin.clientId,
    redirect_uri: env.linkedin.callbackUrl,
    scope: 'openid profile email',
    state: Math.random().toString(36).slice(2),
  });
  return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
}
