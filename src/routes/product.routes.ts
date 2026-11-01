import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createProduct, getProducts } from "../controllers/product.controller";

export const productRouter = express.Router();

productRouter.post("/create-product", authMiddleware, createProduct);
productRouter.get("/products", authMiddleware, getProducts )
