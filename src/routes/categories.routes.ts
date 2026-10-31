import express from "express";
import { createCategories } from "../controllers/catogries.controller";
import { onlyAdmin } from "../middlewares/adminOnly.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";

export const createCategoriesRouter = express.Router();

createCategoriesRouter.use(
  "/categories",
  authMiddleware,
  onlyAdmin,
  createCategories,
);
