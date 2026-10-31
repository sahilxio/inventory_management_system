import express from "express";
import { createUser } from "../controllers/user.controller";
import { validateCreateUser } from "../middlewares/validation.middleware";
import { onlyAdmin } from "../middlewares/adminOnly.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";

export const userRouter = express.Router();

userRouter.post(
  "/create-user",
  authMiddleware,
  onlyAdmin,
  validateCreateUser,
  createUser,
);
