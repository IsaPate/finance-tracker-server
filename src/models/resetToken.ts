import { prisma } from "../lib/prisma_client";

export const deleteResetTokenByUserId = async (userId: number) => {
  return prisma.resetToken.delete({
    where: {
      userId,
    },
  });
};

export const createResetToken = async (
  token: string,
  userId: number,
  expiresAt: Date
) => {
  return prisma.resetToken.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  });
};
