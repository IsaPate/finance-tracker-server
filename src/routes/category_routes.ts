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
import { validationMiddleware } from "../middlewares/validate";
import { categorySchema } from "../schemas/category.schema";

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
  validationMiddleware(categorySchema),
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
  validationMiddleware(categorySchema),
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
