import { Router } from "express";

import {
  forgotPasswordHandler,
  loginUser,
  registerUser,
  resetPasswordHandler,
} from "../controllers/auth_controller";
import { asyncHandler } from "../middlewares/handlers";
import { refreshTokenHandler, logoutHandler } from "../middlewares/auth";
import { validationMiddleware } from "../middlewares/validate";
import { loginSchema, registrationSchema } from "../schemas/auth.schema";
import { authLimiter } from "../lib/rate-limit";

const authRouter = Router();
authRouter.post(
  "/register",
  authLimiter,
  validationMiddleware(registrationSchema),
  asyncHandler(registerUser)
);
authRouter.post(
  "/login",
  authLimiter,
  validationMiddleware(loginSchema),
  asyncHandler(loginUser)
);
authRouter.post("/refresh", asyncHandler(refreshTokenHandler));
authRouter.post("/logout", asyncHandler(logoutHandler));
authRouter.post("/forgot-password", asyncHandler(forgotPasswordHandler));
authRouter.post("/reset-password", asyncHandler(resetPasswordHandler));
export { authRouter };
