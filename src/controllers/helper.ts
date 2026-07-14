export function normalizeStatistics(transaction: {
  _sum: {
    amount: number | null;
  };
}) {
  return transaction._sum.amount ?? 0;
}

export function round2(x: number) {
  console.log(x);
  return Math.round(x * 100) / 100;
}

export function normalizeResultForStatistics(
  normalizedIncome: number,
  normalizedExpense: number,
  userCount: number,
  transactionsCount: number
) {
  return {
    totalIncomes: round2(normalizedIncome),
    totalExpenses: round2(normalizedExpense),
    userTotal: userCount,

    transactionsCount,
    netBalance: round2(normalizedIncome - normalizedExpense),
    expenseIncomeRation:
      normalizedIncome === 0
        ? null
        : round2(normalizedExpense / normalizedIncome),
  };
}
