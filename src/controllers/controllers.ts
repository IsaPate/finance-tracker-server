import { Request, Response, NextFunction } from "express";
import { createUser, getUserById } from "../models/user.server";
import {
  createTransaction,
  getTransactionByUserIdAndTransactionId,
  getTransactionsByUserId,
} from "../models/transaction.server";

export async function getUserHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.params.userId;
  const user = await getUserById(Number(userId));
  if (!user) {
    return res.status(404).json({
      id: "",
      name: "",
      success: false,
    });
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

  const created = await createUser(name);
  if (!created) {
    return res.status(500).json({
      id: "",
      name: "",
      success: false,
    });
  }
  return res.status(201).json({
    id: created.id,
    name: created.name,
    success: true,
  });
}
export async function getUserTransactionHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = Number(req.params.userId);
  const user = await getUserById(Number(userId));
  if (!user) {
    return res.status(404).json({
      transaction: null,
      message: "User not found.",
      success: false,
    });
  }
  const transactionId = Number(req.params.transactionId);
  if (!transactionId) {
    return res.status(404).json({
      transaction: null,
      message: "Transaction not found.",
      success: false,
    });
  }
  const transaction = await getTransactionByUserIdAndTransactionId(
    userId,
    transactionId
  );

  if (!transaction) {
    return res.status(404).json({
      message: "Transaction not found.",
      success: false,
    });
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
    return res.status(404).json({
      messge: "User not found.",
      success: false,
    });
  }
  const { title, amount, created_at, type } = req.body;
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
  if (!created_at) {
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
  const transaction = await createTransaction(
    Number(user.id),
    title,
    amount,
    type,
    created_at
  );
  if (!transaction) {
    return res.status(404).json({
      message: "Transaction failed.",
      success: false,
    });
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
    return res.status(404).json({
      transactions: [],
      success: false,
    });
  }

  return res.status(200).json({
    transactions,
    success: true,
  });
}
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
