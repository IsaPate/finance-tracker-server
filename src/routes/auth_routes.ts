import { Router } from "express";

import { loginUser, registerUser } from "../controllers/auth_controller";
import { asyncHandler } from "../middlewares/handlers";
import { refreshTokenHandler } from "../lib/jwt";

const authRouter = Router();
authRouter.post("/register", asyncHandler(registerUser));
authRouter.post("/login", asyncHandler(loginUser));
authRouter.post("/auth/refresh", asyncHandler(refreshTokenHandler));
export { authRouter };
