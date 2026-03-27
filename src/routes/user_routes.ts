import { Router } from "express";
import {
  createUserHandler,
  getUserHandler,
} from "../controllers/user_controller";
import { asyncHandler } from "../middlewares/handlers";

const userRouter = Router();

userRouter.get("/users/:userId", asyncHandler(getUserHandler));

userRouter.post("/users", asyncHandler(createUserHandler));

export { userRouter };
