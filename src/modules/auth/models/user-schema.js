import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
});

export default mongoose.model('auth_user', UserSchema);
