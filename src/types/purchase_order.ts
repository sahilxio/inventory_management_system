import { purchaseOrderSchema, receivePurchaseOrderSchema } from "../schema/purchase_order.schema";

import { z } from "zod";

export type purchaseOrderType = z.infer<typeof purchaseOrderSchema>;

export type receivePurchaseOrderType = z.infer<typeof receivePurchaseOrderSchema>