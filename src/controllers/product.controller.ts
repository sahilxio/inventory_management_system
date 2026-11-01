import { Request, Response, NextFunction } from "express";
import { createProductType } from "../types/product.type";
import {
  createProductService,
  getProductService,
} from "../services/product.service";

export const createProduct = async (
  req: Request<{}, {}, createProductType>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await createProductService(req.body);

    return res.status(201).json({
      success: true,
      message: "product create successfully",
      product: result.product,
    });
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await getProductService();

    return res.status(200).json({
      success: true,
      message: "product fetched successfully",
      products: result.products,
    });
  } catch (error) {
    next(error);
  }
};
