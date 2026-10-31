import { createUserSchema } from "../schema/createUser.schema";
import { z } from "zod";

export type CreateUserType = z.infer<typeof createUserSchema>;
