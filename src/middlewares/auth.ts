import { Request, Response, NextFunction } from "express";
import pino from "pino";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { JwtUserPayload } from "../globals/index";
import {
  verifyToken,
  verifyRefreshToken,
  generateRefreshToken,
  generateToken,
} from "../lib/jwt";
import { User } from "@prisma/client";
import {
  createRefreshTokenDB,
  deleteRefreshTokenDB,
  findRefreshTokenDB,
} from "../models/refteshToken.server";
import { getUserById } from "../models/user.server";
import { logger } from "../lib/logger";

export const isSelfUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(403).json({
      message: "Forbidden. No user information found.",
      success: false,
    });
  }
  const userId = req.user.userId;
  logger.info(`ID ${userId} has logged in as normal user.`);

  if (userId !== Number(req.params.userId)) {
    return res.status(403).json({
      message: "Forbidden. You can only access your own resources.",
      success: false,
    });
  }
  return next();
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(403).json({
      message: "Forbidden. No user information found.",
      success: false,
    });
  }
  const user = req.user as JwtUserPayload;
  logger.info(`ID ${user.userId} has logged in with admin.`);
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
    const message =
      error instanceof jwt.JsonWebTokenError
        ? "Invalid token."
        : error instanceof jwt.TokenExpiredError
        ? "Token expired"
        : "Generic token error";
    return res.status(401).json({
      message,
      success: false,
    });
  }
};

export const refreshTokenHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.refreshToken)
      return res.status(401).json({
        message: "Unauthorized",
        success: false,
      });
    const refreshToken = cookies.refreshToken;
    const verified = verifyRefreshToken(refreshToken) as JwtUserPayload;
    const refreshTokenDb = await findRefreshTokenDB(refreshToken);
    if (!refreshTokenDb) {
      return res.status(401).json({
        message: "Unauthorized",
        success: false,
      });
    }
    const user = await getUserById(refreshTokenDb.userId);
    if (!user) {
      return res.status(403).json({
        message: "Bad Request.",
        success: false,
      });
    }

    const newAccessToken = generateToken(user);
    const generatedRefreshToken = generateRefreshToken({
      id: user.id,
      role: user.role,
      email: user.email,
    } as User);

    await createRefreshTokenDB(
      generatedRefreshToken,
      user.email,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    );

    await deleteRefreshTokenDB(refreshToken);

    res.cookie("refreshToken", generatedRefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({
      token: newAccessToken,
      success: true,
    });
  } catch (error) {
    let msg = "";
    if (error instanceof JsonWebTokenError) {
      msg = error.message;
    } else if (error instanceof jwt.TokenExpiredError) {
      msg = error.message;
    } else {
      msg = "Unknown Token error.";
    }
    return res.status(401).json({
      message: msg,
      success: false,
    });
  }
};

export const logoutHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) {
    return res.status(401).json({
      message: "Unauthorized",
      success: false,
    });
  }
  const refreshedToken = cookie.refreshToken;
  if (!refreshedToken) {
    return res.status(403).json({
      message: "Bad Request.",
      success: false,
    });
  }
  await deleteRefreshTokenDB(refreshedToken);
  res.clearCookie("refreshToken");
  return res.status(200).json({
    message: "Logout successful",
    success: true,
  });
};
