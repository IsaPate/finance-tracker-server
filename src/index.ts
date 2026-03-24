import express, { Application, NextFunction, Request, Response } from "express";
import router from "../src/routes/routes";

const app: Application = express();
const port = process.env.PORT || 3000;

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(router);
app.use((req: Request, res: Response, next: NextFunction) => {
  // req.originalUrl
  res.status(404).json({
    message: "Route not found",
  });
});

// Basic route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Express!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
