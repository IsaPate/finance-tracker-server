import { Request, Response, NextFunction } from "express";
import { createUser, getUserById } from "../models/user.server";

import {
  createTransaction,
  createTransactions,
  deleteTransactions,
  getAllTransactions,
  getTransactionByUserIdAndTransactionId,
  getTransactionsByUserId,
  updateTransaction,
} from "../models/transaction.server";
import { createCategory, getCategoryByTitle } from "../models/category.server";
import { Transaction } from "@prisma/client";
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
  const date = new Date(createdAt.split("T")[0]);
  const cat = await getCategoryByTitle(category, Number(userId));
  let categoryId = cat?.id;
  if (!categoryId) {
    const newCategory = await createCategory(category, Number(userId));
    categoryId = newCategory.id;
  }
  const transaction = await createTransaction(
    Number(user.id),
    title,
    amount,
    type,
    date,
    categoryId
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
export async function bulkTransactionsDelete(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.params.userId;
  const transactionIds = req.body.transactionIds;
  // validate them
  await deleteTransactions(transactionIds, Number(userId)); // result.count number
  return res.status(200).json({
    message: "Transactions deleted",
    success: true,
  });
}

export async function editUserTransactions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId, transactionId } = req.params;
  const { title, amount } = req.body;

  const updated = await updateTransaction(
    Number(userId),
    Number(transactionId),
    title,
    amount
  );
  if (updated.count === 0) {
    throw new Error("Transaction not found.");
  }
  return res.status(200).json({
    message: "Transactions updated",
    success: true,
  });
}

export async function bulkTransactionsCreate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { transactions } = req.body;
  const userId = req.user?.userId;
  await createTransactions(transactions, Number(userId));
  return res.status(201).json({
    message: "Transactions created.",
    success: true,
  });
}

export async function adminGetAllTransactions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //add pagination here
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  let cursor = req.query.cursor;

  // let cursor = null;
  let records: Transaction[] = [];
  let hasNext = true;

  const transactions = await getAllTransactions(
    Number(page),
    Number(limit),
    cursor ? Number(cursor) : null
  );
  records = [...transactions];
  hasNext = records.length > Number(limit);
  return res.status(200).json({
    data: {
      page,
      limit,
      hasNext,
      cursor: hasNext ? transactions[Number(limit) - 1].id : null,
      pageData: transactions.slice(0, Number(limit)),
    },
    success: true,
  });
}
