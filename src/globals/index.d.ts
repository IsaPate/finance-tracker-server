import { JwtPayload } from "jsonwebtoken";

export {};

export interface JwtUserPayload {
  userId: number;
  email: string;
  role: "ADMIN" | "USER";
}
declare global {
  namespace Express {
    interface Request {
      user?: JwtUserPayload;
    }
  }
}
