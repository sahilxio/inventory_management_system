import { LoginSchema, createUserSchema } from "../schema/auth.schema";
import { z } from "zod";

export type LoginUserType = z.infer<typeof LoginSchema>;

export type createUserType = z.infer<typeof createUserSchema>;
