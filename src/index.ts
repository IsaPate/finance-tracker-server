import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

import express, { Application, NextFunction, Request, Response } from "express";
import { errorMiddleware } from "./middlewares/handlers";
import { userRouter } from "./routes/user_routes";
import { transactionRouter } from "./routes/transaction_routes";
import { categoryRouter } from "./routes/category_routes";
import { authRouter } from "./routes/auth_routes";
import { adminRouter } from "./routes/admin_routes";
import pino from "pino";
import pinoHttp from "pino-http";

const app: Application = express();
const port = process.env.PORT || 3000;
const logger = pino();
const httpLogger = pinoHttp({
  redact: {
    paths: [
      "req.headers.authorization",
      "req.headers.cookie",
      'res.headers["set-cookie"]',
    ],
    censor: "**REDACTED**",
  },
  transport:
    process.env.NODE_ENV !== "production"
      ? { target: "pino-pretty" }
      : undefined,
});

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));
app.use(httpLogger);
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());
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
