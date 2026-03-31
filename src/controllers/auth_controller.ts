import { Request, Response, NextFunction } from "express";
import { createUser, getUserByEmail } from "../models/user.server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.SECRET_KEY as string,
    { expiresIn: "1h" }
  );
  if (!token) {
    throw new Error("Could not generate token");
  }
  return res.status(200).json({
    message: "Login successful",
    token,
    success: true,
  });
}
