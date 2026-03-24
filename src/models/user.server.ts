import { prisma as db } from "../lib/prisma_client";

export const createUser = async (name: string) => {
  return await db.user.create({
    data: {
      name,
    },
  });
};

export const getUserById = async (userId: number) => {
  return await db.user.findUnique({
    where: {
      id: userId,
    },
  });
};

export const updateUser = async (userId: number, name: string) => {
  return await db.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
    },
  });
};
