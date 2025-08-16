import { z } from 'zod';

export type MovieStatus = 'now_showing' | 'coming_soon' | 'ended';

export interface CreateMovieInput {
  name: string;
  description?: string;
  status?: MovieStatus;
}

export interface UpdateMovieInput {
  name?: string;
  description?: string;
  isActive?: boolean;
  status?: MovieStatus;
}

/** Zod schema (đồng bộ với interface) */
export const createMovieSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(['now_showing', 'coming_soon', 'ended']).optional(),
});

export const updateMovieSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
  status: z.enum(['now_showing', 'coming_soon', 'ended']).optional(),
});
