import { NextFunction, Router, Request, Response } from "express";
import { asyncHandler } from "../middlewares/handlers";
import {
  createCategoryHandler,
  deleteCategoryHandler,
  editCategoryHandler,
  getCategoryHandler,
} from "../controllers/category_controller";

const categoryRouter = Router();

categoryRouter.get("/users/:userId/category", asyncHandler(getCategoryHandler));

categoryRouter.post(
  "/users/:userId/categories",
  asyncHandler(createCategoryHandler)
);

categoryRouter.put(
  "/users/:userId/category",
  asyncHandler(editCategoryHandler)
);

categoryRouter.delete(
  "/users/:userId/category",
  asyncHandler(deleteCategoryHandler)
);
export { categoryRouter };
