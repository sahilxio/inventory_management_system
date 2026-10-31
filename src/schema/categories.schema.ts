import { z } from "zod";

export const createCatogriesSchema = z.object({
  name: z.string().min(10).max(150),
});
