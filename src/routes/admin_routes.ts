import { Router } from "express";
import {
  createUserHandler,
  getUserHandler,
  getAllUserHandler,
  deleteUserByIdHandler,
  deleteUserByEmailHandler,
} from "../controllers/user_controller";
import { asyncHandler } from "../middlewares/handlers";
import { isAdmin, verifyTokenMiddleware } from "../middlewares/auth";
import { deleteUserByEmail, deleteUserById } from "../models/user.server";
import { deleteCategory } from "../models/category.server";
import {
  deleteCategoryHandler,
  adminGetAllCategories,
} from "../controllers/category_controller";
import { adminGetAllTransactions } from "../controllers/transaction_controller";

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
adminRouter.get("/admin/stats", verifyTokenMiddleware, isAdmin, () => {
  //get users , get transactions make sum for expenses - income and present ration and balance
  // {
  //     global: {
  //       totalUsers,
  //       totalTransactions,
  //       totalIncome,
  //       totalExpenses,
  //       netBalance,
  //       expenseToIncomeRatio
  //     },
  //     users: [
  //       {
  //         userId,
  //         totalIncome,
  //         totalExpenses,
  //         totalTransactions,
  //         balance,
  //         expenseRatio,
  //         incomeRatio
  //       }
  //     ]
  //   }
});
export { adminRouter };
