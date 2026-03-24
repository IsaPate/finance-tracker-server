import express, { Application, NextFunction, Request, Response } from "express";
import router from "../src/routes/routes";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;
console.log(process.env.DATABASE_URL);
// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());
// app.use(router);
// app.use((req: Request, res: Response, next: NextFunction) => {
//   // req.originalUrl
//   res.status(404).json({
//     message: `Route ${req.originalUrl} not found`,
//   });
// });
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   console.error(err);

//   res.status(500).json({
//     message: err.message || "Internal server error",
//   });
// });
// Basic route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Express!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
