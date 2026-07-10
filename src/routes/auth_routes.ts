import { Router } from "express";

import { loginUser, registerUser } from "../controllers/auth_controller";
import { asyncHandler } from "../middlewares/handlers";
import { refreshTokenHandler, logoutHandler } from "../middlewares/auth";

const authRouter = Router();
authRouter.post("/register", asyncHandler(registerUser));
authRouter.post("/login", asyncHandler(loginUser));
authRouter.post("/refresh", asyncHandler(refreshTokenHandler));
authRouter.post("/logout", asyncHandler(logoutHandler));
export { authRouter };
