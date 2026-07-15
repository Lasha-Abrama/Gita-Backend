import { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";

export function validateObjectId(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const id = req.params.id;

  if (!isValidObjectId(id)) {
    res.status(400).json({
      message: "Invalid product ID",
    });
    return;
  }

  next();
}
