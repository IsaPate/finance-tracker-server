import { Request, Response, NextFunction } from "express";
import { getUserById, toogleEmailReporting } from "../models/user.server";
import { ControllerResponse } from "./types";

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

export async function userSettingsHandler(
  req: Request,
  res: Response<ControllerResponse<null>>,
  next: NextFunction
) {
  const { toogle } = req.body;
  const { userId } = req.params;
  await toogleEmailReporting(Number(userId), toogle);
  const toogledText = toogle === true ? "enabled" : "disabled";
  return res.status(200).json({
    message: `User ${toogledText} monthly email reporting successfully.`,
    success: true,
  });
}