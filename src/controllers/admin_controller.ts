import { NextFunction, Request, Response } from "express";
import {
  getUsersByRole,
  getAllUsers,
  deleteUserById,
  deleteUserByEmail,
} from "../models/user.server";
import {
  getTransactionsCount,
  getTransactionSumByType,
  getAllTransactions,
} from "../models/transaction.server";
import { getCategoriesByUser } from "../models/category.server";
import { normalizeResultForStatistics, normalizeStatistics } from "./helper";
import { ControllerResponse } from "./types";
import { $Enums } from "@prisma/client";
import { logger } from "../lib/logger";

export async function adminGetTotalStatistics(
  req: Request,
  res: Response<
    ControllerResponse<ReturnType<typeof normalizeResultForStatistics>>
  >,
  next: NextFunction
) {
  const totalAmountSumIncome = await getTransactionSumByType("INCOME");
  const normalizedIncome = normalizeStatistics(totalAmountSumIncome);
  const totalAmountSumExpense = await getTransactionSumByType("EXPENSE");
  const normalizedExpense = normalizeStatistics(totalAmountSumExpense);

  const userCount = await getUsersByRole("USER");
  const transactionsCount = await getTransactionsCount("USER");
  const result = normalizeResultForStatistics(
    normalizedIncome,
    normalizedExpense,
    userCount,
    transactionsCount
  );
  return res.status(200).json({
    data: result,
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

export async function adminGetAllTransactions(
  req: Request,
  res: Response<
    ControllerResponse<{
      page: number;
      limit: number;
      hasNext: boolean;
      cursor: number | null;
      pageData: Awaited<ReturnType<typeof getAllTransactions>>;
    }>
  >,
  next: NextFunction
) {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const cursor = req.query.cursor;

  const transactions = await getAllTransactions(
    page,
    limit,
    cursor ? Number(cursor) : null
  );
  const hasNext = transactions.length > limit;
  return res.status(200).json({
    data: {
      page,
      limit,
      hasNext,
      cursor: hasNext ? transactions[limit - 1].id : null,
      pageData: transactions.slice(0, limit),
    },
    success: true,
  });
}

export async function adminGetAllCategories(
  req: Request,
  res: Response<
    ControllerResponse<{
      page: number;
      limit: number;
      hasNext: boolean;
      cursor: number | null;
      pageData: Awaited<ReturnType<typeof getCategoriesByUser>>;
    }>
  >,
  next: NextFunction
) {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const cursor = req.query.cursor;

  const categories = await getCategoriesByUser(
    page,
    limit,
    cursor ? Number(cursor) : null
  );
  let hasNext = Number(limit) < categories.length;
  return res.status(200).json({
    data: {
      page,
      limit,
      hasNext,
      cursor: hasNext ? categories[Number(limit) - 1].id : null,
      pageData: categories.slice(0, Number(limit)),
    },
    success: true,
  });
}