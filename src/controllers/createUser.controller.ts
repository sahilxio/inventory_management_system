import { Request, Response, NextFunction } from "express";
import { createUserType } from "../types/auth.type";
import { createUserService } from "../services/createUser.service";

export const createUser = async (
  req: Request<{}, {}, createUserType>,
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
