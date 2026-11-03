import { purchaseOrderSchema } from "../schema/purchase_order.schema";
import { z } from "zod";

export type purchaseOrderType = z.infer<typeof purchaseOrderSchema>;
