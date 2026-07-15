import { NextFunction, Request, Response } from "express";
import type { ObjectSchema } from "joi";

export function validate(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      res.status(400).json({
        message: error.message,
      });
      return;
    }

    next();
  };
}
