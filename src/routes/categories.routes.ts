import express from "express";
import { createCategories } from "../controllers/createCatogries.controller";

export const createCategoriesRouter = express.Router();

createCategoriesRouter.use("/categories", createCategories);
