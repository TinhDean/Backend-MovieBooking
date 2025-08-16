// src/modules/movie/movie.service.ts
import { Movie } from './movie.model';
import { CreateMovieInput, UpdateMovieInput, MovieStatus } from './dtos/movie.dto';

type MovieFilter = { status?: MovieStatus };

export const getAllMovies = (status?: MovieStatus) => {
  const filter: MovieFilter = {};
  if (status) filter.status = status;
  return Movie.find(filter).sort({ createdAt: -1 });
};

export const getMovieById = (id: string) => Movie.findById(id);
export const createMovie  = (data: CreateMovieInput) => Movie.create(data);
export const updateMovie  = (id: string, data: UpdateMovieInput) => Movie.findByIdAndUpdate(id, data, { new: true });
export const deleteMovie  = (id: string) => Movie.findByIdAndDelete(id);
