import { $Enums, Transaction } from "@prisma/client";
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

export const getTransactionsByCategoryId = async (
  categoryId: number,
  userId: number
) => {
  return prisma.transaction.findMany({
    where: {
      userId,
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
//perhaps delete it
export const updateTransaction = async (
  userId: number,
  transactionId: number,
  title?: string,
  amount?: number
) => {
  return prisma.transaction.updateMany({
    data: {
      title,
      amount,
    },
    where: { userId, id: transactionId },
  });
};

export const createTransactions = async (
  transactions: Omit<Transaction, "id">[],
  userId: number
) => {
  return prisma.transaction.createMany({
    data: transactions.map((t) => ({ ...t, userId })),
  });
};

export const getAllTransactions = async (
  page: number,
  limit: number,
  cursorId: number | null
) => {
  const cursorDepended = {
    cursorId: cursorId ? { id: cursorId } : undefined,
    skip: cursorId ? 1 : 0,
  };
  return prisma.transaction.findMany({
    take: limit + 1,
    skip: cursorDepended.skip,
    orderBy: {
      id: "asc",
    },
    cursor: cursorDepended.cursorId,
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const getTransactionSumByType = async (type: $Enums.TransactionType) => {
  return await prisma.transaction.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      user: {
        role: "USER",
      },
      type,
    },
  });
};

export const getTransactionSumByTypeAndEmail = async (
  email: string,
  type: $Enums.TransactionType
) => {
  return await prisma.transaction.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      user: {
        role: "USER",
        email,
      },
      type,
    },
  });
};

export const getTransactionsCount = async (role: $Enums.UserRoleType) => {
  return await prisma.transaction.count({
    where: {
      user: {
        role,
      },
    },
  });
};
