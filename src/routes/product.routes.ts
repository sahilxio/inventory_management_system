import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createProduct } from "../controllers/product.controller";

export const productRouter = express.Router();

productRouter.post("/create-product", authMiddleware, createProduct);
