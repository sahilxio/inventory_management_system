import { LoginSchema } from "../schema/auth.schema";
import { z } from "zod";

export type LoginUserType = z.infer<typeof LoginSchema>;

export type AuthUser = {
  userId: string;
  role: string;
};
