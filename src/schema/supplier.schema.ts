import { z } from "zod";

export const createSupplierSchema = z.object({
  name: z.string().min(4).max(100),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
});
