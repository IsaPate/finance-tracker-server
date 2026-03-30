import { Request, Response, NextFunction } from "express";
import { createUser, getUserById } from "../models/user.server";

import {
  createTransaction,
  deleteTransactions,
  getTransactionByUserIdAndTransactionId,
  getTransactionsByUserId,
} from "../models/transaction.server";
import { getCategoryByTitle } from "../models/category.server";
export async function getUserTransactionHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = Number(req.params.userId);
  const user = await getUserById(Number(userId));
  if (!user) {
    throw new Error("User not found.");
  }
  const transactionId = Number(req.params.transactionId);

  const transaction = await getTransactionByUserIdAndTransactionId(
    userId,
    transactionId
  );

  if (!transaction) {
    throw new Error("Transaction not found.");
  }
  return res.status(200).json({
    transaction,
    message: "Transactions found.",
    success: true,
  });
}
export async function createTransactionHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.params.userId;

  const user = await getUserById(Number(userId));
  if (!user) {
    throw new Error("User not found.");
  }
  const { title, amount, createdAt, type, category } = req.body;
  if (!title || typeof title !== "string") {
    return res.status(400).json({
      message: "Title has wrong type is missing.",
      success: false,
    });
  }
  if (typeof amount !== "number") {
    return res.status(400).json({
      message: "Amount has wrong type or is missing.",
      success: false,
    });
  }

  const date = new Date(createdAt.split("T")[0]);
  if (!date) {
    return res.status(400).json({
      message: "Date is missing.",
      success: false,
    });
  }
  if (!type) {
    return res.status(400).json({
      message: "Transaction type is missing.",
      success: false,
    });
  }
  if (!category) {
    return res.status(400).json({
      message: "Category is missing.",
      success: false,
    });
  }

  const cat = await getCategoryByTitle(category, Number(userId));
  if (!cat) {
    return res.status(400).json({
      message: "Category does not exist.",
      success: false,
    });
  }
  const transaction = await createTransaction(
    Number(user.id),
    title,
    amount,
    type,
    date,
    Number(cat.id)
  );
  if (!transaction) {
    throw new Error("Transactions failed.");
  }
  return res.status(201).json({
    transaction,
    message: "Transaction created.",
    success: true,
  });
}
export async function getUserTransactionsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.params.userId;
  const transactions = await getTransactionsByUserId(Number(userId));

  if (!transactions) {
    throw new Error("Transaction not found.");
  }

  return res.status(200).json({
    transactions,
    success: true,
  });
}
export async function deleteUserTransactionsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.params.userId;
  const transactionIds = req.body.transactionIds;
  // validate them
  await deleteTransactions(
    transactionIds.map((t: string) => Number(t)),
    Number(userId)
  ); // result.count number
  return res.status(200).json({
    message: "Transactions deleted",
    success: true,
  });
}

export async function editUserTransactions(
  req: Request,
  res: Response,
  next: NextFunction
) {}
