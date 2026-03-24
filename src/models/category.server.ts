import { prisma as db } from "../lib/prisma_client";

export const createCategory = async (name: string) => {
  return await db.category.create({
    data: {
      title: name,
    },
  });
};

export const getCategoryById = async (categoryId: number) => {
  return await db.category.findUnique({
    where: {
      id: categoryId,
    },
  });
};

export const updateCategory = async (categoryId: number, name: string) => {
  return await db.category.update({
    where: {
      id: categoryId,
    },
    data: {
      title: name,
    },
  });
};
