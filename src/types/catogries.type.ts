import { createCatogriesSchema } from "../schema/categories.schema";
import { z } from "zod";

export type CreateCategoriesType = z.infer<typeof createCatogriesSchema>;
