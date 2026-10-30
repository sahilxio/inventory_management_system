import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthUser } from "../types/auth.type";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthUser;

    req.user = decoded;

    next();
  } catch (error) {
    console.log("In valid token", error);
  }
};
