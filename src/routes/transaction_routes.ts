import {
  createTransactionHandler,
  deleteUserTransactionsHandler,
  getUserTransactionHandler,
  getUserTransactionsHandler,
} from "../controllers/transaction_controller";
import { verifyToken } from "../middlewares/auth";
import { asyncHandler } from "../middlewares/handlers";
import { NextFunction, Router, Request, Response } from "express";

const transactionRouter = Router();

transactionRouter.get(
  "/users/:userId/transactions",
  verifyToken,
  asyncHandler(getUserTransactionsHandler)
);

transactionRouter.get(
  "/users/:userId/transactions/:transactionId",
  verifyToken,
  asyncHandler(getUserTransactionHandler)
);

transactionRouter.post(
  "/users/:userId/transaction",
  verifyToken,
  asyncHandler(createTransactionHandler)
);
// BULK ACTIONS
transactionRouter.delete(
  "/users/:userId/transactions",
  verifyToken,
  asyncHandler(deleteUserTransactionsHandler)
);

export { transactionRouter };
