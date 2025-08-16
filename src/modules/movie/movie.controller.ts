// src/modules/movie/movie.controller.ts
import { Request, Response, NextFunction } from 'express';
import * as movieService from './movie.service';
import { sendResponse } from '@common';
import { CreateMovieInput, UpdateMovieInput, MovieStatus } from './dtos/movie.dto';

const parseStatus = (v: unknown): MovieStatus | undefined => {
  if (v === 'now_showing' || v === 'coming_soon' || v === 'ended') return v;
  return undefined;
};

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const status = parseStatus(req.query.status);
    const data = await movieService.getAllMovies(status);
    sendResponse({ res, message: 'Movies fetched successfully', data });
  } catch (err) { next(err); }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await movieService.getMovieById(req.params.id);
    if (!data) return next(new Error('Movie not found'));
    sendResponse({ res, message: 'Movie found', data });
  } catch (err) { next(err); }
};

export const create = async (
  req: Request<Record<string, never>, unknown, CreateMovieInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await movieService.createMovie(req.body);
    sendResponse({ res, message: 'Movie created successfully', data, statusCode: 201 });
  } catch (err) { next(err); }
};

export const update = async (
  req: Request<{ id: string }, unknown, UpdateMovieInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await movieService.updateMovie(req.params.id, req.body);
    if (!data) return next(new Error('Movie not found to update'));
    sendResponse({ res, message: 'Movie updated', data });
  } catch (err) { next(err); }
};

export const remove = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    await movieService.deleteMovie(req.params.id);
    sendResponse({ res, message: 'Movie deleted successfully' });
  } catch (err) { next(err); }
};
