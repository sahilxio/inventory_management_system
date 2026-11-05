import { z } from "zod";

export const createSalesOrderSchema = z.object({
  items: z.array(
    z.object({
      product_id: z.number().nonnegative(),
      quantity: z.number().nonnegative(),
    }),
  ),
});
