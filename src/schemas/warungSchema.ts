import { z } from "zod";

export const createWarungSchema = z.object({
 name: z.string(),
 location: z.string(),
});

export const updateWarungSchema = z.object({
 location: z.string().optional(),
});
