import { EmailReportingService } from "../lib/mailer";
import { groupedTransactionsByTypeAndCategoryId } from "../models/transaction.server";

export async function emailReporting(email: string, monthRange: Date) {
  const groupedTransactions = await groupedTransactionsByTypeAndCategoryId(
    email
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
