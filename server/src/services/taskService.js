/**
 * Task service: create and complete user-triggered tasks.
 * Extension polls for pending tasks and executes them (e.g. extract_profile).
 */
import { Task } from '../models/Task.js';
import { Lead } from '../models/Lead.js';

/**
 * Create a new task for the user. Only pending tasks are polled by the extension.
 */
export async function createTask(userId, type, payload = {}) {
  const task = await Task.create({ userId, type, payload });
  return task;
}

/**
 * Mark task as completed and store result. For extract_profile, also save as lead.
 */
export async function completeTask(taskId, userId, result) {
  const task = await Task.findOne({ _id: taskId, userId });
  if (!task) return null;
  if (task.status === 'completed') return task;

  task.status = 'completed';
  task.result = result;
  await task.save();

  // When extract_profile completes, persist as a lead (user-triggered, compliant).
  if (task.type === 'extract_profile' && result?.name) {
    await Lead.findOneAndUpdate(
      { userId, profileUrl: result.profileUrl || '' },
      {
        userId,
        name: result.name || '',
        headline: result.headline || '',
        profileUrl: result.profileUrl || '',
        payload: result,
      },
      { upsert: true, new: true }
    );
  }

  return task;
}

/**
 * Get pending tasks for a user (used by extension poll).
 */
export async function getPendingTasks(userId) {
  return Task.find({ userId, status: 'pending' }).sort({ createdAt: 1 }).lean();
}

/**
 * Get recent tasks for dashboard (all statuses).
 */
export async function getRecentTasks(userId, limit = 10) {
  return Task.find({ userId }).sort({ createdAt: -1 }).limit(limit).lean();
}
