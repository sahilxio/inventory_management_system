import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password_hash: z.string(),
});

export const createUserSchema = z.object({
  name: z.string().min(8).max(20),
  email: z.string().email(),
  password: z.string(),
  role: z.string().optional()
});
