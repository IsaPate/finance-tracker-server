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
import { isSelfUser, verifyTokenMiddleware } from "../middlewares/auth";

const categoryRouter = Router();

// USER  CATEGORY
categoryRouter.get(
  "/users/:userId/categories/:categoryId",
  verifyTokenMiddleware,
  isSelfUser,
  asyncHandler(getCategoryHandler)
);

categoryRouter.put(
  "/users/:userId/categories/:categoryId",
  verifyTokenMiddleware,
  isSelfUser,
  asyncHandler(editCategoryHandler)
);

categoryRouter.delete(
  "/users/:userId/categories/:categoryId",
  verifyTokenMiddleware,
  isSelfUser,
  asyncHandler(deleteCategoryHandler)
);
// USER CATEGORIES
categoryRouter.get(
  "/users/:userId/categories",
  verifyTokenMiddleware,
  isSelfUser,
  asyncHandler(getUserCategoriesHandler)
);
categoryRouter.post(
  "/users/:userId/categories",
  verifyTokenMiddleware,
  isSelfUser,
  asyncHandler(createCategoryHandler)
);
// USER TRANSACTIONS CATEGORIES
categoryRouter.get(
  "/users/:userId/categories/:categoryId/transactions",
  verifyTokenMiddleware,
  isSelfUser,
  asyncHandler(getTransactionsByUserIdAndCategoryIdHandler)
);
export { categoryRouter };
