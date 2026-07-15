import { Request, Response, NextFunction } from "express";
import { createUser, getUserByEmail } from "../models/user.server";
import bcrypt from "bcryptjs";
import { generateToken, generateRefreshToken } from "../lib/jwt";
import { createRefreshTokenDB } from "../models/refteshToken.server";
import { logger } from "../lib/logger";
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
    throw new Error("Invalid email or password");
  }

  const compare = await bcrypt.compare(password, user.password);
  if (!compare) {
    throw new Error("Invalid password");
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
