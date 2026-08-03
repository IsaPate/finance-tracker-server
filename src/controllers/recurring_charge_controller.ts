import { Request, Response, NextFunction } from "express";
import {
  createRecurringCharges,
  getRecurringChargeByRecurringChargeIdAndUserId,
  getRecurringChargesByUserId,
} from "../models/recurring_charges.server";
import { ControllerResponse } from "./types";
import { RecurringCharge } from "@prisma/client";

export async function getUserRecurringCharges(
  req: Request,
  res: Response<ControllerResponse<RecurringCharge[]>>,
  next: NextFunction
) {
  const userId = Number(req.params.userId);

  const recurringCharges = await getRecurringChargesByUserId(userId);

  return res.status(200).json({
    data: recurringCharges,
    message: "Recurring transactions found.",
    success: true,
  });
}

export async function createUserRecurringCharges(
  req: Request,
  res: Response<ControllerResponse<RecurringCharge>>,
  next: NextFunction
) {
  const { title, amount, frequency, type, start } = req.body;
  const userId = Number(req.params.userId);

  const recurringCharge = await createRecurringCharges(
    title,
    amount,
    start,
    type,
    frequency,
    userId
  );

  if (!recurringCharge) {
    throw new Error("Recurring charge creation failed.");
  }
  return res.status(201).json({
    data: recurringCharge,
    message: "Transaction created.",
    success: true,
  });
}

export async function getSingleRecurringCharge(
  req: Request,
  res: Response<ControllerResponse<RecurringCharge>>,
  next: NextFunction
) {
  const userId = Number(req.params.userId);
  const recurringChargeId = Number(req.params.recurringChargeId);

  const recurringCharge = await getRecurringChargeByRecurringChargeIdAndUserId(
    recurringChargeId,
    userId
  );
  if (!recurringCharge) {
    throw new Error("Recurring charges not found.");
  }
  return res.status(200).json({
    data: recurringCharge,
    message: "Recurring transaction found.",
    success: true,
  });
}
