import { z } from 'zod';

export const createRoomSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

export const updateRoomSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
});
