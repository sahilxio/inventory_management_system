import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { onlyAdmin } from "../middlewares/adminOnly.middleware";
import { validateCreateSupplier } from "../middlewares/validation.middleware";
import {
  createSupplier,
  getSupplier,
} from "../controllers/supplier.controller";

export const supplierRouter = express.Router();

supplierRouter.post(
  "/create-supplier",
  authMiddleware,
  onlyAdmin,
  validateCreateSupplier,
  createSupplier,
);

supplierRouter.get("/", authMiddleware, getSupplier);
