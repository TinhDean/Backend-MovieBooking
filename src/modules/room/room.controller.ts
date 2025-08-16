import { Request, Response, NextFunction } from 'express';
import * as service from './room.service';
import { sendResponse, AppError } from '@common';

export const getAll = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.getAllRooms();
    sendResponse({ res, message: 'Rooms fetched successfully', data });
  } catch (err) { next(err); }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.getRoomById(req.params.id);
    if (!data) return next(new AppError('Room not found', 404));
    sendResponse({ res, message: 'Room found', data });
  } catch (err) { next(err); }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.createRoom(req.body);
    sendResponse({ res, message: 'Room created successfully', data, statusCode: 201 });
  } catch (err) { next(err); }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.updateRoom(req.params.id, req.body);
    if (!data) return next(new AppError('Room not found to update', 404));
    sendResponse({ res, message: 'Room updated', data });
  } catch (err) { next(err); }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.deleteRoom(req.params.id);
    if (!data) return next(new AppError('Room not found to delete', 404));
    sendResponse({ res, message: 'Room deleted successfully' });
  } catch (err) { next(err); }
};

/** tạo/cập nhật sơ đồ ghế */
export const upsertSeatMap = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.upsertSeatMap(req.params.id, req.body);
    if (!data) return next(new AppError('Room not found to update seat map', 404));
    sendResponse({ res, message: 'Seat map upserted', data });
  } catch (err) { next(err); }
};
