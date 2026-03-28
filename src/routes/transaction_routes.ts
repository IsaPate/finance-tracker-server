import {
  createTransactionHandler,
  deleteUserTransactionsHandler,
  getUserTransactionHandler,
  getUserTransactionsHandler,
} from "../controllers/transaction_controller";
import { asyncHandler } from "../middlewares/handlers";
import { NextFunction, Router, Request, Response } from "express";

const transactionRouter = Router();

transactionRouter.get(
  "/users/:userId/transactions",
  asyncHandler(getUserTransactionsHandler)
);

transactionRouter.get(
  "/users/:userId/transactions/:transactionId",
  asyncHandler(getUserTransactionHandler)
);

transactionRouter.post(
  "/users/:userId/transaction",
  asyncHandler(createTransactionHandler)
);
// BULK ACTIONS
transactionRouter.delete(
  "/users/:userId/transactions",
  asyncHandler(deleteUserTransactionsHandler)
);

export { transactionRouter };
