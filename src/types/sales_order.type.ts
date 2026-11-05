import { createSalesOrderSchema } from "../schema/sales_order.schema";
import { z } from "zod";

export type salesOrderType = z.infer<typeof createSalesOrderSchema>;
