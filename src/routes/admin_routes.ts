import { Router } from "express";
import {
  createUserHandler,
  getUserHandler,
  getAllUserHandler,
  deleteUserByIdHandler,
} from "../controllers/user_controller";
import { asyncHandler } from "../middlewares/handlers";
import { isAdmin, verifyTokenMiddleware } from "../middlewares/auth";
import { deleteUserByEmail, deleteUserById } from "../models/user.server";
import { deleteCategory } from "../models/category.server";

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
  () => {}
);

// maybe if i let users create a category
adminRouter.get("/admin/categories", verifyTokenMiddleware, isAdmin, () => {});

adminRouter.delete(
  "/admin/users/:email",
  verifyTokenMiddleware,
  isAdmin,
  asyncHandler(deleteUserByEmail)
);

adminRouter.delete(
  "/admin/users/:userId/categories/:categoryId",
  verifyTokenMiddleware,
  isAdmin,
  asyncHandler(deleteCategory)
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
