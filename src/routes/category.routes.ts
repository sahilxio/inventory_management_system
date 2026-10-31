import express from "express";
import { createCategories, getCategories } from "../controllers/category.controller";
import { onlyAdmin } from "../middlewares/adminOnly.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";

export const categoriesRouter = express.Router();

categoriesRouter.post(
  "/categories",
  authMiddleware,
  onlyAdmin,
  createCategories,
);

categoriesRouter.get("/categories", authMiddleware, getCategories);
