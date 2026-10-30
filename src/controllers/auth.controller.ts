import { LoginUserType } from "../types/auth.type";
import { Request, Response, NextFunction } from "express";
import { loginService } from "../services/login.service";

export async function login(
  req: Request<{}, {}, LoginUserType>,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await loginService(req.body);

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.status(201).json({
      message: "user logged-in successfully",
      success: true,
      user: result.user,
    });
  } catch (error) {
    next(error);
  }
}
