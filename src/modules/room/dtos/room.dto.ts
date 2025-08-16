export interface CreateRoomInput {
  name: string;
  description?: string;
  isActive?: boolean;
}

export interface UpdateRoomInput {
  name?: string;
  description?: string;
  isActive?: boolean;
}

/** optional: sơ đồ ghế tối giản để dùng sau */
export interface SeatDef {
  seatId: string;                 // A1, A2...
  row: number;
  col: number;
  type?: 'standard' | 'vip' | 'couple';
  isActive?: boolean;
}

export interface SeatMapInput {
  rows: number;
  cols: number;
  seats: SeatDef[];
}
