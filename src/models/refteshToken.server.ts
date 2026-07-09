import { prisma } from "../lib/prisma_client";

export const createRefreshTokenDB = async (
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

export const findRefreshTokenDB = async (token: string) => {
  return prisma.refreshToken.findUnique({
    where: {
      token,
    },
  });
};

export const deleteRefreshTokenDB = async (token: string) => {
  return prisma.refreshToken.delete({
    where: {
      token,
    },
  });
};
