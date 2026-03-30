import { NextFunction, Router, Request, Response } from "express";
import { asyncHandler } from "../middlewares/handlers";
import {
  createCategoryHandler,
  deleteCategoryHandler,
  editCategoryHandler,
  getCategoryHandler,
  getTransactionsByUserIdAndCategoryIdHandler,
  getUserCategoriesHandler,
} from "../controllers/category_controller";

const categoryRouter = Router();

// USER  CATEGORY
categoryRouter.get(
  "/users/:userId/categories/:categoryId",
  asyncHandler(getCategoryHandler)
);

categoryRouter.put(
  "/users/:userId/categories/:categoryId",
  asyncHandler(editCategoryHandler)
);

categoryRouter.delete(
  "/users/:userId/categories/:categoryId",
  asyncHandler(deleteCategoryHandler)
);
// USER CATEGORIES
categoryRouter.get(
  "/users/:userId/categories",
  asyncHandler(getUserCategoriesHandler)
);
categoryRouter.post(
  "/users/:userId/categories",
  asyncHandler(createCategoryHandler)
);
// USER TRANSACTIONS CATEGORIES
categoryRouter.get(
  "/users/:userId/categories/:categoryId/transactions",
  asyncHandler(getTransactionsByUserIdAndCategoryIdHandler)
);
export { categoryRouter };
