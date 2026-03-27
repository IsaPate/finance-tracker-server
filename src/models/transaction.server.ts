import { $Enums } from "@prisma/client";
import { prisma } from "../lib/prisma_client";

export const createTransaction = async (
  userId: number,
  title: string,
  amount: number,
  transactionType: $Enums.TransactionType,
  createdAt: Date,
  categoryId?: number
) => {
  return await prisma.transaction.create({
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
  return prisma.transaction.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getTransactionsByCategoryId = async (categoryId: number) => {
  return prisma.transaction.findMany({
    where: {
      categoryId,
    },
  });
};

export const getTransactionByUserIdAndTransactionId = async (
  userId: number,
  transactionId: number
) => {
  return prisma.transaction.findUnique({
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
  return prisma.transaction.updateMany({
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

export const deleteTransactions = async (
  transactionIds: number[],
  userId: number
) => {
  return prisma.transaction.deleteMany({
    where: {
      userId,
      id: { in: transactionIds },
    },
  });
};

export const udpateTransactions = async (
  transactionIds: number[],
  userId: number
) => {
  return prisma.transaction.updateMany({
    data: {},
    where: { userId, id: { in: transactionIds } },
  });
};
