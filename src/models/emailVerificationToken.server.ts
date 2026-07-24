import { prisma } from "../lib/prisma_client";

export const saveVerificationToken = async (
  token: string,
  userId: number,
  expiresAt: Date
) => {
  await prisma.emailVerificationToken.create({
    data: {
      token,
      expiresAt,
      userId,
    },
  });
};

export const findVerificationToken = async (email: string, token: string) => {
  return await prisma.emailVerificationToken.findUnique({
    where: {
      user: {
        email,
      },
      token,
    },
  });
};

export const deleteVerificationToken = async (email: string, token: string) => {
  return await prisma.emailVerificationToken.delete({
    where: {
      user: {
        email,
      },
      token,
    },
  });
};
