import { createUserSchema } from "../schema/user.schema";
import { z } from "zod";

export type CreateUserType = z.infer<typeof createUserSchema>;
