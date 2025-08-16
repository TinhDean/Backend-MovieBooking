import mongoose from 'mongoose';

const seatDefSchema = new mongoose.Schema(
  {
    seatId:   { type: String, required: true, trim: true },
    row:      { type: Number, required: true },
    col:      { type: Number, required: true },
    type:     { type: String, enum: ['standard','vip','couple'], default: 'standard' },
    isActive: { type: Boolean, default: true },
  },
  { _id: false }
);

const seatMapSchema = new mongoose.Schema(
  {
    rows:  { type: Number, required: true, min: 1 },
    cols:  { type: Number, required: true, min: 1 },
    seats: { type: [seatDefSchema], default: [] },
  },
  { _id: false }
);

const roomSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, trim: true },
    description: { type: String },
    isActive:    { type: Boolean, default: true },

    // sơ đồ ghế (tuỳ chọn, thêm qua API riêng)
    seatMap:     { type: seatMapSchema, required: false },
  },
  { timestamps: true }
);

roomSchema.index({ name: 1 }, { unique: false });

export const Room = mongoose.model('Room', roomSchema);
