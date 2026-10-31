import { createCatogriesSchema } from "../schema/createCategories.schema";
import { z } from "zod";

export type CreateCategoriesType = z.infer<typeof createCatogriesSchema>;
