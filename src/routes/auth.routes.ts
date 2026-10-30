import express from "express";
import { login } from "../controllers/auth.controller";
import { validateLogin } from "../middlewares/validation.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";

export const authRouter = express.Router();

authRouter.post("/login", authMiddleware, validateLogin, login);
