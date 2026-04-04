import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtUserPayload } from "../globals/index";
import { verifyToken } from "../lib/jwt";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(403).json({
      message: "Forbidden. No user information found.",
      success: false,
    });
  }
  const user = req.user as JwtUserPayload;
  if (user.role === "ADMIN") {
    return next();
  }
  return res.status(403).json({
    message: "Forbidden. Admin access required.",
    success: false,
  });
};

export const verifyTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    return res.status(401).json({
      message: "Forbidden. No token provided.",
      success: false,
    });
  }
  const bearer = bearerHeader?.split(" ")[1];

  try {
    if (!bearer) {
      return res.status(401).json({
        message: "Forbidden. Invalid token.",
        success: false,
      });
    }
    const decoded = verifyToken(bearer);
    req.user = decoded as JwtUserPayload;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Forbidden. No token provided.",
      success: false,
    });
  }
};
