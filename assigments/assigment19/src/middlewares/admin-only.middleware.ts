import { NextFunction, Request, Response } from "express";

export function adminOnly(req: Request, res: Response, next: NextFunction) {
  const role = req.headers.role;

  if (role !== "admin") {
    res.status(403).json({
      message: "Only admin can perform this action",
    });
    return;
  }

  next();
}
