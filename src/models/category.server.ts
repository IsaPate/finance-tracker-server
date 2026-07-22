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

export const getCategoryById = async (categoryId: number, userId: number) => {
  return await prisma.category.findUnique({
    where: {
      id: categoryId,
      userId,
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

export const deleteCategory = async (categoryId: number, userId: number) => {
  return await prisma.category.delete({
    where: {
      id: categoryId,
      userId,
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

export const getCategoriesByUser = async (
  page: number,
  limit: number,
  cursorId: Number | null
) => {
  const cursorDepends = {
    cursorId: cursorId ? { id: Number(cursorId) } : undefined,
    skip: cursorId ? 1 : 0,
  };
  return await prisma.category.findMany({
    take: limit + 1,
    skip: cursorDepends.skip,
    cursor: cursorDepends.cursorId,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};
