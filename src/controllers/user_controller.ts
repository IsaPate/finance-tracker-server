import { Request, Response, NextFunction } from "express";
import {
  deleteUserByEmail,
  deleteUserById,
  getAllUsers,
  getUserById,
  toogleEmailReporting,
} from "../models/user.server";
import { logger } from "../lib/logger";
import { ControllerResponse } from "./types";
import { $Enums } from "@prisma/client";

export async function getUserHandler(
  req: Request,
  res: Response<
    ControllerResponse<{
      id: number;
      name: string;
    }>
  >,
  next: NextFunction
) {
  const userId = req.params.userId;
  const user = await getUserById(Number(userId));
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found.",
    });
  }
  return res.status(200).json({
    data: {
      id: user.id,
      name: user.name,
    },
    success: true,
  });
}

export async function getAllUserHandler(
  req: Request,
  res: Response<
    ControllerResponse<
      {
        id: number;
        name: string;
        email: string;
        role: $Enums.UserRoleType;
      }[]
    >
  >,
  next: NextFunction
) {
  const users = await getAllUsers();
  return res.status(200).json({
    message: "All users retrieved successfully.",
    data: users,
    success: true,
  });
}

export async function deleteUserByIdHandler(
  req: Request,
  res: Response<ControllerResponse<null>>,
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
  res: Response<ControllerResponse<null>>,
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
  res: Response<ControllerResponse<null>>,
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
