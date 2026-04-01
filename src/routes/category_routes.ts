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
import { verifyToken } from "../middlewares/auth";

const categoryRouter = Router();

// USER  CATEGORY
categoryRouter.get(
  "/users/:userId/categories/:categoryId",
  verifyToken,
  asyncHandler(getCategoryHandler)
);

categoryRouter.put(
  "/users/:userId/categories/:categoryId",
  verifyToken,
  asyncHandler(editCategoryHandler)
);

categoryRouter.delete(
  "/users/:userId/categories/:categoryId",
  verifyToken,
  asyncHandler(deleteCategoryHandler)
);
// USER CATEGORIES
categoryRouter.get(
  "/users/:userId/categories",
  verifyToken,
  asyncHandler(getUserCategoriesHandler)
);
categoryRouter.post(
  "/users/:userId/categories",
  verifyToken,
  asyncHandler(createCategoryHandler)
);
// USER TRANSACTIONS CATEGORIES
categoryRouter.get(
  "/users/:userId/categories/:categoryId/transactions",
  verifyToken,
  asyncHandler(getTransactionsByUserIdAndCategoryIdHandler)
);
export { categoryRouter };
