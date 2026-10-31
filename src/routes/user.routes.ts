import express from "express";
import { createUser } from "../controllers/user.controller";
import { validateCreateUser } from "../middlewares/validation.middleware";
import { onlyAdmin } from "../middlewares/adminOnly.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";

export const createUserRouter = express.Router();

createUserRouter.post(
  "/create-user",
  authMiddleware,
  onlyAdmin,
  validateCreateUser,
  createUser,
);
