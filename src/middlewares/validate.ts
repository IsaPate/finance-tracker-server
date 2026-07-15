import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";
export const validationMiddleware = (schema: z.ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
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
