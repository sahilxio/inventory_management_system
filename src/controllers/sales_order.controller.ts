import { Request, Response, NextFunction } from "express";
import { salesOrderType } from "../types/sales_order.type";
import { createSalesOrderService } from "../services/sales_order.service";

export const createSalesOrder = async (
  req: Request<{}, {}, salesOrderType>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.userId;

    if (userId === undefined) {
      return res.status(400).json({
        success: false,
        message: "unauthrozied",
      });
    }
    const result = await createSalesOrderService(req.body, userId);
  } catch (error) {
    next(error);
  }
};
