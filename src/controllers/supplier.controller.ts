import { Request, Response, NextFunction } from "express";
import { createSupplierService } from "../services/supplier.service";
import { createSupplierType } from "../types/supplier.type";

export const createSupplier = async (
  req: Request<{}, {}, createSupplierType>,
  res: Response,
  next: NextFunction,
) => {
  try {
  } catch (error) {
    next(error);
  }
};
