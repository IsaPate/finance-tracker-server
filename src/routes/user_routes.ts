import { Router } from "express";
import {
  getUserHandler,
  userSettingsHandler,
} from "../controllers/user_controller";
import { asyncHandler } from "../middlewares/handlers";
import {
  isAdmin,
  isSelfUser,
  verifyTokenMiddleware,
} from "../middlewares/auth";

const userRouter = Router();

userRouter.get(
  "/users/:userId",
  verifyTokenMiddleware,
  isSelfUser,
  asyncHandler(getUserHandler)
);

userRouter.patch(
  "/users/:userId/settings",
  verifyTokenMiddleware,
  isSelfUser,
  asyncHandler(userSettingsHandler)
);

export { userRouter };
