export type ScreeningStatus = 'scheduled' | 'open' | 'closed' | 'canceled';

export interface CreateScreeningInput {
  movieId: string;          // _id của Movie
  roomId: string;           // _id của Room
  startAt: string;          // ISO date string (vd: "2025-08-20T13:00:00Z")
  basePrice?: number;       // giá cơ bản
  status?: ScreeningStatus; // mặc định 'scheduled'
  name?: string;            // (tùy chọn) nếu bạn muốn hiển thị tiêu đề
  description?: string;
  isActive?: boolean;
}

export interface UpdateScreeningInput {
  movieId?: string;
  roomId?: string;
  startAt?: string;
  basePrice?: number;
  status?: ScreeningStatus;
  name?: string;
  description?: string;
  isActive?: boolean;
}

export interface QueryScreeningInput {
  movieId?: string;
  roomId?: string;
  date?: string;            // yyyy-mm-dd (lọc theo ngày)
  status?: ScreeningStatus;
}
