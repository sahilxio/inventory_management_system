import { z } from "zod";

export const purchaseOrderSchema = z.object({
  supplier_id: z.number().int().positive(),
  notes: z.string().optional().nullable(),
  items: z.array(
    z.object({
      product_id: z.number().int().positive(),
      quantity_ordered: z.number().int().positive(),
      unit_cost: z.number().nonnegative(),
    }),
  ),
});

export const receivePurchaseOrderSchema = z.object({
  items: z.array(
    z.object({
      poi_id: z.number().int().positive(),
      quantity_received: z.number().int().positive(),
    }),
  ),
});
