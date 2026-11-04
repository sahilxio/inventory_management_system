import {
  purchaseOrderType,
  receivePurchaseOrderType,
} from "../types/purchase_order";
import { Request, Response, NextFunction } from "express";
import {
  createPurchaseOrderService,
  getPurchaseOrderService,
  receivePurchaseOrderService,
} from "../services/purchase_order.service";

export const createPurchaseOrder = async (
  req: Request<{}, {}, purchaseOrderType>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.userId;

    if (userId === undefined) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const result = await createPurchaseOrderService(req.body, userId);

    return res.status(201).json({
      success: true,
      message: "purchase_order & purchase_order_items created",
      purchase_order: result.purchase_order,
      purchase_order_items: result.purchase_order_items,
    });
  } catch (error) {
    next(error);
  }
};

export const getPurchaseOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await getPurchaseOrderService();

    return res.status(200).json({
      success: true,
      message: "purchase orders fetched successfully",
      purchase_orders: result.purchase_orders,
    });
  } catch (error) {
    next(error);
  }
};

export const receivePurchaseOrder = async (
  req: Request<{ id: string }, {}, receivePurchaseOrderType>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const poId = Number(req.params.id);
    const userId = req.user?.userId;

    if (userId === undefined) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const result = await receivePurchaseOrderService(req.body, poId, userId);
  } catch (error) {
    next(error);
  }
};
