import express from "express";
import {
  createPurchaseOrder,
  getPurchaseOrder,
  receivePurchaseOrder,
} from "../controllers/purchase_order.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export const purchaseOrderRouter = express.Router();

purchaseOrderRouter.post(
  "/create-purchase-order",
  authMiddleware,
  createPurchaseOrder,
);

purchaseOrderRouter.get("/", getPurchaseOrder);

purchaseOrderRouter.post("/:id/receive", receivePurchaseOrder);
