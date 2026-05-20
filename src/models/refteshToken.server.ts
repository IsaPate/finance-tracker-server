import { prisma } from "../lib/prisma_client";

export const createRefreshToken = async (
  refreshToken: string,
  email: string,
  expiresAt: Date
) => {
  return await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      user: {
        connect: {
          email,
        },
      },
      expiresAt,
    },
  });
};

export const findRefreshToken = async (token: string) => {
  return prisma.refreshToken.findUnique({
    where: {
      token,
    },
  });
};

export const deleteRefreshToken = async (token: string) => {
  return prisma.refreshToken.delete({
    where: {
      token,
    },
  });
};
