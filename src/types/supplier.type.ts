import { createSupplierSchema } from "../schema/supplier.schema";
import { z } from "zod";

export type createSupplierType = z.infer<typeof createSupplierSchema>;
