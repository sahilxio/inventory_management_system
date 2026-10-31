import { createProductSchema } from "../schema/product.schema";
import { z } from "zod";

export type createProductType = z.infer<typeof createProductSchema>;
