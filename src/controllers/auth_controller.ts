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
  const hashed = bcrypt.hashSync(password, 10);
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
  jwt.sign(
    { userId: user.id, email: user.email },
    `${process.env.SECRET_KEY}`,
    { expiresIn: "1h" },
    (err: any, token?: string) => {
      if (err) {
        res.status(500).json({
          message: "Error signing token",
          success: false,
        });
        return;
      }
      if (!token) {
        res.status(500).json({
          message: "Token generation failed",
          success: false,
        });
        return;
      }
      res.status(200).json({
        token,
        success: true,
      });
    }
  );
}
