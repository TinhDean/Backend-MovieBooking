import { Screening, IScreening, IScreeningSeat } from './screening.model';
import { CreateScreeningInput, UpdateScreeningInput, QueryScreeningInput } from './dtos/screening.dto';
import { Room } from '@modules/room/room.model';
import { FilterQuery, UpdateQuery, Types } from 'mongoose';

// Danh sách
export const getAllScreenings = (query?: QueryScreeningInput) => {
  const filter: FilterQuery<IScreening> = {};
  if (query?.movieId) filter.movieId = new Types.ObjectId(query.movieId);
  if (query?.roomId)  filter.roomId  = new Types.ObjectId(query.roomId);
  if (query?.status)  filter.status  = query.status;
  if (query?.date) {
    const d0 = new Date(query.date + 'T00:00:00Z');
    const d1 = new Date(query.date + 'T23:59:59Z');
    filter.startAt = { $gte: d0, $lte: d1 };
  }

  return Screening.find(filter)
    .sort({ startAt: 1 })
    .populate('movieId', 'name')
    .populate('roomId', 'name');
};

// Chi tiết
export const getScreeningById = (id: string) =>
  Screening.findById(id)
    .populate('movieId', 'name')
    .populate('roomId', 'name');

// Tạo suất
export const createScreening = async (data: CreateScreeningInput) => {
  const room = await Room.findById(data.roomId);
  if (!room) throw new Error('Room not found');
  if (!room.seatMap || !room.seatMap.seats?.length) {
    throw new Error('Room has no seat map');
  }

  const seats: IScreeningSeat[] = room.seatMap.seats
    .filter(s => s.isActive !== false)
    .map(s => ({
      seatId: s.seatId,
      type: (s.type ?? 'standard') as IScreeningSeat['type'],
      state: 'available',
    }));

  const payload: Omit<IScreening, '_id' | 'createdAt' | 'updatedAt'> = {
    ...data,
    startAt: new Date(data.startAt),
    basePrice: data.basePrice ?? 70000,
    status: data.status ?? 'scheduled',
    name: data.name,
    description: data.description,
    isActive: data.isActive ?? true,
    seats,
    movieId: new Types.ObjectId(data.movieId),
    roomId: new Types.ObjectId(data.roomId),
  };

  return Screening.create(payload);
};

// Cập nhật
export const updateScreening = (id: string, data: UpdateScreeningInput) => {
  const payload: UpdateQuery<IScreening> = { ...data };
  if (data.startAt) payload.startAt = new Date(data.startAt);
  return Screening.findByIdAndUpdate(id, payload, { new: true });
};

// Xoá
export const deleteScreening = (id: string) => Screening.findByIdAndDelete(id);

// Trạng thái ghế
export const getSeatsOfScreening = async (id: string) => {
  const doc = await Screening.findById(id).select('seats').lean();
  if (!doc) throw new Error('Screening not found');
  return doc.seats ?? [];
};
