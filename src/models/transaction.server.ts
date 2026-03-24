import { $Enums } from "@prisma/client";
import { prisma as db } from "../lib/prisma_client";

export const createTransaction = async (
  userId: number,
  title: string,
  amount: number,
  transactionType: $Enums.TransactionType,
  createdAt: Date,
  categoryId?: number
) => {
  return await db.transaction.create({
    data: {
      title,
      amount,
      type: transactionType,
      createdAt,
      userId,
      categoryId,
    },
  });
};

export const getTransactionsByUserId = async (userId: number) => {
  return db.transaction.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getTransactionsByCategoryId = async (categoryId: number) => {
  return db.transaction.findMany({
    where: {
      categoryId,
    },
  });
};

export const getTransactionByUserIdAndTransactionId = async (
  userId: number,
  transactionId: number
) => {
  return db.transaction.findUnique({
    where: {
      id: transactionId,
      userId,
    },
  });
};

export const udpateTransaction = async (
  userId: number,
  transactionId: number,
  title: string,
  amount: number,
  createdAt: Date,
  transactionType: $Enums.TransactionType
) => {
  return db.transaction.updateMany({
    where: {
      id: transactionId,
      userId,
    },
    data: {
      title,
      amount,
      createdAt,
      type: transactionType,
    },
  });
};
