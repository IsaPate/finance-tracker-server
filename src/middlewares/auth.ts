import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

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

  try {
    if (!bearer) {
      return res.status(403).json({
        message: "Forbidden. Invalid token.",
        success: false,
      });
    }
    const decoded = jwt.verify(bearer, process.env.SECRET_KEY as string);
    req.token = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Forbidden. No token provided.",
      success: false,
    });
  }
};
