import { Request, Response, NextFunction } from "express";
import { CreateCategoriesType } from "../types/catogries.type";
import {
  createCategoriesService,
  getCategoriesService,
} from "../services/category.service";

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

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await getCategoriesService();

    return res.status(200).json({
      success: true,
      message: "categories fetched successfully",
      categories: result.categories,
    });
  } catch (error) {
    next(error);
  }
};
