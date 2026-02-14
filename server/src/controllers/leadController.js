/**
 * Lead controller: list and update saved leads.
 */
import * as leadService from '../services/leadService.js';

export async function getLeads(req, res) {
  const limit = Math.min(parseInt(req.query.limit, 10) || 50, 100);
  const skip = Math.max(0, parseInt(req.query.skip, 10) || 0);
  const { items, total } = await leadService.getLeads(req.user._id, { limit, skip });
  res.json({ leads: items, total });
}

export async function updateLead(req, res) {
  const { id } = req.params;
  const lead = await leadService.updateLeadStats(req.user._id, id, req.body);
  if (!lead) {
    return res.status(404).json({ error: 'Lead not found or no valid updates' });
  }
  res.json(lead);
}

export async function getLeadStats(req, res) {
  const stats = await leadService.getLeadStats(req.user._id);
  res.json(stats);
}
