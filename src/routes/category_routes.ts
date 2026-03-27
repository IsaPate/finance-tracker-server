import { NextFunction, Router, Request, Response } from "express";
import { asyncHandler } from "../middlewares/handlers";

const categoryRouter = Router();

categoryRouter.get(
  "/users/:userId/category",
  (req: Request, res: Response, next: NextFunction) => {
    return res.json({
      message: "welcome",
    });
  }
);

categoryRouter.post(
  "/users/:userId/category",
  (req: Request, res: Response, next: NextFunction) => {
    return res.json({
      message: "welcome",
    });
  }
);

export { categoryRouter };
