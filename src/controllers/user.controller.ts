import { Request, Response, NextFunction } from "express";
import { CreateUserType } from "../types/user.type";
import { createUserService } from "../services/user.service";

export const createUser = async (
  req: Request<{}, {}, CreateUserType>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await createUserService(req.body);

    return res.status(201).json({
      success: true,
      message: "user created successfully",
      user: result.user,
    });
  } catch (error) {
    next(error);
  }
};
