import { prisma } from "../lib/prisma_client";

export const deleteRefreshTokenByUserId = async (userId: number) => {
  return prisma.resetToken.delete({
    where: {
      userId,
    },
  });
};
