import { Request, Response, NextFunction } from "express";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    res.status(403).json({
      message: "Forbidden. No token provided.",
      success: false,
    });
  }
  const bearer = bearerHeader?.split(" ")[1];
  req.token = bearer;
  next();
};
