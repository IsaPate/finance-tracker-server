import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

const signToken = (user: User, expiresIn: string, secret: string) => {
  return jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    secret || "",
    { expiresIn } as jwt.SignOptions
  );
};

export const generateToken = (user: User) => {
  return signToken(user, "1h", process.env.SECRET_KEY as string);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.SECRET_KEY as string);
};

export const createToken = (user: User) => {
  return signToken(user, "7d", process.env.REFRESH_SECRET_KEY as string);
};
