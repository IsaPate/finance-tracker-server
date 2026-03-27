import {
  createTransactionHandler,
  getUserTransactionHandler,
  getUserTransactionsHandler,
} from "../controllers/transaction_controller";
import { asyncHandler } from "../middlewares/handlers";
import { NextFunction, Router, Request, Response } from "express";

const transactionRouter = Router();

const urls = {
  userTransaction: "/users/:userId/transaction",
  userTransactions: "/users/:userId/transactions",
  userTransactionId: "/users/:userId/transactions/:transactionId",
};

transactionRouter.get(
  urls.userTransactions,
  asyncHandler(getUserTransactionsHandler)
);

transactionRouter.get(
  urls.userTransactionId,
  asyncHandler(getUserTransactionHandler)
);

transactionRouter.post(
  urls.userTransaction,
  asyncHandler(createTransactionHandler)
);
// BULK ACTIONS
transactionRouter.delete(urls.userTransactions);

transactionRouter.put(urls.userTransactions);

export { transactionRouter };
