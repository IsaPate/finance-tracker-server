import { NextFunction, Router, Request, Response } from "express";
import {
  createTransactionHandler,
  createUserHandler,
  getUserHandler,
  getUserTransactionHandler,
  getUserTransactionsHandler,
} from "../controllers/controllers";

const router = Router();

router.get("/users/:userId", getUserHandler);

router.post("/users", createUserHandler);

router.get("/users/:userId/transactions", getUserTransactionsHandler);

router.get(
  "/users/:userId/transactions/:transactionId",
  getUserTransactionHandler
);

router.post("/users/:userId/transaction", createTransactionHandler);

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
