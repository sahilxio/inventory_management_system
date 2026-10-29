import { LoginSchema } from "../schema/auth.schema";
import {z} from "zod"



export type LoginUser = z.infer<typeof LoginSchema>;