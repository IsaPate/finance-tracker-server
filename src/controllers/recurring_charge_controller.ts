import { Request, Response, NextFunction } from "express";
import {
  createRecurringCharges,
  deleteRecurringChargeByUserIdAndRecurringChargeId,
  editRecurringChargeResource,
  getRecurringChargeByRecurringChargeIdAndUserId,
  getRecurringChargesByUserId,
} from "../models/recurring_charges.server";
import { ControllerResponse, RecurringChargeWithFlag } from "./types";
import { Frequency, RecurringCharge } from "@prisma/client";
import cron from "node-cron";
import {
  compareDates,
  getUpcomingCharges,
} from "../recurring-charge-modules/recurring-charge";

export async function getUserRecurringCharges(
  req: Request,
  res: Response<ControllerResponse<RecurringChargeWithFlag[]>>,
  next: NextFunction
) {
  const userId = Number(req.params.userId);
  const upcoming = req.query.upcoming;

  const recurringCharges = await getRecurringChargesByUserId(userId);

  let upcomingCharges = getUpcomingCharges(recurringCharges);

  if (upcoming === "true") {
    upcomingCharges.filter((charge) =>
      String(charge.isUpcoming).includes(upcoming)
    );
  }
  return res.status(200).json({
    data: upcomingCharges,
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

export async function deleteRecurringCharge(
  req: Request,
  res: Response<ControllerResponse<null>>,
  next: NextFunction
) {
  const userId = Number(req.params.userId);
  const recurringChargeId = Number(req.params.recurringChargeId);

  await deleteRecurringChargeByUserIdAndRecurringChargeId(
    userId,
    recurringChargeId
  );
  return res.status(200).json({
    message: "Recurring charge deleted.",
    success: true,
  });
}

export async function editRecurringCharge(
  req: Request,
  res: Response<ControllerResponse<null>>,
  next: NextFunction
) {
  const userId = Number(req.params.userId);
  const recurringChargeId = Number(req.params.recurringChargeId);
  const { title, amount, frequency, type, start } = req.body;

  const edited = await editRecurringChargeResource(
    userId,
    recurringChargeId,
    title,
    amount,
    start,
    type,
    frequency
  );
  if (edited.count === 0) {
    return res.status(404).json({
      success: false,
      message: "Recurring charge not found.",
    });
  }
  return res.status(200).json({
    message: "Recurring charge updated.",
    success: true,
  });
}
