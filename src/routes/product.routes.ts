import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createProduct, getProducts } from "../controllers/product.controller";
import { validateCreateProduct } from "../middlewares/validation.middleware";

export const productRouter = express.Router();

productRouter.post(
  "/create-product",
  authMiddleware,
  validateCreateProduct,
  createProduct,
);
productRouter.get("/products", authMiddleware, getProducts);
