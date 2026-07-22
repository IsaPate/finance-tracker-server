import { Request, Response, NextFunction } from "express";
import {
  createCategory,
  deleteCategory,
  getCategoryById,
  getUserCategories,
  updateCategory,
} from "../models/category.server";
import { getTransactionsByCategoryId } from "../models/transaction.server";
import { ControllerResponse } from "./types";
import { Category, Transaction } from "@prisma/client";

// REQUESTS FOR SINGLE CATEGORY
export async function createCategoryHandler(
  req: Request,
  res: Response<ControllerResponse<null>>,
  next: NextFunction
) {
  const { title } = req.body;
  const userId = req.params.userId;

  await createCategory(title, Number(userId));

  return res.status(201).json({
    message: "Category created.",
    success: true,
  });
}
export async function getCategoryHandler(
  req: Request,
  res: Response<ControllerResponse<Category | null>>,
  next: NextFunction
) {
  const { categoryId } = req.params;
  const { userId } = req.params;

  const category = await getCategoryById(Number(categoryId), Number(userId));
  return res.status(200).json({
    message: "Category found.",
    data: category,
    success: true,
  });
}

export async function deleteCategoryHandler(
  req: Request,
  res: Response<ControllerResponse<null>>,
  next: NextFunction
) {
  const { userId, categoryId } = req.params;

  await deleteCategory(Number(categoryId), Number(userId));
  return res.status(200).json({
    message: "Category deleted.",
    success: true,
  });
}

export async function editCategoryHandler(
  req: Request,
  res: Response<ControllerResponse<Category>>,
  next: NextFunction
) {
  const { categoryId } = req.params;
  const { userId } = req.params;

  const { title } = req.body;

  await updateCategory(Number(categoryId), title, Number(userId));
  return res.status(200).json({
    message: "Category edited.",
    success: true,
  });
}

// REQUEST FOR USER CATEGORIES

export async function getUserCategoriesHandler(
  req: Request,
  res: Response<ControllerResponse<Category[] | null>>,
  next: NextFunction
) {
  const { userId } = req.params;

  const categories = await getUserCategories(Number(userId));

  return res.status(200).json({
    message: "Categories found.",
    data: categories,
    success: true,
  });
}

export async function getTransactionsByUserIdAndCategoryIdHandler(
  req: Request,
  res: Response<ControllerResponse<Transaction[]>>,
  next: NextFunction
) {
  const { userId } = req.params;
  const { categoryId } = req.params;

  const transactions = await getTransactionsByCategoryId(
    Number(categoryId),
    Number(userId)
  );

  return res.status(200).json({
    message: "Transactions found.",
    data: transactions,
    success: true,
  });
}
