import { prisma } from "../lib/prisma_client";

export const createCategory = async (name: string) => {
  return await prisma.category.create({
    data: {
      title: name,
    },
  });
};

export const getCategoryById = async (categoryId: number) => {
  return await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });
};

export const updateCategory = async (categoryId: number, name: string) => {
  return await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: {
      title: name,
    },
  });
};
