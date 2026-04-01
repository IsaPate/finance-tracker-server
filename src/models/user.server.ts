import { User } from "@prisma/client";
import { prisma } from "../lib/prisma_client";
export const createUser = async (
  name: string,
  password: string,
  email: string
): Promise<User> => {
  const initialCategories = ["Supermarket", "Food", "Transport"];

  const result = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        name,
        password,
        email,
      },
    });

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

export const getUserByName = async (name: string) => {
  return await prisma.user.findFirst({
    where: {
      name,
    },
  });
};
export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const getAllUsers = async () => {
  return prisma.user.findMany();
};

export const deleteUserById = async (userId: number) => {
  return await prisma.user.delete({
    where: {
      id: userId,
    },
  });
};

export const deleteUserByEmail = async (email: string) => {
  return await prisma.user.delete({
    where: {
      email,
    },
  });
};
