import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { errorMiddleware } from "./middlewares/handlers";
import { userRouter } from "./routes/user_routes";
import { transactionRouter } from "./routes/transaction_routes";
import { categoryRouter } from "./routes/category_routes";
import { authRouter } from "./routes/auth_routes";
import { adminRouter } from "./routes/admin_routes";
import { logger } from "./lib/logger";
import { globalLimiter } from "./lib/rate-limit";
import helmet from "helmet";

const app: Application = express();
const port = process.env.PORT || 3000;

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(helmet());
app.use(globalLimiter);
app.use("/auth", authRouter);
app.use(userRouter);
app.use(transactionRouter);
app.use(categoryRouter);
app.use(adminRouter);
// Basic route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Express!");
});

app.use(errorMiddleware);

// Start the server
app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
