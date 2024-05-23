import { z } from "zod";

export const createWarungSchema = z.object({
  location: z.string(),
});
