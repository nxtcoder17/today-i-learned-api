import mongoose, { Schema } from 'mongoose';

const OtpToken = new Schema(
  {
    mobile_no: String,
    otp: String,
  },
  { timestamps: true }
);

export default mongoose.model('auth_otp', OtpToken);
