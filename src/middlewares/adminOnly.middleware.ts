import { Request, Response, NextFunction } from "express";

export const onlyAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({
      success: true,
      message: "unauthorized you don't have access",
    });
  }

  next();
};
