import { Router } from "express";
import {
  createUserHandler,
  getUserHandler,
  getAllUserHandler,
} from "../controllers/user_controller";
import { asyncHandler } from "../middlewares/handlers";
import { isAdmin, verifyToken } from "../middlewares/auth";
import { deleteUserByEmail, deleteUserById } from "../models/user.server";
import { deleteCategory } from "../models/category.server";

const adminRouter = Router();
// adminRouter.use(verifyToken, isAdmin);
// adminRouter.get("/admin/users", ...)

// admin dashboard
adminRouter.get(
  "/admin/users",
  verifyToken,
  isAdmin,
  asyncHandler(getAllUserHandler)
);

adminRouter.delete(
  "/admin/users/:userId",
  verifyToken,
  isAdmin,
  asyncHandler(deleteUserById)
);

//get transactions of all users, maybe with pagination
adminRouter.get("/admin/transactions", verifyToken, isAdmin, () => {});

// maybe if i let users create a category
adminRouter.get("/admin/categories", verifyToken, isAdmin, () => {});

adminRouter.delete(
  "/admin/users/:email",
  verifyToken,
  isAdmin,
  asyncHandler(deleteUserByEmail)
);

adminRouter.delete(
  "/admin/users/:userId/categories/:categoryId",
  verifyToken,
  isAdmin,
  asyncHandler(deleteCategory)
);

// stats like income / expenses
adminRouter.get("/admin/stats", verifyToken, isAdmin, () => {
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
