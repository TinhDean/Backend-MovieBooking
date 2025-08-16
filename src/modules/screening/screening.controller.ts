import { Request, Response, NextFunction } from 'express';
import * as service from './screening.service';
import { sendResponse } from '@common';
import {
  CreateScreeningInput,
  UpdateScreeningInput,
  QueryScreeningInput,
  ScreeningStatus,
} from './dtos/screening.dto';

type Empty = Record<string, never>;

const parseStatus = (val: unknown): ScreeningStatus | undefined => {
  const statuses: ScreeningStatus[] = ['scheduled', 'open', 'closed', 'canceled'];
  return statuses.includes(val as ScreeningStatus) ? (val as ScreeningStatus) : undefined;
};

export const getAll = async (
  req: Request<Empty, unknown, Empty, QueryScreeningInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await service.getAllScreenings({
      movieId: req.query.movieId,
      roomId:  req.query.roomId,
      date:    req.query.date,
      status:  parseStatus(req.query.status),
    });
    sendResponse({ res, message: 'Screenings fetched successfully', data });
  } catch (err) { next(err); }
};

export const getById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await service.getScreeningById(req.params.id);
    if (!data) return next(new Error('Screening not found'));
    sendResponse({ res, message: 'Screening found', data });
  } catch (err) { next(err); }
};

export const create = async (
  req: Request<Empty, unknown, CreateScreeningInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await service.createScreening(req.body);
    sendResponse({ res, message: 'Screening created successfully', data, statusCode: 201 });
  } catch (err) { next(err); }
};

export const update = async (
  req: Request<{ id: string }, unknown, UpdateScreeningInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await service.updateScreening(req.params.id, req.body);
    if (!data) return next(new Error('Screening not found to update'));
    sendResponse({ res, message: 'Screening updated', data });
  } catch (err) { next(err); }
};

export const remove = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const ok = await service.deleteScreening(req.params.id);
    if (!ok) return next(new Error('Screening not found to delete'));
    sendResponse({ res, message: 'Screening deleted successfully' });
  } catch (err) { next(err); }
};

export const seats = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await service.getSeatsOfScreening(req.params.id);
    sendResponse({ res, message: 'Seat status fetched', data });
  } catch (err) { next(err); }
};
