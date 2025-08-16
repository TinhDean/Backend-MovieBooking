import { Room } from './room.model';
import { CreateRoomInput, UpdateRoomInput, SeatMapInput } from './dtos/room.dto';

export const getAllRooms = () => Room.find().sort({ createdAt: -1 });
export const getRoomById = (id: string) => Room.findById(id);

export const createRoom = (data: CreateRoomInput) => Room.create(data);

export const updateRoom = (id: string, data: UpdateRoomInput) =>
  Room.findByIdAndUpdate(id, data, { new: true });

export const deleteRoom = (id: string) => Room.findByIdAndDelete(id);

/** cập nhật/tạo seatMap cho phòng */
export const upsertSeatMap = (id: string, seatMap: SeatMapInput) =>
  Room.findByIdAndUpdate(
    id,
    { seatMap },
    { new: true }
  );
