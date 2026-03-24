import { Request, Response, NextFunction } from "express";
import { createUser, getUserById } from "../models/user.server";

export async function getUserHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.params.userId;
  return await getUserById(Number(userId));
}

export async function createUserHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name } = req.body;

  if (typeof name !== "string") {
    return {
      id: "",
      name: "",
      success: false,
    };
  }

  const created = await createUser(name);

  return {
    id: created.id,
    name: created.name,
    success: true,
  };
}
export async function getTransaction(
  req: Request,
  res: Response,
  next: NextFunction
) {}
export async function createTransaction(
  req: Request,
  res: Response,
  next: NextFunction
) {}
export async function getTransactions(
  req: Request,
  res: Response,
  next: NextFunction
) {}
export async function createCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {}
export async function getCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {}
