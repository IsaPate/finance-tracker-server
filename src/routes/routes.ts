import { NextFunction, Router, Request, Response } from "express";
import { createUserHandler, getUserHandler } from "../controllers/controllers";

const router = Router();

router.get("/users/:userId", getUserHandler);

router.post("/user", createUserHandler);

router.get(
  "/user/:userId/transactions",
  (req: Request, res: Response, next: NextFunction) => {
    return res.json({
      message: "welcome",
    });
  }
);

router.get(
  "/user/:userId/transactions/:transactionId",
  (req: Request, res: Response, next: NextFunction) => {
    return res.json({
      message: "welcome",
    });
  }
);

router.post(
  "/users/:userId/transaction",
  (req: Request, res: Response, next: NextFunction) => {
    return res.json({
      message: "welcome",
    });
  }
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
