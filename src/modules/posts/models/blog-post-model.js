import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    author: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
    },
    tags: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

export default mongoose.model('post', schema);
