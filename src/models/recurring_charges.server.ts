import { $Enums } from "@prisma/client";
import { prisma } from "../lib/prisma_client";

export const getRecurringChargesByUserId = async (userId: number) => {
  return await prisma.recurringCharge.findMany({
    where: {
      userId,
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

export const getRecurringChargeByRecurringChargeId = async (
  recurringChargeId: number
) => {
  return await prisma.recurringCharge.findUnique({
    where: {
      id: recurringChargeId,
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
