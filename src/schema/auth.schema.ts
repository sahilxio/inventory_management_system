import { z } from "zod";

export const LoginSchema = z.object({
  name: z.string().min(3).max(20),
  email: z.string().email(),
  password_hash: z.string(),
});
