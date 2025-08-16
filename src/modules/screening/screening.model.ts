import { Schema, model, Types } from 'mongoose';

export type ScreeningStatus = 'scheduled' | 'open' | 'closed' | 'canceled';
export type SeatType = 'standard' | 'vip' | 'couple';
export type SeatState = 'available' | 'held' | 'booked';

export interface IScreeningSeat {
  seatId: string;
  type: SeatType;
  state: SeatState;
  ticketId?: Types.ObjectId;
}

export interface IScreening {
  _id: Types.ObjectId;
  movieId: Types.ObjectId;
  roomId: Types.ObjectId;
  startAt: Date;
  basePrice: number;
  status: ScreeningStatus;
  name?: string;
  description?: string;
  isActive: boolean;
  seats: IScreeningSeat[];        // <-- QUAN TRỌNG
  createdAt: Date;
  updatedAt: Date;
}

const screeningSeatSchema = new Schema<IScreeningSeat>(
  {
    seatId:   { type: String, required: true },
    type:     { type: String, enum: ['standard','vip','couple'], default: 'standard' },
    state:    { type: String, enum: ['available','held','booked'], default: 'available' },
    ticketId: { type: Schema.Types.ObjectId, required: false },
  },
  { _id: false }
);

const screeningSchema = new Schema<IScreening>(
  {
    movieId:   { type: Schema.Types.ObjectId, ref: 'Movie', required: true, index: true },
    roomId:    { type: Schema.Types.ObjectId, ref: 'Room',  required: true, index: true },
    startAt:   { type: Date, required: true, index: true },
    basePrice: { type: Number, default: 70000, min: 0 },
    status:    { type: String, enum: ['scheduled','open','closed','canceled'], default: 'scheduled', index: true },
    name:        { type: String, trim: true },
    description: { type: String },
    isActive:    { type: Boolean, default: true },

    // Ảnh chụp sơ đồ ghế thời điểm tạo suất
    seats: { type: [screeningSeatSchema], default: [] },   // <-- THÊM
  },
  { timestamps: true }
);

screeningSchema.index({ movieId: 1, startAt: 1 });
screeningSchema.index({ roomId: 1, startAt: 1 });

export const Screening = model<IScreening>('Screening', screeningSchema);
