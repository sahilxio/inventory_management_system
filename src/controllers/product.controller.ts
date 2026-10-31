import { Request, Response, NextFunction } from "express";
import { createProductType } from "../types/product.type";
import { createProductService } from "../services/product.service";

export const createProduct = async (
  req: Request<{}, {}, createProductType>,
  res: Response,
  next: NextFunction,
) => {
    try {
        
    } catch (error) {
        next(error)
    }
};
