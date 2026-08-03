-- CreateEnum
CREATE TYPE "Frequency" AS ENUM ('ANNUAL', 'MONTHLY');

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "recurringChargeId" INTEGER;

-- CreateTable
CREATE TABLE "RecurringCharge" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "type" "TransactionType" NOT NULL,
    "frequency" "Frequency" NOT NULL,
    "startCycle" TIMESTAMP(3) NOT NULL,
    "endCycle" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "RecurringCharge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RecurringCharge_userId_idx" ON "RecurringCharge"("userId");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_recurringChargeId_fkey" FOREIGN KEY ("recurringChargeId") REFERENCES "RecurringCharge"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecurringCharge" ADD CONSTRAINT "RecurringCharge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
