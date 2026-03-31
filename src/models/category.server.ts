import { prisma } from "../lib/prisma_client";
import { getUserById } from "./user.server";

export const createCategory = async (title: string, userId: number) => {
  return await prisma.category.create({
    data: {
      userId,
      title,
    },
  });
};

export const getCategoryByTitle = async (title: string, userId: number) => {
  return await prisma.category.findUnique({
    where: {
      title_userId: {
        userId,
        title,
      },
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

export const updateCategory = async (categoryId: number, newTitle: string) => {
  return await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: {
      title: newTitle,
    },
  });
};

export const deleteCategory = async (categoryId: number) => {
  return await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });
};

//FUTUTRE REQUEST
export const getUserCategories = async (userId: number) => {
  const user = await getUserById(userId);

  if (!user) {
    throw new Error("User not found.");
  }

  return await prisma.category.findMany({
    where: {
      userId,
    },
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
