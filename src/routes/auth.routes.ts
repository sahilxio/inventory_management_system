import express from "express"
import { login } from "../controllers/auth.controller"


export const authRouter = express.Router()

authRouter.post("/login", login)
