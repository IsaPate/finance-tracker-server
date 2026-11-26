import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { errorMiddleware } from "./middlewares/handlers";

import { globalLimiter } from "./lib/rate-limit";
import apiRouter from "./api";
export const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
apiRouter.use("/api", apiRouter);
app.use(helmet());
app.use(globalLimiter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Express!");
});

app.use(errorMiddleware);
