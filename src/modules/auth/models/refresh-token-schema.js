import mongoose, { Schema } from 'mongoose';

const Token = new Schema(
  {
    user_id: mongoose.Types.ObjectId,
    token: String,
    is_valid: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('auth_refresh_token', Token);
