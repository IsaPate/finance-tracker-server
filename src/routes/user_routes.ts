import { Router } from "express";
import {
  createUserHandler,
  getUserHandler,
  getAllUserHandler,
} from "../controllers/user_controller";
import { asyncHandler } from "../middlewares/handlers";
import { verifyToken } from "../middlewares/auth";

const userRouter = Router();

userRouter.get("/users/:userId", verifyToken, asyncHandler(getUserHandler));

// userRouter.post("/users", asyncHandler(createUserHandler));

userRouter.get("/users", verifyToken, asyncHandler(getAllUserHandler));
export { userRouter };
