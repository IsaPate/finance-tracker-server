import { z } from "zod";

export const transactionSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  amount: z
    .number()
    .positive("Amount must be positive number.")
    .multipleOf(0.01, "Max 2 decimal places"),
  type: z.enum(["INCOME", "EXPENSE"]),
  createdAt: z.string().datetime(),
  category: z.string().min(1).max(100).optional(),
});

export const bulkTransactionSchema = z.object({
  transactions: z.array(transactionSchema),
});
