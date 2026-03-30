import { User } from "@prisma/client";
import { prisma } from "../lib/prisma_client";
export const createUser = async (name: string): Promise<User> => {
  const initialCategories = ["Supermarket", "Food", "Transport"];

  const result = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        name,
      },
    });
    if (!user) {
      throw new Error("Could not create user.");
    }
    await tx.category.createMany({
      data: initialCategories.map((cat) => ({
        title: cat,
        userId: user.id,
      })),
    });
    return user;
  });
  return result;
};

export const getUserById = async (userId: number) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};

export const updateUser = async (userId: number, name: string) => {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
    },
  });
};
