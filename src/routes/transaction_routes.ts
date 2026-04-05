import {
  createTransactionHandler,
  deleteUserTransactionsHandler,
  getUserTransactionHandler,
  getUserTransactionsHandler,
} from "../controllers/transaction_controller";
import { verifyTokenMiddleware } from "../middlewares/auth";
import { asyncHandler } from "../middlewares/handlers";
import { NextFunction, Router, Request, Response } from "express";

const transactionRouter = Router();

transactionRouter.get(
  "/users/:userId/transactions",
  verifyTokenMiddleware,
  asyncHandler(getUserTransactionsHandler)
);

transactionRouter.get(
  "/users/:userId/transactions/:transactionId",
  verifyTokenMiddleware,
  asyncHandler(getUserTransactionHandler)
);

transactionRouter.post(
  "/users/:userId/transaction",
  verifyTokenMiddleware,
  asyncHandler(createTransactionHandler)
);
// BULK ACTIONS
transactionRouter.delete(
  "/users/:userId/transactions",
  verifyTokenMiddleware,
  asyncHandler(deleteUserTransactionsHandler)
);

export { transactionRouter };
