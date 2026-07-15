import { Router } from "express";

import { loginUser, registerUser } from "../controllers/auth_controller";
import { asyncHandler } from "../middlewares/handlers";
import { refreshTokenHandler, logoutHandler } from "../middlewares/auth";
import { validationMiddleware } from "../middlewares/validate";
import { loginSchema, registrationSchema } from "../schemas/auth.schema";

const authRouter = Router();
authRouter.post(
  "/register",
  validationMiddleware(registrationSchema),
  asyncHandler(registerUser)
);
authRouter.post(
  "/login",
  validationMiddleware(loginSchema),
  asyncHandler(loginUser)
);
authRouter.post("/refresh", asyncHandler(refreshTokenHandler));
authRouter.post("/logout", asyncHandler(logoutHandler));
export { authRouter };
