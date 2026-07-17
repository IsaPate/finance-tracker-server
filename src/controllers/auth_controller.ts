import { Request, Response, NextFunction } from "express";
import { createUser, getUserByEmail } from "../models/user.server";
import bcrypt from "bcryptjs";
import { generateToken, generateRefreshToken } from "../lib/jwt";
import { createRefreshTokenDB } from "../models/refteshToken.server";
import { logger } from "../lib/logger";
import crypto from "crypto";
import {
  createResetToken,
  deleteResetTokenByUserId,
} from "../models/resetToken";
import config from "../lib/env.export";

export async function registerUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, password, email } = req.body;
  //validation username and password
  const user = await getUserByEmail(email);
  if (user) {
    throw new Error("Email already exists");
  }
  const hashed = await bcrypt.hash(password, 10);
  const newUser = await createUser(name, hashed, email);
  logger.info({ email: newUser.email }, "user registered");
  return res.status(201).json({
    message: "User created successfully",
    user: {
      name: newUser.name,
      email: newUser.email,
    },
    success: true,
  });
}

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;
  //validation username and password
  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password",
      success: false,
    });
  }

  const compare = await bcrypt.compare(password, user.password);
  if (!compare) {
    return res.status(401).json({
      message: "Invalid password",
      success: false,
    });
  }

  const token = generateToken(user);
  if (!token) {
    throw new Error("Could not generate token");
  }
  const refreshToken = generateRefreshToken(user);
  await createRefreshTokenDB(
    refreshToken,
    user.email,
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  );
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  logger.info(`ID ${user.id} logged in.`);
  return res.status(200).json({
    message: "Login successful",
    token,
    success: true,
  });
}

export async function forgotPasswordHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email } = req.body;

  const user = await getUserByEmail(email);
  if (!user) {
    return res.status(404).json({
      message: "No user found.",
      success: false,
    });
  }
  const token = user.resetToken;

  if (token) await deleteResetTokenByUserId(user.id);

  let resetToken = crypto.randomBytes(32).toString("hex");
  const bcryptSalt = 10;
  const hashed = await bcrypt.hash(resetToken, Number(bcryptSalt));
  const created = await createResetToken(
    hashed,
    user.id,
    new Date(30 * 60 * 1000)
  );
  return res.status(200).json({
    resetUrl: `${config.clientUrl}/auth/reset-password?t=${created.token}&id=${created.userId}`,
    success: true,
  });
}

export async function resetPasswordHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {}
