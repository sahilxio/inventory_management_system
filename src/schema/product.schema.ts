import { z } from "zod";

export const createProductSchema = z.object({
  category_id: z.number().int().positive(),
  name: z.string().min(4).max(150),
  sku: z.string().min(1).max(100),
  description: z.string().optional(),
  cost_price: z.number().nonnegative(),
  selling_price: z.number().nonnegative(),
});
