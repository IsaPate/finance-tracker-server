import { Request, Response, NextFunction } from "express";
import { createUser, getAllUsers, getUserById } from "../models/user.server";

export async function getUserHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.params.userId;
  const user = await getUserById(Number(userId));
  if (!user) {
    throw new Error("User not found.");
  }
  return res.status(200).json({
    id: user.id,
    name: user.name,
    success: true,
  });
}

export async function createUserHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name } = req.body;

  if (typeof name !== "string") {
    return res.status(400).json({
      id: "",
      name: "",
      success: false,
    });
  }

  const created = await createUser(name, "", "");
  if (!created) {
    throw new Error("Could not create user.");
  }
  return res.status(201).json({
    id: created.id,
    name: created.name,
    success: true,
  });
}

export async function getAllUserHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const users = await getAllUsers();
  return res.status(200).json({
    users,
    success: true,
  });
}
