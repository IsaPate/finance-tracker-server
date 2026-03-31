import { Router } from "express";
import {
  createUserHandler,
  getUserHandler,
  getAllUserHandler,
} from "../controllers/user_controller";
import { asyncHandler } from "../middlewares/handlers";

const userRouter = Router();

userRouter.get("/users/:userId", asyncHandler(getUserHandler));

userRouter.post("/users", asyncHandler(createUserHandler));

userRouter.get("/users", asyncHandler(getAllUserHandler));
export { userRouter };
