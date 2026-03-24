import { NextFunction, Router, Request, Response } from "express";
import { createUserHandler, getUserHandler } from "../controllers/controllers";

const router = Router();

router.get("/user/:userId", getUserHandler);

router.post("/user", createUserHandler);

router.get(
  "/user/:userId/transaction",
  (req: Request, res: Response, next: NextFunction) => {
    return res.json({
      message: "welcome",
    });
  }
);

router.post(
  "/user/:userId/transaction",
  (req: Request, res: Response, next: NextFunction) => {
    return res.json({
      message: "welcome",
    });
  }
);

router.get(
  "/user/:userId/category",
  (req: Request, res: Response, next: NextFunction) => {
    return res.json({
      message: "welcome",
    });
  }
);

router.post(
  "/user/:userId/category",
  (req: Request, res: Response, next: NextFunction) => {
    return res.json({
      message: "welcome",
    });
  }
);

export default router;
