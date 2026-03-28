import { prisma } from "../lib/prisma_client";

export const createCategory = async (name: string) => {
  return await prisma.category.create({
    data: {
      title: name,
    },
  });
};

export const getCategoryByTitle = async (title: string) => {
  return await prisma.category.findUnique({
    where: {
      title,
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

export const updateCategory = async (title: string, newTitle: string) => {
  return await prisma.category.update({
    where: {
      title,
    },
    data: {
      title: newTitle,
    },
  });
};

export const deleteCategory = async (title: string) => {
  return await prisma.category.delete({
    where: {
      title,
    },
  });
};

//FUTUTRE REQUEST
export const getUserCategories = async (userId: number) => {
  return await prisma.category.findMany({
    where: {},
  });
};

export const getUserTransactionsByCategory = async (
  userId: number,
  categoryId: number
) => {
  return await prisma.category.findMany({
    where: {
      userId: userId,
      id: categoryId,
    },
  });
};
