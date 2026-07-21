import { Request, Response, NextFunction } from "express";
import {
  createUser,
  deleteUserByEmail,
  deleteUserById,
  getAllUsers,
  getUserById,
  toogleEmailReporting,
} from "../models/user.server";
import { logger } from "../lib/logger";

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
    message: "User created successfully.",
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
    message: "All users retrieved successfully.",
    users,
    success: true,
  });
}

export async function deleteUserByIdHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.params.userId;

  const deleted = await deleteUserById(Number(userId));
  logger.info(`ID ${deleted.id} deleted.`);
  return res.status(200).json({
    message: "User deleted successfully.",
    success: true,
  });
}

export async function deleteUserByEmailHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email } = req.body;
  const deleted = await deleteUserByEmail(email);
  logger.info(`ID ${deleted.id} deleted.`);
  return res.status(200).json({
    message: "User deleted successfully.",
    success: true,
  });
}

export async function userSettingsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { toogle } = req.body;
  const { userId } = req.params;
  const toggled = await toogleEmailReporting(Number(userId), toogle);
  const toogledText = toogle === true ? "enabled" : "disabled";
  return res.status(200).json({
    message: `User ${toogledText} monthly email reporting successfully.`,
    success: true,
  });
}
