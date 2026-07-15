import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";
import { logger } from "../lib/logger";
export const validationMiddleware = (schema: z.ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        logger.warn({ issues: error.issues[0].message }, "validation failed");
        return res.status(400).json({
          message: "Validation error",
          errors: error.issues.map((i) => ({
            path: i.path.join("."),
            message: i.message,
          })),
          success: false,
        });
      }
      next(error);
    }
  };
};
