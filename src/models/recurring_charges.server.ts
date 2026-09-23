import { $Enums, RecurringCharge } from "@prisma/client";
import { prisma } from "../lib/prisma_client";

export const getRecurringChargesByUserId = async (userId: number) => {
  return await prisma.recurringCharge.findMany({
    where: {
      AND: [
        { userId },
        { OR: [{ endCycle: null }, { endCycle: { gt: new Date() } }] },
      ],
    },
  });
};

export const getRecurringChargesByUserIdAndByDate = async (
  userId: number,
  start: Date,
  end: Date
) => {
  return await prisma.recurringCharge.findMany({
    where: {
      userId,
      createdAt: {
        lt: end,
        gt: start,
      },
    },
  });
};

export const getAllRecurringCharges = async () => {
  return await prisma.recurringCharge.findMany({
    where: {
      AND: [
        { startCycle: { lt: new Date() } },
        { OR: [{ endCycle: null }, { endCycle: { gt: new Date() } }] },
      ],
    },
  });
};
export const updateLastGeneratedAtAndCreateTransaction = async (
  nextCharge: Date,
  upcoming: RecurringCharge
) => {
  return await prisma.$transaction([
    prisma.recurringCharge.updateMany({
      where: { userId: upcoming.userId, id: upcoming.id },
      data: { lastGeneratedAt: nextCharge },
    }),
    prisma.transaction.create({
      data: {
        title: upcoming.title,
        amount: upcoming.amount,
        type: upcoming.type,
        recurringChargeId: upcoming.id,
        userId: upcoming.userId,
        createdAt: nextCharge,
      },
    }),
  ]);
};

export const getRecurringChargeByRecurringChargeIdAndUserId = async (
  recurringChargeId: number,
  userId: number
) => {
  return await prisma.recurringCharge.findUnique({
    where: {
      id: recurringChargeId,
      userId,
    },
  });
};

export const getRecurringChargesByUserIdAndFrequency = async (
  userId: number,
  freq: $Enums.Frequency
) => {
  return await prisma.recurringCharge.findMany({
    where: {
      userId,
      frequency: freq,
    },
  });
};

export const createRecurringCharges = async (
  title: string,
  amount: number,
  start: Date,
  type: $Enums.TransactionType,
  freq: $Enums.Frequency,
  userId: number
) => {
  return await prisma.recurringCharge.create({
    data: {
      title,
      amount,
      type,
      frequency: freq,
      startCycle: start,
      userId,
    },
  });
};

export const deleteRecurringChargeByUserIdAndRecurringChargeId = async (
  userId: number,
  recurringChargeId: number
) => {
  return await prisma.recurringCharge.delete({
    where: {
      id: recurringChargeId,
      userId,
    },
  });
};

export const editRecurringChargeResource = async (
  userId: number,
  recurringChargeId: number,
  title?: string,
  amount?: number,
  start?: Date,
  type?: $Enums.TransactionType,
  freq?: $Enums.Frequency
) => {
  return await prisma.recurringCharge.updateMany({
    data: {
      title,
      amount,
      type,
      frequency: freq,
      startCycle: start,
    },
    where: {
      userId,
      id: recurringChargeId,
    },
  });
};

export const cancelRecurringChargeResource = async (
  userId: number,
  recurringChargeId: number
) => {
  return await prisma.recurringCharge.updateMany({
    data: { endCycle: new Date() },
    where: { userId, id: recurringChargeId },
  });
};
