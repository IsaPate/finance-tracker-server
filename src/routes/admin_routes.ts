import { Router } from "express";
import { asyncHandler } from "../middlewares/handlers";
import { isAdmin, verifyTokenMiddleware } from "../middlewares/auth";

import { deleteCategoryHandler } from "../controllers/category_controller";
import {
  getAllUserHandler,
  deleteUserByIdHandler,
  deleteUserByEmailHandler,
  adminGetAllTransactions,
  adminGetAllCategories,
  adminGetTotalStatistics,
} from "../controllers/admin_controller";

const adminRouter = Router();

// admin dashboard
adminRouter.get(
  "/admin/users",
  verifyTokenMiddleware,
  isAdmin,
  asyncHandler(getAllUserHandler)
);

adminRouter.delete(
  "/admin/users/:userId",
  verifyTokenMiddleware,
  isAdmin,
  asyncHandler(deleteUserByIdHandler)
);

//get transactions of all users, maybe with pagination
adminRouter.get(
  "/admin/transactions",
  verifyTokenMiddleware,
  isAdmin,
  asyncHandler(adminGetAllTransactions)
);

// maybe if i let users create a category
adminRouter.get(
  "/admin/categories",
  verifyTokenMiddleware,
  isAdmin,
  asyncHandler(adminGetAllCategories)
);

adminRouter.delete(
  "/admin/users/:email",
  verifyTokenMiddleware,
  isAdmin,
  asyncHandler(deleteUserByEmailHandler)
);

adminRouter.delete(
  "/admin/users/:userId/categories/:categoryId",
  verifyTokenMiddleware,
  isAdmin,
  asyncHandler(deleteCategoryHandler)
);

// stats like income / expenses
adminRouter.get(
  "/admin/stats",
  verifyTokenMiddleware,
  isAdmin,
  asyncHandler(adminGetTotalStatistics)
);
export { adminRouter };
