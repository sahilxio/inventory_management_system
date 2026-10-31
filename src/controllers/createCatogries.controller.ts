import { Request, Response, NextFunction } from "express";
import { CreateCategoriesType } from "../types/catogries.type";
import { createCategoriesService } from "../services/createCatogries.service";
export const createCategories = async (
  req: Request<{}, {}, CreateCategoriesType>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await createCategoriesService(req.body);

    return res.status(201).json({
      success: true,
      message: "category create successfully",
      category: result.category,
    });
  } catch (error) {
    next(error);
  }
};
