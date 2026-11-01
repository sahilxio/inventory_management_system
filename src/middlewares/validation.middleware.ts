import { LoginSchema } from "../schema/auth.schema";
import { createUserSchema } from "../schema/user.schema";
import { createProductSchema } from "../schema/product.schema";
import { createSupplierSchema } from "../schema/supplier.schema";

import { Request, Response, NextFunction } from "express";

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = LoginSchema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.issues.map((issue) => ({
      field: issue.path[0],
      message: issue.message,
    }));

    return res.status(400).json({
      message: "validation failed",
      error: errors,
    });
  }

  req.body = result.data;

  next();
};

export const validateCreateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = createUserSchema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.issues.map((issue) => ({
      field: issue.path[0],
      message: issue.message,
    }));

    return res.status(400).json({
      message: "validation failed",
      error: errors,
    });
  }

  req.body = result.data;

  next();
};

export const validateCreateProduct = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = createProductSchema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.issues.map((issue) => ({
      field: issue.path[0],
      message: issue.message,
    }));

    return res.status(400).json({
      message: "validation failed",
      error: errors,
    });
  }

  req.body = result.data;

  next();
};

export const validateCreateSupplier = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = createSupplierSchema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.issues.map((issue) => ({
      field: issue.path[0],
      message: issue.message,
    }));

    return res.status(400).json({
      message: "validation failed",
      error: errors,
    });
  }

  req.body = result.data;

  next();
};
