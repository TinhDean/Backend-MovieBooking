import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, trim: true },
    description: { type: String },
    isActive:    { type: Boolean, default: true },
    status: {
      type: String,
      enum: ['now_showing', 'coming_soon', 'ended'],
      default: 'coming_soon',
      index: true,
    },
  },
  { timestamps: true }
);

export const Movie = mongoose.model('Movie', movieSchema);
