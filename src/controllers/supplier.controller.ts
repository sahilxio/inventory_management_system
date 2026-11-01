import { Request, Response, NextFunction } from "express";
import {
  createSupplierService,
  getSupplierService,
} from "../services/supplier.service";
import { createSupplierType } from "../types/supplier.type";

export const createSupplier = async (
  req: Request<{}, {}, createSupplierType>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await createSupplierService(req.body);

    return res.status(201).json({
      success: true,
      message: "supplier created successfully",
      supplier: result.supplier,
    });
  } catch (error) {
    next(error);
  }
};

export const getSupplier = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await getSupplierService();

    return res.status(200).json({
      success: true,
      message: "suppliers fetched successfully",
      suppliers: result.suppliers,
    });
  } catch (error) {
    next(error);
  }
};
