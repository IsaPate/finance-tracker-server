import dotenv from "dotenv";
dotenv.config();

import express, { Application, NextFunction, Request, Response } from "express";
import router from "./routes/routes";
import { errorMiddleware } from "./middlewares/handlers";

const app: Application = express();
const port = process.env.PORT || 3000;
// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(router);
// Basic route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Express!");
});

app.use(errorMiddleware);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
