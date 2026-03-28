import { Request, Response, NextFunction } from "express";
import {
  createCategory,
  deleteCategory,
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
  await createCategory(title);
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
  const { title } = req.params;
  if (typeof title !== "string") {
    return res.status(400).json({
      message: "Invalid title parameter.",
      success: false,
    });
  }
  const category = await getCategoryByTitle(title);
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
  const { title } = req.params;
  if (typeof title !== "string") {
    return res.status(400).json({
      message: "Invalid title parameter.",
      success: false,
    });
  }
  await deleteCategory(title);
  return res.status(201).json({
    message: "Category deleted.",
    success: true,
  });
}

export async function editCategoryHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { title } = req.params;
  const { newTitle } = req.body;
  if (typeof title !== "string") {
    return res.status(400).json({
      message: "Invalid title parameter.",
      success: false,
    });
  }
  await updateCategory(title, newTitle);
  return res.status(201).json({
    message: "Category edited.",
    success: true,
  });
}
