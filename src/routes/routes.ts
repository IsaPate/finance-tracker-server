import { NextFunction, Router, Request, Response } from "express";
import {
  getUserHandler,
  createUserHandler,
} from "../controllers/user_controller";
import {
  getUserTransactionHandler,
  getUserTransactionsHandler,
  createTransactionHandler,
} from "../controllers/transaction_controller";
import { asyncHandler } from "../middlewares/handlers";

const router = Router();

router.get("/users/:userId", asyncHandler(getUserHandler));

router.post("/users", asyncHandler(createUserHandler));

router.get(
  "/users/:userId/transactions",
  asyncHandler(getUserTransactionsHandler)
);

router.get(
  "/users/:userId/transactions/:transactionId",
  asyncHandler(getUserTransactionHandler)
);

router.post(
  "/users/:userId/transaction",
  asyncHandler(createTransactionHandler)
);

router.get(
  "/users/:userId/category",
  (req: Request, res: Response, next: NextFunction) => {
    return res.json({
      message: "welcome",
    });
  }
);

router.post(
  "/users/:userId/category",
  (req: Request, res: Response, next: NextFunction) => {
    return res.json({
      message: "welcome",
    });
  }
);

export default router;
