import { NextFunction, Request, Response } from "express";
import { getUsersByRole } from "../models/user.server";
import {
  getTransactionsCount,
  getTransactionSumByType,
} from "../models/transaction.server";
import { normalizeResultForStatistics, normalizeStatistics } from "./helper";

export async function adminGetTotalStatistics(
  req: Request,
  res: Response,
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
