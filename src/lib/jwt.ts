import { Request, Response, NextFunction } from "express";

import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

export const generateToken = (user: User) => {
  return jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    process.env.SECRET_KEY as string,
    { expiresIn: "1h" }
  );
};

export const refreshTokenHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
