import { Router } from "express";
import {
  createUserHandler,
  getUserHandler,
  getAllUserHandler,
} from "../controllers/user_controller";
import { asyncHandler } from "../middlewares/handlers";
import { isAdmin, verifyTokenMiddleware } from "../middlewares/auth";

const userRouter = Router();

userRouter.get(
  "/users/:userId",
  verifyTokenMiddleware,
  isAdmin,
  asyncHandler(getUserHandler)
);

export { userRouter };
