import { logger } from "../lib/logger";
import { EmailReportingService } from "../lib/mailer";
import { groupedTransactionsByTypeAndCategoryId } from "../models/transaction.server";
import PQueue from "p-queue";
import { getUsersWithEnabledReporting } from "../models/user.server";

const pQueue = new PQueue({ concurrency: 2 });

export async function emailReporting(
  email: string,
  monthRange: {
    start: Date;
    end: Date;
  }
) {
  const groupedTransactions = await groupedTransactionsByTypeAndCategoryId(
    email,
    monthRange.start,
    monthRange.end
  );

  const totalIncome = groupedTransactions
    .filter((g) => g.type === "INCOME")
    .reduce((acc, income) => {
      if (income._sum.amount) {
        acc = acc + income._sum.amount;
      } else {
        acc = acc + 0;
      }
      return acc;
    }, 0);

  const totalExpense = groupedTransactions
    .filter((g) => g.type === "EXPENSE")
    .reduce((acc, income) => {
      if (income._sum.amount) {
        acc = acc + income._sum.amount;
      } else {
        acc = acc + 0;
      }
      return acc;
    }, 0);
  const monthlyEmailReporting = new EmailReportingService(
    email,
    groupedTransactions.map((g) => {
      return {
        amount: g._sum.amount,
        ...g,
      };
    }),
    totalIncome,
    totalExpense
  );
  await monthlyEmailReporting.emailSender();
}

export async function scanForEmailReporting() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const end = new Date(now.getFullYear(), now.getMonth(), 1);

  const users = await getUsersWithEnabledReporting();
  for (const user of users) {
    pQueue.add(async () => {
      try {
        await emailReporting(user.email, {
          start,
          end,
        });
      } catch (err) {
        logger.error(
          { email: user.email, err },
          "failed to send monthly report"
        );
      }
    });
  }
}
