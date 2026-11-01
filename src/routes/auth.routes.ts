import express from "express";
import { login } from "../controllers/auth.controller";
import { validateLogin } from "../middlewares/validation.middleware";

export const authRouter = express.Router();

authRouter.post("/login", validateLogin, login);
