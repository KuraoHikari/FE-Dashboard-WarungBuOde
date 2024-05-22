import { z } from "zod";

export const registrationSchema = z.object({
 username: z.string().min(2, {
  message: "Username must be at least 2 characters.",
 }),
 email: z.string().email(),
 password: z.string().min(8),
});

export const loginSchema = z.object({
 email: z.string().email(),
 password: z.string().min(8),
});
