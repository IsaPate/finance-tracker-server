import { Request, Response, NextFunction } from "express";
import { logger } from "../lib/logger";

export const asyncHandler =
  (fn: Function) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err);
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err?.message || "Unknown error",
    url: req.originalUrl,
    success: false,
  });
};
