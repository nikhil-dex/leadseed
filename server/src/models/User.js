/**
 * User model.
 * Stores LinkedIn-authenticated users for the lead seeding platform.
 */
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    linkedinId: { type: String, required: true, unique: true,sparse: true },
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    profilePicture: { type: String, default: '' },
  },
  { timestamps: true }
);

// linkedinId already has unique: true above, which creates an index; no extra index needed

export const User = mongoose.model('User', userSchema);
