import express from "express";
import { createSalesOrder } from "../controllers/sales_order.controller";

export const salesOrderRouter = express.Router();

salesOrderRouter.post("/create-sales-order", createSalesOrder);
