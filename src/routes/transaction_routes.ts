import {
  bulkTransactionsCreate,
  createTransactionHandler,
  bulkTransactionsDelete,
  getUserTransactionHandler,
  getUserTransactionsHandler,
} from "../controllers/transaction_controller";
import {
  isAdmin,
  isSelfUser,
  verifyTokenMiddleware,
} from "../middlewares/auth";
import { asyncHandler } from "../middlewares/handlers";
import { NextFunction, Router, Request, Response } from "express";
import { validationMiddleware } from "../middlewares/validate";
import {
  bulkTransactionSchema,
  transactionSchema,
} from "../schemas/transaction.schema";

const transactionRouter = Router();

transactionRouter.get(
  "/users/:userId/transactions",
  verifyTokenMiddleware,
  isSelfUser,
  asyncHandler(getUserTransactionsHandler)
);

transactionRouter.get(
  "/users/:userId/transactions/:transactionId",
  verifyTokenMiddleware,
  isSelfUser,
  asyncHandler(getUserTransactionHandler)
);

transactionRouter.post(
  "/users/:userId/transaction",
  verifyTokenMiddleware,
  isSelfUser,
  validationMiddleware(transactionSchema),
  asyncHandler(createTransactionHandler)
);
// BULK ACTIONS
transactionRouter.delete(
  "/users/:userId/transactions",
  verifyTokenMiddleware,
  isAdmin,
  asyncHandler(bulkTransactionsDelete)
);

transactionRouter.post(
  "/users/:userId/transactions",
  verifyTokenMiddleware,
  isAdmin,
  validationMiddleware(bulkTransactionSchema),
  asyncHandler(bulkTransactionsCreate)
);
export { transactionRouter };
