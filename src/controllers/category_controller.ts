import { Request, Response, NextFunction } from "express";
import {
  createCategory,
  deleteCategory,
  getCategoryById,
  getCategoryByTitle,
  updateCategory,
} from "../models/category.server";

// REQUESTS FOR SINGLE CATEGORY
export async function createCategoryHandler(
  req: Request,
  res: Response,
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
  res: Response,
  next: NextFunction
) {
  const { categoryId } = req.params;

  const category = await getCategoryById(Number(categoryId));
  return res.status(200).json({
    message: "Category found.",
    data: category,
    success: true,
  });
}

export async function deleteCategoryHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { categoryId } = req.params;

  await deleteCategory(Number(categoryId));
  return res.status(200).json({
    message: "Category deleted.",
    success: true,
  });
}

export async function editCategoryHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { categoryId } = req.params;
  const { title } = req.body;

  await updateCategory(Number(categoryId), title);
  return res.status(200).json({
    message: "Category edited.",
    success: true,
  });
}

// REQUEST FOR USER CATEGORIES

export async function getUserCategoriesHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {}
