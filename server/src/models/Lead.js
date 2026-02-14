/**
 * Lead model.
 * Extracted/saved leads from LinkedIn profiles (user-triggered only).
 */
import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, default: '' },
    headline: { type: String, default: '' },
    profileUrl: { type: String, default: '' },
    // Outreach tracking (leadseeder-style)
    messageSent: { type: Boolean, default: false },
    invitationSent: { type: Boolean, default: false },
    profileVisit: { type: Boolean, default: false },
    acceptInvitation: { type: Boolean, default: false },
    answeredMessage: { type: Boolean, default: false },
    payload: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

leadSchema.index({ userId: 1 });
leadSchema.index({ userId: 1, profileUrl: 1 }, { unique: true });

export const Lead = mongoose.model('Lead', leadSchema);
