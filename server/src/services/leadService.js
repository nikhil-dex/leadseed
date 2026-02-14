/**
 * Lead service: list and manage saved leads.
 */
import { Lead } from '../models/Lead.js';

export async function getLeads(userId, options = {}) {
  const { limit = 50, skip = 0 } = options;
  const [items, total] = await Promise.all([
    Lead.find({ userId }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Lead.countDocuments({ userId }),
  ]);
  return { items, total };
}

const ALLOWED_STATS = ['messageSent', 'invitationSent', 'profileVisit', 'acceptInvitation', 'answeredMessage'];

export async function updateLeadStats(userId, leadId, updates) {
  const safe = {};
  for (const key of ALLOWED_STATS) {
    if (updates[key] !== undefined) safe[key] = Boolean(updates[key]);
  }
  if (Object.keys(safe).length === 0) return null;
  const lead = await Lead.findOneAndUpdate(
    { _id: leadId, userId },
    { $set: safe },
    { new: true }
  ).lean();
  return lead;
}

export async function getLeadStats(userId) {
  const [total, messageSent, invitationSent, profileVisit, acceptInvitation, answeredMessage] =
    await Promise.all([
      Lead.countDocuments({ userId }),
      Lead.countDocuments({ userId, messageSent: true }),
      Lead.countDocuments({ userId, invitationSent: true }),
      Lead.countDocuments({ userId, profileVisit: true }),
      Lead.countDocuments({ userId, acceptInvitation: true }),
      Lead.countDocuments({ userId, answeredMessage: true }),
    ]);
  return {
    total,
    messageSent,
    invitationSent,
    profileVisit,
    acceptInvitation,
    answeredMessage,
  };
}
