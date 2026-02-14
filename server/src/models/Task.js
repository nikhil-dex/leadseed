/**
 * Task model.
 * User-triggered tasks for the extension (e.g. extract_profile).
 * Status: pending -> completed. Engine polls and executes; result stored here.
 */
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true }, // e.g. "extract_profile"
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    payload: { type: mongoose.Schema.Types.Mixed, default: {} },
    result: { type: mongoose.Schema.Types.Mixed, default: null },
  },
  { timestamps: true }
);

taskSchema.index({ userId: 1, status: 1 });
taskSchema.index({ status: 1, createdAt: 1 });

export const Task = mongoose.model('Task', taskSchema);
