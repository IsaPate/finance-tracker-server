import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtUserPayload } from "../globals/index";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as JwtUserPayload;
  if (user.role === "ADMIN") {
    return next();
  }
  return res.status(403).json({
    message: "Forbidden. Admin access required.",
    success: false,
  });
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    return res.status(403).json({
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
    req.user = decoded as JwtUserPayload;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Forbidden. No token provided.",
      success: false,
    });
  }
};
