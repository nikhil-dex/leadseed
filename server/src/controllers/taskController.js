/**
 * Task controller: create task, get pending, complete task.
 */
import * as taskService from '../services/taskService.js';

export async function getPending(req, res) {
  const tasks = await taskService.getPendingTasks(req.user._id);
  res.json({ tasks });
}

export async function create(req, res) {
  const { type, payload } = req.body;
  if (!type) {
    return res.status(400).json({ error: 'type is required' });
  }
  const task = await taskService.createTask(req.user._id, type, payload || {});
  res.status(201).json(task);
}

export async function complete(req, res) {
  const { id } = req.params;
  const result = req.body?.result ?? req.body;
  const task = await taskService.completeTask(id, req.user._id, result);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
}

export async function getRecent(req, res) {
  const limit = Math.min(parseInt(req.query.limit, 10) || 10, 50);
  const tasks = await taskService.getRecentTasks(req.user._id, limit);
  res.json({ tasks });
}
