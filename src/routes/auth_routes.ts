import { Router } from "express";

import { loginUser, registerUser } from "../controllers/auth_controller";
import { asyncHandler } from "../middlewares/handlers";

const authRouter = Router();
authRouter.post("/register", asyncHandler(registerUser));
authRouter.post("/login", asyncHandler(loginUser));
export { authRouter };
