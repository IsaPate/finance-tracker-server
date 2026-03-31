import { Router } from "express";
import jwt from "jsonwebtoken";
import { createUser, getUserByName } from "../models/user.server";
import bcrypt from "bcryptjs";

const authRouter = Router();
authRouter.post("/resgister", async (req, res) => {
  const { username, password } = req.body;
  //validation username and password
  const user = await getUserByName(username);
  if (user) {
    return res.status(400).json({
      message: "Username already exists",
      success: false,
    });
  }
  const hashed = bcrypt.hashSync(password, 10);
  await createUser(username, hashed);
  return res.status(201).json({
    message: "User created successfully",
    username,
    success: true,
  });
});
authRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  //validation username and password
  const user = await getUserByName(username);

  if (!user) {
    return res.status(401).json({
      message: "Invalid username or password",
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
  jwt.sign(
    { userId: user.id, username: user.name },
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
});
export { authRouter };
